import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Headphones, FileText, Wrench, Clock } from "lucide-react";

const SAV = () => {
  const services = [
    {
      icon: Headphones,
      title: "Support technique",
      description: "Une équipe d'experts disponible pour répondre à toutes vos questions"
    },
    {
      icon: Wrench,
      title: "Réparation",
      description: "Service de réparation rapide pour tous vos équipements"
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Accès aux manuels et guides d'utilisation de vos produits"
    },
    {
      icon: Clock,
      title: "Disponibilité",
      description: "Réponse sous 24h ouvrées pour toute demande"
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
                Service après-vente
              </h1>
              <p className="text-lg text-muted-foreground">
                Notre équipe dédiée est à votre écoute pour vous accompagner et assurer la maintenance 
                de vos équipements médicaux et dentaires.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {services.map((service, index) => (
                <Card key={index} className="text-center border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Nous contacter</h2>
                <p className="text-muted-foreground">
                  Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais
                </p>
              </div>

              <Card>
                <CardContent className="p-6 md:p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input id="firstName" placeholder="Votre prénom" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input id="lastName" placeholder="Votre nom" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" type="email" placeholder="votre@email.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" type="tel" placeholder="+212 6 12 34 56 78" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Numéro de commande</Label>
                      <Input id="orderNumber" placeholder="CMD-123456" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet *</Label>
                      <Input id="subject" placeholder="Objet de votre demande" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
                      Envoyer la demande
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      * Champs obligatoires. Nous nous engageons à vous répondre sous 24h ouvrées.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-muted-foreground">
                Retrouvez les réponses aux questions les plus courantes
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Quel est le délai de réparation ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Le délai moyen de réparation est de 5 à 10 jours ouvrés selon la complexité de l'intervention.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Proposez-vous un matériel de prêt ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Oui, nous mettons à disposition du matériel de prêt pendant la durée de la réparation selon disponibilité.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Quelle est la durée de garantie ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Tous nos produits bénéficient d'une garantie constructeur de 2 ans minimum.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SAV;