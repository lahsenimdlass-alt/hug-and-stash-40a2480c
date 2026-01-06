-- Add category_type column to homepage_slides table
ALTER TABLE public.homepage_slides 
ADD COLUMN category_type text DEFAULT NULL;

-- Add a comment to explain the column
COMMENT ON COLUMN public.homepage_slides.category_type IS 'Type of category: equipements or consommables. NULL means the slide appears on the main homepage.';