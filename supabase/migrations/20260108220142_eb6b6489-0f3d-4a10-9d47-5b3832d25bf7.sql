-- Create categories table for managing equipment and consumable subcategories
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  category_type TEXT NOT NULL CHECK (category_type IN ('equipment', 'consumable')),
  icon_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(slug, category_type)
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage categories" 
ON public.categories 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing equipment categories
INSERT INTO public.categories (name, slug, category_type, display_order) VALUES
('Radiographie', 'radiographie', 'equipment', 1),
('Pièces Rotatives', 'pieces-rotatives', 'equipment', 2),
('Lampe à Photopolymériser', 'lampe-photo', 'equipment', 3),
('Détartreurs', 'detartreurs', 'equipment', 4),
('Moteur d''Endodontie', 'moteur-endodontie', 'equipment', 5),
('Moteur de Chirurgie', 'moteur-chirurgie', 'equipment', 6),
('Laser Diode', 'laser-diode', 'equipment', 7),
('CAD/CAM', 'cad-cam', 'equipment', 8),
('Stérilisation', 'sterilisation', 'equipment', 9),
('Compresseurs / Aspiration', 'compresseurs-aspiration', 'equipment', 10),
('Unité de Soin', 'unite-soin', 'equipment', 11);

-- Insert existing consumable categories
INSERT INTO public.categories (name, slug, category_type, display_order) VALUES
('Empreintes', 'empreintes', 'consumable', 1),
('Usage Unique', 'usage-unique', 'consumable', 2),
('Hygiène & Désinfection', 'hygiene-desinfection', 'consumable', 3),
('Blanchiment', 'blanchiment', 'consumable', 4),
('Fraise et Polissage', 'fraise-polissage', 'consumable', 5),
('Endodontie', 'endodontie', 'consumable', 6),
('Ciments', 'ciments', 'consumable', 7),
('Restauration', 'restauration', 'consumable', 8),
('Reconstitution', 'reconstitution', 'consumable', 9),
('Prothèse et Laboratoire', 'prothese-laboratoire', 'consumable', 10),
('Instrumentations', 'instrumentations', 'consumable', 11);