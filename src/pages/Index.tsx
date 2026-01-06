import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroCategory from "@/components/HeroCategory";
import { ArrowRight, Truck, Shield, Clock, HeadphonesIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Expédition sous 24-48h sur tout le Maroc"
    },
    {
      icon: Shield,
      title: "Garantie Qualité",
      description: "Produits certifiés CE et normes ISO"
    },
    {
      icon: Clock,
      title: "Disponibilité",
      description: "Large stock disponible immédiatement"
    },
    {
      icon: HeadphonesIcon,
      title: "Support Expert",
      description: "Équipe dédiée à votre service"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section - Two Categories */}
        <section className="flex flex-col md:flex-row">
          <HeroCategory type="equipment" />
          <HeroCategory type="consumables" />
        </section>

        {/* Features Bar */}
        <section className="border-y border-border bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 tracking-tight">
                Votre partenaire en équipement dentaire
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                AllMedicalDental distribue une gamme complète d'équipements et de consommables dentaires 
                de haute qualité. Notre engagement : équiper votre cabinet dentaire avec les meilleurs 
                produits et un service irréprochable.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/catalogue">
                    Voir le catalogue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/about">À propos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Engagements Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12 tracking-tight text-center">
              Nos Engagements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6 bg-background rounded-2xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Qualité Garantie</h3>
                <p className="text-muted-foreground">
                  Tous nos produits sont certifiés CE et répondent aux normes internationales les plus strictes.
                </p>
              </div>
              <div className="text-center p-6 bg-background rounded-2xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <HeadphonesIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Service Client</h3>
                <p className="text-muted-foreground">
                  Une équipe dédiée à votre écoute pour vous accompagner dans tous vos projets dentaires.
                </p>
              </div>
              <div className="text-center p-6 bg-background rounded-2xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Livraison Rapide</h3>
                <p className="text-muted-foreground">
                  Expédition sous 24 à 48h sur tout le Maroc avec suivi de votre commande.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
