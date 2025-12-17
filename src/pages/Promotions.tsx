import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Percent, Clock } from "lucide-react";

const Promotions = () => {
  const promos = [
    {
      id: 1,
      name: "Pack Diagnostic Complet",
      category: "Équipement médical",
      originalPrice: "899.00",
      discountedPrice: "699.00",
      discount: "-22%",
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800",
      endsIn: "3 jours"
    },
    {
      id: 2,
      name: "Kit Instruments Dentaires Premium",
      category: "Matériel dentaire",
      originalPrice: "1299.00",
      discountedPrice: "999.00",
      discount: "-23%",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800",
      endsIn: "5 jours"
    },
    {
      id: 3,
      name: "Lot Consommables Protection x100",
      category: "Consommables",
      originalPrice: "299.00",
      discountedPrice: "199.00",
      discount: "-33%",
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=800",
      endsIn: "7 jours"
    },
    {
      id: 4,
      name: "Tensiomètre Digital Pro",
      category: "Monitoring",
      originalPrice: "249.00",
      discountedPrice: "179.00",
      discount: "-28%",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800",
      endsIn: "2 jours"
    },
    {
      id: 5,
      name: "Fauteuil Dentaire Électrique",
      category: "Mobilier",
      originalPrice: "3999.00",
      discountedPrice: "2999.00",
      discount: "-25%",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800",
      endsIn: "10 jours"
    },
    {
      id: 6,
      name: "Stérilisateur Autoclave",
      category: "Hygiène",
      originalPrice: "1899.00",
      discountedPrice: "1499.00",
      discount: "-21%",
      image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=800",
      endsIn: "4 jours"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary/20 via-background to-primary/20 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary-foreground px-4 py-2 rounded-full mb-6">
                <Percent className="h-5 w-5" />
                <span className="font-semibold">Promotions en cours</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Profitez de nos offres exceptionnelles
              </h1>
              <p className="text-lg text-muted-foreground">
                Découvrez nos promotions sur une sélection d'équipements médicaux et dentaires. 
                Offres limitées dans le temps !
              </p>
            </div>
          </div>
        </section>

        {/* Banner */}
        <section className="py-8 bg-foreground">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-background">
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8" />
                <div>
                  <div className="font-semibold">Ventes flash</div>
                  <div className="text-sm opacity-90">Jusqu'à -35% sur tout le site</div>
                </div>
              </div>
              <Button variant="secondary" size="lg">
                Voir toutes les offres
              </Button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promos.map((promo) => (
                <Card key={promo.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative overflow-hidden bg-muted">
                    <img
                      src={promo.image}
                      alt={promo.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-secondary text-secondary-foreground text-sm px-3 py-1">
                        {promo.discount}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="destructive" className="text-sm px-3 py-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {promo.endsIn}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <p className="text-xs text-muted-foreground uppercase">{promo.category}</p>
                    <h3 className="font-semibold text-lg line-clamp-2">{promo.name}</h3>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{promo.discountedPrice}€</span>
                      <span className="text-lg text-muted-foreground line-through">{promo.originalPrice}€</span>
                    </div>

                    <Button className="w-full">
                      Profiter de l'offre
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto border-2">
              <CardContent className="p-8 md:p-12 text-center space-y-6">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary flex items-center justify-center">
                  <Percent className="h-8 w-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold">Ne manquez aucune promotion</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Inscrivez-vous à notre newsletter pour recevoir en avant-première toutes nos offres 
                  et promotions exclusives
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="flex-1 px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button size="lg">
                    S'inscrire
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Promotions;
