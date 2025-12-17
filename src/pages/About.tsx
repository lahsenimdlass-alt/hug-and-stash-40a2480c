import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Globe, TrendingUp } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Nous sélectionnons uniquement des produits de haute qualité certifiés CE"
    },
    {
      icon: Users,
      title: "Proximité",
      description: "Une équipe dédiée à l'écoute de vos besoins pour un service personnalisé"
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "À la pointe des dernières technologies médicales et dentaires"
    },
    {
      icon: TrendingUp,
      title: "Croissance",
      description: "Partenaire de votre développement avec des solutions évolutives"
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
                Qui sommes-nous ?
              </h1>
              <p className="text-lg text-muted-foreground">
                All Medical est votre partenaire de confiance depuis plus de 15 ans dans la distribution 
                d'équipements médicaux et dentaires professionnels en France.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Notre histoire</h2>
                <p className="text-muted-foreground">
                  Fondée en 2009, All Medical est née de la volonté de proposer aux professionnels de santé 
                  des équipements de qualité supérieure, accompagnés d'un service client irréprochable.
                </p>
                <p className="text-muted-foreground">
                  Aujourd'hui, nous sommes fiers de servir plus de 5 000 professionnels à travers toute la France, 
                  des cabinets dentaires aux établissements hospitaliers, en passant par les cliniques spécialisées.
                </p>
                <p className="text-muted-foreground">
                  Notre engagement ? Vous fournir les meilleurs équipements aux meilleurs prix, avec un service 
                  après-vente réactif et des conseils d'experts pour vous accompagner dans tous vos projets.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800"
                  alt="Notre équipe"
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Des principes qui guident notre action au quotidien
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Années d'expérience</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <div className="text-muted-foreground">Clients satisfaits</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10000+</div>
                <div className="text-muted-foreground">Produits en stock</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24-48h</div>
                <div className="text-muted-foreground">Délai de livraison</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
