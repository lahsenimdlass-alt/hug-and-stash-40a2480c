import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  category: "equipements_dentaires" | "consommables";
  image_url: string | null;
  stock_quantity: number;
  is_active: boolean;
}

// Mock data for dental products
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Fauteuil Dentaire Électrique",
    description: "Fauteuil dentaire ergonomique avec réglages électriques multiples",
    price: 4999.00,
    category: "equipements_dentaires",
    image_url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800",
    stock_quantity: 5,
    is_active: true
  },
  {
    id: "2",
    title: "Kit Instruments Dentaires Premium",
    description: "Ensemble complet d'instruments dentaires en acier inoxydable",
    price: 1299.00,
    category: "equipements_dentaires",
    image_url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800",
    stock_quantity: 8,
    is_active: true
  },
  {
    id: "3",
    title: "Composite Dentaire Universal",
    description: "Kit composite photopolymérisable toutes teintes",
    price: 189.00,
    category: "consommables",
    image_url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=800",
    stock_quantity: 50,
    is_active: true
  },
  {
    id: "4",
    title: "Lampe à Polymériser LED",
    description: "Lampe LED haute puissance pour photopolymérisation",
    price: 449.00,
    category: "equipements_dentaires",
    image_url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800",
    stock_quantity: 15,
    is_active: true
  }
];

const Catalogue = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") as "equipements_dentaires" | "consommables" | null;

  useEffect(() => {
    // Simulate loading with mock data
    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredProducts = mockProducts.filter(p => p.is_active);
        if (category && (category === "equipements_dentaires" || category === "consommables")) {
          filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const categoryLabels: Record<string, string> = {
    equipements_dentaires: "Équipements Dentaires",
    consommables: "Consommables Dentaires",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {category ? categoryLabels[category] || "Catalogue Produits" : "Catalogue Produits"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection complète d'équipements et consommables dentaires de qualité professionnelle
          </p>
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
              Notre catalogue est en cours de mise à jour. Les produits seront bientôt disponibles.
            </p>
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
                    <Button 
                      size="sm" 
                      asChild
                    >
                      <Link to={`/produit/${product.id}`}>
                        Voir détails
                      </Link>
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

export default Catalogue;
