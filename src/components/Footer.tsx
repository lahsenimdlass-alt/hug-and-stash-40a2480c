import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">
              AllMedical<span className="text-primary-foreground/80">Dental</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Votre partenaire de confiance pour l'équipement dentaire professionnel depuis 2009.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Liens rapides</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/catalogue" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Catalogue
              </Link>
              <Link to="/catalogue?category=equipements_dentaires" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Équipements
              </Link>
              <Link to="/promotions" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Promotions
              </Link>
              <Link to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                À propos
              </Link>
              <Link to="/distributeurs" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Distributeurs
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Catégories</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/catalogue?category=equipements_dentaires" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Équipements dentaires
              </Link>
              <Link to="/catalogue?category=consommables" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Consommables dentaires
              </Link>
              <Link to="/demande-devis" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                Demander un devis
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+212500000000" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                <Phone className="h-4 w-4 flex-shrink-0" />
                +212 5XX XXX XXX
              </a>
              <a href="mailto:contact@allmedicaldental.ma" className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                contact@allmedicaldental.ma
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70 text-sm">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Casablanca, Maroc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} AllMedicalDental. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/mentions-legales" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Mentions légales
            </Link>
            <Link to="/politique-confidentialite" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;