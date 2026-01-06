-- Table for homepage slides (if not exists)
CREATE TABLE IF NOT EXISTS public.homepage_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  link_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.homepage_slides ENABLE ROW LEVEL SECURITY;

-- Table for category background images (if not exists)
CREATE TABLE IF NOT EXISTS public.category_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_slug TEXT NOT NULL UNIQUE,
  category_type TEXT NOT NULL CHECK (category_type IN ('equipment', 'consumable')),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.category_images ENABLE ROW LEVEL SECURITY;

-- Triggers for updated_at
CREATE TRIGGER update_homepage_slides_updated_at
BEFORE UPDATE ON public.homepage_slides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_category_images_updated_at
BEFORE UPDATE ON public.category_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();