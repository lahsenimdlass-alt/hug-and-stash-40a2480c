import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  href: string;
}

const CategoryCard = ({ name, icon: Icon, href }: CategoryCardProps) => {
  return (
    <Link to={href}>
      <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 hover:border-primary/30">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[160px]">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm leading-tight">
            {name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
