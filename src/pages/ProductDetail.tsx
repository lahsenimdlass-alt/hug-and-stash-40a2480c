import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductImageGallery from "@/components/ProductImageGallery";
import { Loader2, ArrowLeft, Package, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { equipmentCategories, consumableCategories } from "@/data/categories";
import { useCartStore } from "@/stores/cartStore";
import { useProductPromotion } from "@/hooks/useProductPromotion";
import { toast } from "sonner";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
}

interface ProductImage {
  id: string;
  image_url: string;
  display_order: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  const { promotion } = useProductPromotion(product?.id || "", product?.price || 0);

  const handleAddToCart = () => {
    if (!product) return;
    
    const priceToUse = promotion ? promotion.discountedPrice : product.price;
    
    addItem({
      id: product.id,
      title: product.title,
      price: priceToUse,
      image_url: product.image_url,
    });
    toast.success("Produit ajouté au panier!");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const [productResult, imagesResult] = await Promise.all([
          supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .eq("is_active", true)
            .maybeSingle(),
          supabase
            .from("product_images")
            .select("*")
            .eq("product_id", id)
            .order("display_order", { ascending: true })
        ]);

        if (productResult.error) {
          console.error("Error fetching product:", productResult.error);
          return;
        }

        setProduct(productResult.data);
        setProductImages(imagesResult.data || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getCategoryInfo = (categorySlug: string) => {
    const allCategories = [...equipmentCategories, ...consumableCategories];
    return allCategories.find((c) => c.id === categorySlug || c.slug === categorySlug);
  };

  const isEquipment = product?.category?.includes("equipement") || 
    equipmentCategories.some(c => c.id === product?.category || c.slug === product?.category);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-6">
              <Package className="w-10 h-10 text-destructive" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
            <p className="text-muted-foreground mb-8">
              Ce produit n'existe pas ou n'est plus disponible.
            </p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(product.category);
  const backLink = isEquipment ? "/equipements" : "/consommables";

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to={backLink} className="hover:text-foreground transition-colors">
                {isEquipment ? "Équipements" : "Consommables"}
              </Link>
            </li>
            {categoryInfo && (
              <>
                <li>/</li>
                <li>
                  <Link 
                    to={`${backLink}/${categoryInfo.slug}`} 
                    className="hover:text-foreground transition-colors"
                  >
                    {categoryInfo.name}
                  </Link>
                </li>
              </>
            )}
            <li>/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Gallery */}
          <div className="space-y-4 relative">
            {promotion && (
              <Badge className="absolute top-4 left-4 z-10 bg-red-500 hover:bg-red-600 text-lg px-3 py-1">
                -{promotion.discountPercentage}%
              </Badge>
            )}
            <ProductImageGallery
              images={productImages.map(img => img.image_url)}
              mainImage={product.image_url}
              productTitle={product.title}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {categoryInfo && (
                <Badge variant="secondary" className="mb-3">
                  {categoryInfo.name}
                </Badge>
              )}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-4">
                {promotion ? (
                  <div className="flex flex-col">
                    <span className="text-3xl md:text-4xl font-bold text-red-600">
                      {promotion.discountedPrice.toFixed(2)} MAD
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xl text-muted-foreground line-through">
                        {product.price.toFixed(2)} MAD
                      </span>
                      <Badge className="bg-red-500 hover:bg-red-600">
                        -{promotion.discountPercentage}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Promotion : {promotion.promotionTitle}
                    </p>
                  </div>
                ) : (
                  <span className="text-3xl md:text-4xl font-bold text-primary">
                    {product.price.toFixed(2)} MAD
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {product.stock_quantity > 0 ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    En stock ({product.stock_quantity} disponibles)
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Rupture de stock
                  </Badge>
                )}
              </div>
            </div>

            {product.description && (
              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>
            )}

            <div className="border-t pt-6 space-y-4">
              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleAddToCart}
                disabled={product.stock_quantity <= 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier
              </Button>
              
              <Button size="lg" variant="outline" className="w-full" asChild>
                <a href="tel:+212600000000">
                  <Phone className="w-5 h-5 mr-2" />
                  Nous contacter
                </a>
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p>
                💡 Pour toute question, n'hésitez pas à nous contacter. 
                Notre équipe est à votre disposition pour vous accompagner.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;