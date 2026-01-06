import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, Loader2, Upload, ImageIcon } from "lucide-react";

interface Slide {
  id: string;
  image_url: string;
  title: string | null;
  subtitle: string | null;
  link_url: string | null;
  display_order: number;
  is_active: boolean;
  category_type: string | null;
  created_at: string;
}

const AdminSlides = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    image_url: "",
    title: "",
    subtitle: "",
    link_url: "",
    is_active: true,
    category_type: "" as string,
  });

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from("homepage_slides")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSlides(data || []);
    } catch (error) {
      console.error("Error fetching slides:", error);
      toast.error("Erreur lors du chargement des slides");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const resetForm = () => {
    setFormData({
      image_url: "",
      title: "",
      subtitle: "",
      link_url: "",
      is_active: true,
      category_type: "",
    });
    setEditingSlide(null);
  };

  const handleEdit = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      image_url: slide.image_url,
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      link_url: slide.link_url || "",
      is_active: slide.is_active,
      category_type: slide.category_type || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce slide ?")) return;

    try {
      const { error } = await supabase
        .from("homepage_slides")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Slide supprimé");
      fetchSlides();
    } catch (error) {
      console.error("Error deleting slide:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `slide-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      toast.success("Image téléchargée");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Erreur lors du téléchargement");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image_url) {
      toast.error("Veuillez ajouter une image");
      return;
    }

    setFormLoading(true);

    try {
      if (editingSlide) {
        const { error } = await supabase
          .from("homepage_slides")
          .update({
            image_url: formData.image_url,
            title: formData.title || null,
            subtitle: formData.subtitle || null,
            link_url: formData.link_url || null,
            is_active: formData.is_active,
            category_type: formData.category_type || null,
          })
          .eq("id", editingSlide.id);

        if (error) throw error;
        toast.success("Slide mis à jour");
      } else {
        const newOrder = slides.length;
        const { error } = await supabase
          .from("homepage_slides")
          .insert({
            image_url: formData.image_url,
            title: formData.title || null,
            subtitle: formData.subtitle || null,
            link_url: formData.link_url || null,
            display_order: newOrder,
            is_active: formData.is_active,
            category_type: formData.category_type || null,
          });

        if (error) throw error;
        toast.success("Slide ajouté");
      }

      setDialogOpen(false);
      resetForm();
      fetchSlides();
    } catch (error) {
      console.error("Error saving slide:", error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setFormLoading(false);
    }
  };

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    const newSlides = [...slides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);

    // Update display_order for all slides
    const updates = newSlides.map((slide, index) => ({
      id: slide.id,
      display_order: index,
    }));

    setSlides(newSlides.map((s, i) => ({ ...s, display_order: i })));

    try {
      for (const update of updates) {
        await supabase
          .from("homepage_slides")
          .update({ display_order: update.display_order })
          .eq("id", update.id);
      }
    } catch (error) {
      console.error("Error reordering:", error);
      toast.error("Erreur lors de la réorganisation");
      fetchSlides();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Slides Accueil</h2>
          <p className="text-muted-foreground">
            Gérez les images du carrousel de la page d'accueil
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? "Modifier le slide" : "Ajouter un slide"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Image *</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {formData.image_url ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute bottom-2 right-2"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-1" />
                          Changer
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full aspect-video rounded-lg border-2 border-dashed flex flex-col items-center justify-center hover:border-primary/50 transition-colors"
                  >
                    {uploading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Cliquez pour télécharger
                        </span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Titre (optionnel)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Titre du slide"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Sous-titre (optionnel)</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="Sous-titre du slide"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link_url">Lien (optionnel)</Label>
                <Input
                  id="link_url"
                  value={formData.link_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
                  placeholder="/equipements"
                />
              </div>

              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select
                  value={formData.category_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipements">Équipements</SelectItem>
                    <SelectItem value="consommables">Consommables</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Associez ce slide à une catégorie spécifique
                </p>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Actif</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
              </div>

              <Button type="submit" className="w-full" disabled={formLoading}>
                {formLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingSlide ? "Mettre à jour" : "Ajouter"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {slides.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun slide. Ajoutez-en un pour commencer.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="w-[120px]">Image</TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Lien</TableHead>
              <TableHead className="w-[80px]">Actif</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slides.map((slide, index) => (
              <TableRow key={slide.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => index > 0 && handleReorder(index, index - 1)}
                      disabled={index === 0}
                      className="p-1 hover:bg-muted rounded disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => index < slides.length - 1 && handleReorder(index, index + 1)}
                      disabled={index === slides.length - 1}
                      className="p-1 hover:bg-muted rounded disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <img
                    src={slide.image_url}
                    alt={slide.title || "Slide"}
                    className="w-20 h-12 object-cover rounded"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{slide.title || "-"}</p>
                    {slide.subtitle && (
                      <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {slide.category_type ? (
                    <span className={`px-2 py-1 rounded text-xs ${
                      slide.category_type === "equipements" 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-purple-100 text-purple-700"
                    }`}>
                      {slide.category_type === "equipements" ? "Équipements" : "Consommables"}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {slide.link_url || "-"}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs ${
                    slide.is_active 
                      ? "bg-green-100 text-green-700" 
                      : "bg-gray-100 text-gray-700"
                  }`}>
                    {slide.is_active ? "Oui" : "Non"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(slide)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(slide.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminSlides;
