import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";

const CartButton = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <Link to="/panier">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default CartButton;
