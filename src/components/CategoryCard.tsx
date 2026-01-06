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
        <CardContent className="relative flex flex-col items-center justify-center p-6 text-center h-full min-h-[160px]">
          {/* Background image */}
          {imageUrl && (
            <div className="absolute inset-0 z-0">
              <img 
                src={imageUrl} 
                alt="" 
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
            </div>
          )}
          
          {/* Content */}
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
              {name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
