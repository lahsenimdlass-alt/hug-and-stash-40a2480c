import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Loader2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { equipmentCategories, consumableCategories } from "@/data/categories";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock_quantity: number;
  is_active: boolean;
}

const CategoryProducts = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const isEquipment = location.pathname.startsWith("/equipements");
  const categories = isEquipment ? equipmentCategories : consumableCategories;
  const category = categories.find((c) => c.slug === slug);
  const backLink = isEquipment ? "/equipements" : "/consommables";
  const backLabel = isEquipment ? "Équipements" : "Consommables";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Map slug to database category - for now we filter by matching category field
        const dbCategory = isEquipment ? "equipements_dentaires" : "consommables_dentaires";
        
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .eq("category", dbCategory)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching products:", error);
          return;
        }

        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug, isEquipment, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            to={backLink}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux {backLabel}
          </Link>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              {category && <category.icon className="w-8 h-8 text-primary" />}
            </div>
            <h1 className="text-4xl font-bold mb-4">{category?.name || "Catégorie"}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos produits dans la catégorie {category?.name}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Aucun produit disponible</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Les produits de cette catégorie seront bientôt disponibles.
            </p>
            <Button asChild>
              <Link to={backLink}>Retour aux catégories</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/produit/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-muted">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <span className="text-6xl">📷</span>
                      </div>
                    )}
                  </div>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/produit/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>
                  {product.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {product.price.toFixed(2)} MAD
                    </span>
                    <Button size="sm" asChild>
                      <Link to={`/produit/${product.id}`}>Voir détails</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryProducts;
