import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { useCategoryImage } from "@/hooks/useCategoryImage";

interface CategoryCardProps {
  name: string;
  icon?: LucideIcon;
  iconImage?: string;
  href: string;
  slug?: string;
  categoryType?: "equipment" | "consumable";
}

const CategoryCard = ({ name, icon: Icon, iconImage, href, slug, categoryType }: CategoryCardProps) => {
  const { imageUrl } = useCategoryImage(
    slug || href.split("/").pop() || "", 
    categoryType || "equipment"
  );

  return (
    <Link to={href}>
      <Card className="group h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 overflow-hidden rounded-2xl">
        <CardContent className="relative flex flex-col items-center justify-center p-0 text-center h-full min-h-[200px]">
          {/* Background image - full visibility */}
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
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 z-[1] bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
          
          {/* Content centered */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 gap-3">
          {/* Icon */}
          {iconImage ? (
            <img 
              src={iconImage} 
              alt={name}
              className="w-20 h-20 object-contain"
            />
          ) : Icon ? (
            <Icon className="w-16 h-16 text-white" />
          ) : null}
            
            {/* Title */}
            <h3 className="font-semibold text-white text-lg leading-tight">
              {name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
