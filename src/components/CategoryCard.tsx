import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { useCategoryImage } from "@/hooks/useCategoryImage";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  href: string;
  slug?: string;
  categoryType?: "equipment" | "consumable";
}

const CategoryCard = ({ name, icon: Icon, href, slug, categoryType }: CategoryCardProps) => {
  const { imageUrl } = useCategoryImage(
    slug || href.split("/").pop() || "", 
    categoryType || "equipment"
  );

  return (
    <Link to={href} className="block">
      <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 border-border/50 hover:border-primary/50 overflow-hidden">
        <CardContent className="relative flex flex-col items-center justify-end p-0 text-center h-full min-h-[180px]">
          {/* Background image with better visibility */}
          {imageUrl ? (
            <div className="absolute inset-0 z-0">
              <img 
                src={imageUrl} 
                alt={name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:from-primary/10 group-hover:to-primary/20 transition-colors duration-300" />
          )}
          
          {/* Content */}
          <div className="relative z-10 p-4 w-full">
            <div className="w-12 h-12 mx-auto rounded-full bg-background/90 backdrop-blur-sm shadow-lg flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
              <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-sm leading-tight drop-shadow-sm">
              {name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
