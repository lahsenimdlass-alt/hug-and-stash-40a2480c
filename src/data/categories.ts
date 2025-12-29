import { 
  Radio, 
  Cog, 
  Lightbulb, 
  Waves, 
  Gauge, 
  Scissors, 
  Zap, 
  Monitor, 
  Shield, 
  Wind, 
  Stethoscope,
  Droplets,
  Trash2,
  SprayCan,
  Sparkles,
  CircleDot,
  FileText,
  Layers,
  Square,
  Wrench,
  FlaskConical,
  Hammer
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  slug: string;
}

export const equipmentCategories: Category[] = [
  { id: "radiographie", name: "Radiographie", icon: Radio, slug: "radiographie" },
  { id: "pieces-rotatives", name: "Pièces Rotatives", icon: Cog, slug: "pieces-rotatives" },
  { id: "lampe-photo", name: "Lampe à Photopolymériser", icon: Lightbulb, slug: "lampe-photo" },
  { id: "detartreurs", name: "Détartreurs", icon: Waves, slug: "detartreurs" },
  { id: "moteur-endodontie", name: "Moteur d'Endodontie", icon: Gauge, slug: "moteur-endodontie" },
  { id: "moteur-chirurgie", name: "Moteur de Chirurgie", icon: Scissors, slug: "moteur-chirurgie" },
  { id: "laser-diode", name: "Laser Diode", icon: Zap, slug: "laser-diode" },
  { id: "cad-cam", name: "CAD/CAM", icon: Monitor, slug: "cad-cam" },
  { id: "sterilisation", name: "Stérilisation", icon: Shield, slug: "sterilisation" },
  { id: "compresseurs-aspiration", name: "Compresseurs / Aspiration", icon: Wind, slug: "compresseurs-aspiration" },
  { id: "unite-soin", name: "Unité de Soin", icon: Stethoscope, slug: "unite-soin" },
];

export const consumableCategories: Category[] = [
  { id: "empreintes", name: "Empreintes", icon: Droplets, slug: "empreintes" },
  { id: "usage-unique", name: "Usage Unique", icon: Trash2, slug: "usage-unique" },
  { id: "hygiene-desinfection", name: "Hygiène & Désinfection", icon: SprayCan, slug: "hygiene-desinfection" },
  { id: "blanchiment", name: "Blanchiment", icon: Sparkles, slug: "blanchiment" },
  { id: "fraise-polissage", name: "Fraise et Polissage", icon: CircleDot, slug: "fraise-polissage" },
  { id: "endodontie", name: "Endodontie", icon: FileText, slug: "endodontie" },
  { id: "ciments", name: "Ciments", icon: Layers, slug: "ciments" },
  { id: "restauration", name: "Restauration", icon: Square, slug: "restauration" },
  { id: "reconstitution", name: "Reconstitution", icon: Wrench, slug: "reconstitution" },
  { id: "prothese-laboratoire", name: "Prothèse et Laboratoire", icon: FlaskConical, slug: "prothese-laboratoire" },
  { id: "instrumentations", name: "Instrumentations", icon: Hammer, slug: "instrumentations" },
];
