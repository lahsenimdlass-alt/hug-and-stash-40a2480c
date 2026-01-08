import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { useCategories } from "@/hooks/useCategories";
import { Loader2 } from "lucide-react";

const Equipements = () => {
  const { categories, loading } = useCategories("equipment");

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Équipements Dentaires</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète d'équipements dentaires professionnels de haute qualité
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                iconImage={category.icon_url || undefined}
                href={`/equipements/${category.slug}`}
                slug={category.slug}
                categoryType="equipment"
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Equipements;
