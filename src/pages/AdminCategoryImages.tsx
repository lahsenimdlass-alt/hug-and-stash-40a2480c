import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Upload, X, ImageIcon } from "lucide-react";
import { equipmentCategories, consumableCategories } from "@/data/categories";

interface CategoryImage {
  id: string;
  category_slug: string;
  category_type: string;
  image_url: string;
}

const AdminCategoryImages = () => {
  const [categoryImages, setCategoryImages] = useState<CategoryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentCategory, setCurrentCategory] = useState<{ slug: string; type: string } | null>(null);

  const fetchCategoryImages = async () => {
    try {
      const { data, error } = await supabase
        .from("category_images")
        .select("*");

      if (error) throw error;
      setCategoryImages(data || []);
    } catch (error) {
      console.error("Error fetching category images:", error);
      toast.error("Erreur lors du chargement des images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryImages();
  }, []);

  const getImageForCategory = (slug: string, type: string) => {
    return categoryImages.find(
      img => img.category_slug === slug && img.category_type === type
    );
  };

  const handleUploadClick = (slug: string, type: string) => {
    setCurrentCategory({ slug, type });
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentCategory) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }

    setUploading(currentCategory.slug);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `category-${currentCategory.type}-${currentCategory.slug}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName);

      const existingImage = getImageForCategory(currentCategory.slug, currentCategory.type);

      if (existingImage) {
        // Update existing
        const { error } = await supabase
          .from("category_images")
          .update({ image_url: publicUrl })
          .eq("id", existingImage.id);

        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from("category_images")
          .insert({
            category_slug: currentCategory.slug,
            category_type: currentCategory.type,
            image_url: publicUrl,
          });

        if (error) throw error;
      }

      toast.success("Image mise à jour");
      fetchCategoryImages();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Erreur lors du téléchargement");
    } finally {
      setUploading(null);
      setCurrentCategory(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (slug: string, type: string) => {
    const image = getImageForCategory(slug, type);
    if (!image) return;

    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;

    try {
      const { error } = await supabase
        .from("category_images")
        .delete()
        .eq("id", image.id);

      if (error) throw error;
      toast.success("Image supprimée");
      fetchCategoryImages();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const renderCategoryGrid = (categories: typeof equipmentCategories, type: string) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const image = getImageForCategory(category.slug, type);
        const isUploading = uploading === category.slug;
        const Icon = category.icon;
        const iconImage = category.iconImage;

        return (
          <div
            key={category.id}
            className="border rounded-lg overflow-hidden bg-card"
          >
            <div className="aspect-video relative bg-muted">
              {image ? (
                <>
                  <img
                    src={image.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUploadClick(category.slug, type)}
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(category.slug, type)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => handleUploadClick(category.slug, type)}
                  disabled={isUploading}
                  className="w-full h-full flex flex-col items-center justify-center hover:bg-muted/80 transition-colors"
                >
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <ImageIcon className="h-8 w-8 text-muted-foreground mb-1" />
                      <span className="text-xs text-muted-foreground">
                        Ajouter une image
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="p-3 flex items-center gap-2">
              {Icon ? (
                <Icon className="h-4 w-4 text-primary flex-shrink-0" />
              ) : iconImage ? (
                <img src={iconImage} alt="" className="h-4 w-4 flex-shrink-0" />
              ) : null}
              <span className="text-sm font-medium truncate">{category.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Images des Catégories</h2>
        <p className="text-muted-foreground">
          Gérez les images de fond des cartes de catégories
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <Tabs defaultValue="equipment" className="w-full">
        <TabsList>
          <TabsTrigger value="equipment">Équipements</TabsTrigger>
          <TabsTrigger value="consumable">Consommables</TabsTrigger>
        </TabsList>
        <TabsContent value="equipment" className="mt-6">
          {renderCategoryGrid(equipmentCategories, "equipment")}
        </TabsContent>
        <TabsContent value="consumable" className="mt-6">
          {renderCategoryGrid(consumableCategories, "consumable")}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCategoryImages;
