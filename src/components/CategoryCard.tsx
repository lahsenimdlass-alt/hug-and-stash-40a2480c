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
    <Link to={href}>
      <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/30 overflow-hidden">
        <CardContent className="relative flex flex-col items-center justify-center p-0 text-center h-full min-h-[160px]">
          {/* Background image - full visibility like homepage slides */}
          {imageUrl ? (
            <div className="absolute inset-0 z-0">
              <img 
                src={imageUrl} 
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 bg-muted" />
          )}
          
          {/* Content overlay - semi-transparent background for text readability */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-end p-4">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 w-full">
              <div className="flex items-center justify-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
                  {name}
                </h3>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
