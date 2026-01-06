import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Package } from "lucide-react";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
}

interface Promotion {
  id: string;
  title: string;
  description: string | null;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  created_at: string;
}

interface PromotionProduct {
  product_id: string;
}

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProductsDialogOpen, setIsProductsDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [promotionProductCounts, setPromotionProductCounts] = useState<Record<string, number>>({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });

  const fetchPromotions = async () => {
    try {
      const { data, error } = await supabase
        .from("promotions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPromotions(data || []);

      // Fetch product counts for each promotion
      const counts: Record<string, number> = {};
      for (const promo of data || []) {
        const { count } = await supabase
          .from("promotion_products")
          .select("*", { count: "exact", head: true })
          .eq("promotion_id", promo.id);
        counts[promo.id] = count || 0;
      }
      setPromotionProductCounts(counts);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      toast.error("Erreur lors du chargement des promotions");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, title, category, price")
        .eq("is_active", true)
        .order("title");

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchPromotionProducts = async (promotionId: string) => {
    try {
      const { data, error } = await supabase
        .from("promotion_products")
        .select("product_id")
        .eq("promotion_id", promotionId);

      if (error) throw error;
      setSelectedProductIds((data || []).map((p: PromotionProduct) => p.product_id));
    } catch (error) {
      console.error("Error fetching promotion products:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      discount_percentage: "",
      start_date: "",
      end_date: "",
      is_active: true,
    });
    setEditingPromotion(null);
    setSelectedProductIds([]);
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      title: promotion.title,
      description: promotion.description || "",
      discount_percentage: promotion.discount_percentage.toString(),
      start_date: promotion.start_date,
      end_date: promotion.end_date,
      is_active: promotion.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleManageProducts = async (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    await fetchPromotionProducts(promotion.id);
    setIsProductsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette promotion ?")) return;

    try {
      const { error } = await supabase.from("promotions").delete().eq("id", id);
      if (error) throw error;
      toast.success("Promotion supprimée");
      fetchPromotions();
    } catch (error) {
      console.error("Error deleting promotion:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const promotionData = {
        title: formData.title,
        description: formData.description || null,
        discount_percentage: parseInt(formData.discount_percentage),
        start_date: formData.start_date,
        end_date: formData.end_date,
        is_active: formData.is_active,
      };

      if (editingPromotion) {
        const { error } = await supabase
          .from("promotions")
          .update(promotionData)
          .eq("id", editingPromotion.id);
        if (error) throw error;
        toast.success("Promotion mise à jour");
      } else {
        const { error } = await supabase.from("promotions").insert([promotionData]);
        if (error) throw error;
        toast.success("Promotion créée");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPromotions();
    } catch (error) {
      console.error("Error saving promotion:", error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setFormLoading(false);
    }
  };

  const handleSaveProducts = async () => {
    if (!selectedPromotion) return;
    setFormLoading(true);

    try {
      // Delete existing associations
      const { error: deleteError } = await supabase
        .from("promotion_products")
        .delete()
        .eq("promotion_id", selectedPromotion.id);

      if (deleteError) throw deleteError;

      // Insert new associations
      if (selectedProductIds.length > 0) {
        const { error: insertError } = await supabase
          .from("promotion_products")
          .insert(
            selectedProductIds.map((productId) => ({
              promotion_id: selectedPromotion.id,
              product_id: productId,
            }))
          );

        if (insertError) throw insertError;
      }

      toast.success("Produits mis à jour");
      setIsProductsDialogOpen(false);
      fetchPromotions();
    } catch (error) {
      console.error("Error saving promotion products:", error);
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setFormLoading(false);
    }
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isPromotionActive = (promotion: Promotion) => {
    const today = new Date();
    const startDate = new Date(promotion.start_date);
    const endDate = new Date(promotion.end_date);
    return promotion.is_active && today >= startDate && today <= endDate;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      equipements_medicaux: "Équipements médicaux",
      consommables: "Consommables",
    };
    return labels[category] || category;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des Promotions</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingPromotion ? "Modifier la promotion" : "Nouvelle promotion"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Réduction (%) *</Label>
                <Input
                  id="discount"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.discount_percentage}
                  onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Date de début *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">Date de fin *</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked as boolean })}
                />
                <Label htmlFor="is_active">Promotion active</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : editingPromotion ? (
                    "Mettre à jour"
                  ) : (
                    "Créer"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des promotions ({promotions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {promotions.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Aucune promotion. Cliquez sur "Ajouter une promotion" pour commencer.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Réduction</TableHead>
                    <TableHead>Produits</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promotion) => (
                    <TableRow key={promotion.id}>
                      <TableCell className="font-medium">{promotion.title}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">-{promotion.discount_percentage}%</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {promotionProductCounts[promotion.id] || 0} produit(s)
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(promotion.start_date).toLocaleDateString("fr-FR")} -{" "}
                        {new Date(promotion.end_date).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isPromotionActive(promotion) ? "default" : "outline"}>
                          {isPromotionActive(promotion) ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleManageProducts(promotion)}
                            title="Gérer les produits"
                          >
                            <Package className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(promotion)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(promotion.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Products Selection Dialog */}
      <Dialog open={isProductsDialogOpen} onOpenChange={setIsProductsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Sélectionner les produits pour : {selectedPromotion?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Cochez les produits qui bénéficieront de la réduction de{" "}
              <strong>{selectedPromotion?.discount_percentage}%</strong>
            </p>
            <ScrollArea className="h-[400px] border rounded-md p-4">
              <div className="space-y-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted"
                  >
                    <Checkbox
                      id={product.id}
                      checked={selectedProductIds.includes(product.id)}
                      onCheckedChange={() => toggleProductSelection(product.id)}
                    />
                    <label
                      htmlFor={product.id}
                      className="flex-1 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {getCategoryLabel(product.category)}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        {Number(product.price).toFixed(2)} MAD
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {selectedProductIds.length} produit(s) sélectionné(s)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsProductsDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button onClick={handleSaveProducts} disabled={formLoading}>
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPromotions;