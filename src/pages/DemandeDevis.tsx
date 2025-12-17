import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";

const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" }),
  email: z
    .string()
    .trim()
    .email({ message: "Email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Numéro de téléphone invalide" })
    .max(20, { message: "Le numéro ne peut pas dépasser 20 caractères" }),
  company: z
    .string()
    .trim()
    .min(2, { message: "Le nom de l'entreprise doit contenir au moins 2 caractères" })
    .max(150, { message: "Le nom de l'entreprise ne peut pas dépasser 150 caractères" }),
  productCategory: z
    .string()
    .min(1, { message: "Veuillez sélectionner une catégorie" }),
  quantity: z
    .string()
    .trim()
    .min(1, { message: "Veuillez indiquer une quantité estimée" })
    .max(50, { message: "La quantité ne peut pas dépasser 50 caractères" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(2000, { message: "Le message ne peut pas dépasser 2000 caractères" }),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const DemandeDevis = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      productCategory: "",
      quantity: "",
      message: "",
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      // TODO: Implement actual quote request submission (e.g., send to backend/email)
      console.log("Quote request:", data);
      
      setIsSubmitted(true);
      toast.success("Demande envoyée avec succès!");
      form.reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la demande. Veuillez réessayer.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary/90 to-accent py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-primary-foreground">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-full mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Demande de Devis Personnalisé
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Obtenez un devis sur mesure pour vos achats en gros ou équipements médicaux spécifiques
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Prix Compétitifs</h3>
                <p className="text-sm text-muted-foreground">
                  Tarifs préférentiels pour les achats en volume
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Réponse Rapide</h3>
                <p className="text-sm text-muted-foreground">
                  Devis personnalisé sous 24-48h
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Accompagnement</h3>
                <p className="text-sm text-muted-foreground">
                  Conseil personnalisé par nos experts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center animate-fade-in">
                  <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-green-900 mb-2">
                    Demande Envoyée avec Succès!
                  </h2>
                  <p className="text-green-700 mb-6">
                    Notre équipe commerciale vous contactera dans les plus brefs délais avec votre devis personnalisé.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Faire une nouvelle demande
                  </Button>
                </div>
              ) : (
                <div className="bg-card rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Formulaire de Demande</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom Complet *</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom complet" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Entreprise/Organisation *</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom de votre entreprise" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="votre@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone *</FormLabel>
                              <FormControl>
                                <Input placeholder="+212 6XX XXX XXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="productCategory"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Catégorie de Produits *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une catégorie" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="equipment">Équipement Médical</SelectItem>
                                  <SelectItem value="dental">Matériel Dentaire</SelectItem>
                                  <SelectItem value="consumables">Consommables</SelectItem>
                                  <SelectItem value="furniture">Mobilier Médical</SelectItem>
                                  <SelectItem value="other">Autre</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantité Estimée *</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: 50 unités, 10 cartons..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message / Détails *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Décrivez vos besoins spécifiques, les produits souhaités, et toute autre information pertinente..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="bg-secondary/20 rounded-lg p-4 text-sm text-muted-foreground">
                        <p>
                          * Champs obligatoires. Vos données sont traitées de manière confidentielle
                          et ne seront utilisées que pour répondre à votre demande de devis.
                        </p>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto"
                        disabled={form.formState.isSubmitting}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {form.formState.isSubmitting ? "Envoi en cours..." : "Envoyer la Demande"}
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="py-12 bg-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Besoin d'Aide?</h2>
              <p className="text-muted-foreground mb-6">
                Notre équipe commerciale est disponible pour répondre à toutes vos questions
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-card rounded-lg px-6 py-3 shadow-sm">
                  <p className="font-semibold text-primary">📞 +212 5XX XXX XXX</p>
                </div>
                <div className="bg-card rounded-lg px-6 py-3 shadow-sm">
                  <p className="font-semibold text-primary">📧 contact@allmedical.ma</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DemandeDevis;
