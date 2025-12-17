import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">
              All<span className="text-background/80">Medical</span>
            </h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Votre partenaire de confiance pour l'équipement médical et dentaire professionnel depuis 2009.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Liens rapides</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/catalogue" className="text-background/70 hover:text-background transition-colors text-sm">
                Catalogue
              </Link>
              <Link to="/equipements" className="text-background/70 hover:text-background transition-colors text-sm">
                Équipements
              </Link>
              <Link to="/promotions" className="text-background/70 hover:text-background transition-colors text-sm">
                Promotions
              </Link>
              <Link to="/about" className="text-background/70 hover:text-background transition-colors text-sm">
                À propos
              </Link>
              <Link to="/distributeurs" className="text-background/70 hover:text-background transition-colors text-sm">
                Distributeurs
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Catégories</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/catalogue?category=equipements_medicaux" className="text-background/70 hover:text-background transition-colors text-sm">
                Équipements médicaux
              </Link>
              <Link to="/catalogue?category=consommables" className="text-background/70 hover:text-background transition-colors text-sm">
                Consommables
              </Link>
              <Link to="/demande-devis" className="text-background/70 hover:text-background transition-colors text-sm">
                Demander un devis
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+212500000000" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                +212 5XX XXX XXX
              </a>
              <a href="mailto:contact@allmedical.ma" className="flex items-center gap-3 text-background/70 hover:text-background transition-colors text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                contact@allmedical.ma
              </a>
              <div className="flex items-start gap-3 text-background/70 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Casablanca, Maroc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} All Medical. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/mentions-legales" className="text-background/50 hover:text-background transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="text-background/50 hover:text-background transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
