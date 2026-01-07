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
  FileText
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Import consumable category icons
import empreintesIcon from "@/assets/categories/empreintes.png";
import usageUniqueIcon from "@/assets/categories/usage-unique.png";
import hygieneDesinfectionIcon from "@/assets/categories/hygiene-desinfection.png";
import blanchimentIcon from "@/assets/categories/blanchiment.png";
import fraisePolissageIcon from "@/assets/categories/fraise-polissage.png";
import cimentsIcon from "@/assets/categories/ciments.png";
import restaurationIcon from "@/assets/categories/restauration.png";
import reconstitutionIcon from "@/assets/categories/reconstitution.png";
import protheseLaboratoireIcon from "@/assets/categories/prothese-laboratoire.png";
import instrumentationsIcon from "@/assets/categories/instrumentations.png";

export interface Category {
  id: string;
  name: string;
  icon?: LucideIcon;
  iconImage?: string;
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
  { id: "empreintes", name: "Empreintes", iconImage: empreintesIcon, slug: "empreintes" },
  { id: "usage-unique", name: "Usage Unique", iconImage: usageUniqueIcon, slug: "usage-unique" },
  { id: "hygiene-desinfection", name: "Hygiène & Désinfection", iconImage: hygieneDesinfectionIcon, slug: "hygiene-desinfection" },
  { id: "blanchiment", name: "Blanchiment", iconImage: blanchimentIcon, slug: "blanchiment" },
  { id: "fraise-polissage", name: "Fraise et Polissage", iconImage: fraisePolissageIcon, slug: "fraise-polissage" },
  { id: "endodontie", name: "Endodontie", icon: FileText, slug: "endodontie" },
  { id: "ciments", name: "Ciments", iconImage: cimentsIcon, slug: "ciments" },
  { id: "restauration", name: "Restauration", iconImage: restaurationIcon, slug: "restauration" },
  { id: "reconstitution", name: "Reconstitution", iconImage: reconstitutionIcon, slug: "reconstitution" },
  { id: "prothese-laboratoire", name: "Prothèse et Laboratoire", iconImage: protheseLaboratoireIcon, slug: "prothese-laboratoire" },
  { id: "instrumentations", name: "Instrumentations", iconImage: instrumentationsIcon, slug: "instrumentations" },
];
