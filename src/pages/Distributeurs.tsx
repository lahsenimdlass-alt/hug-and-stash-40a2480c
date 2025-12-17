import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

const Distributeurs = () => {
  const distributors = [
    {
      region: "Île-de-France",
      name: "All Medical Paris",
      address: "123 Avenue de la Santé, 75001 Paris",
      phone: "+33 1 23 45 67 89",
      email: "paris@allmedical.fr"
    },
    {
      region: "Auvergne-Rhône-Alpes",
      name: "All Medical Lyon",
      address: "45 Rue de la République, 69002 Lyon",
      phone: "+33 4 12 34 56 78",
      email: "lyon@allmedical.fr"
    },
    {
      region: "Provence-Alpes-Côte d'Azur",
      name: "All Medical Marseille",
      address: "78 Boulevard Longchamp, 13001 Marseille",
      phone: "+33 4 91 23 45 67",
      email: "marseille@allmedical.fr"
    },
    {
      region: "Occitanie",
      name: "All Medical Toulouse",
      address: "12 Place du Capitole, 31000 Toulouse",
      phone: "+33 5 61 23 45 67",
      email: "toulouse@allmedical.fr"
    },
    {
      region: "Nouvelle-Aquitaine",
      name: "All Medical Bordeaux",
      address: "34 Cours de l'Intendance, 33000 Bordeaux",
      phone: "+33 5 56 12 34 56",
      email: "bordeaux@allmedical.fr"
    },
    {
      region: "Hauts-de-France",
      name: "All Medical Lille",
      address: "67 Rue Faidherbe, 59000 Lille",
      phone: "+33 3 20 12 34 56",
      email: "lille@allmedical.fr"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Nos distributeurs
              </h1>
              <p className="text-lg text-muted-foreground">
                Trouvez le distributeur All Medical le plus proche de chez vous pour un service de proximité 
                et des conseils personnalisés.
              </p>
            </div>
          </div>
        </section>

        {/* Distributors Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {distributors.map((distributor, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
                        {distributor.region}
                      </span>
                      <h3 className="text-xl font-semibold">{distributor.name}</h3>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{distributor.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                        <a href={`tel:${distributor.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {distributor.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                        <a href={`mailto:${distributor.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                          {distributor.email}
                        </a>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      Voir sur la carte
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Devenir distributeur</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Vous souhaitez rejoindre notre réseau de distributeurs ? Contactez-nous pour en savoir plus 
              sur nos conditions de partenariat.
            </p>
            <Button size="lg">
              Nous contacter
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Distributeurs;
