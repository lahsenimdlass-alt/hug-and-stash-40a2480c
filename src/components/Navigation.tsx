import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, User, Phone } from "lucide-react";
import { equipmentCategories, consumableCategories } from "@/data/categories";
import CartButton from "@/components/CartButton";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      name: "Équipements",
      link: "/equipements",
      subcategories: equipmentCategories.map(cat => ({ name: cat.name, slug: cat.slug }))
    },
    {
      name: "Consommables",
      link: "/consommables",
      subcategories: consumableCategories.map(cat => ({ name: cat.name, slug: cat.slug }))
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <a href="tel:+212123456789" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">+212 1 23 45 67 89</span>
              </a>
              <span className="hidden md:inline text-muted-foreground">Livraison 24-48h</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/distributeurs" className="text-muted-foreground hover:text-foreground transition-colors">
                Distributeurs
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                À propos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="All Dental" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/catalogue" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Catalogue
            </Link>
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <Link 
                  to={category.link}
                  className="text-sm text-foreground hover:text-muted-foreground transition-colors py-2"
                >
                  {category.name}
                </Link>
                <div className="absolute left-0 top-full mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-background border border-border shadow-lg py-2 max-h-80 overflow-y-auto">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`${category.link}/${sub.slug}`}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link to="/panier" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Panier
            </Link>
            <Link to="/promotions" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              Promotions
            </Link>
            <Link to="/sav" className="text-sm text-foreground hover:text-muted-foreground transition-colors">
              SAV
            </Link>
          </nav>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-muted text-sm border-0 focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <CartButton />
            <Link to="/admin/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <nav className="flex flex-col gap-2 mt-8">
                  <Link
                    to="/catalogue"
                    className="py-3 text-sm font-medium border-b border-border"
                    onClick={() => setIsOpen(false)}
                  >
                    Catalogue
                  </Link>
                  {categories.map((category) => (
                    <div key={category.name} className="border-b border-border pb-2">
                      <Link 
                        to={category.link}
                        className="block py-3 text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.name}
                      </Link>
                      <div className="pl-4 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub.slug}
                            to={`${category.link}/${sub.slug}`}
                            className="block py-2 text-sm text-muted-foreground"
                            onClick={() => setIsOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Link
                    to="/panier"
                    className="py-3 text-sm font-medium border-b border-border"
                    onClick={() => setIsOpen(false)}
                  >
                    Panier
                  </Link>
                  <Link
                    to="/promotions"
                    className="py-3 text-sm font-medium border-b border-border"
                    onClick={() => setIsOpen(false)}
                  >
                    Promotions
                  </Link>
                  <Link
                    to="/sav"
                    className="py-3 text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    SAV
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;