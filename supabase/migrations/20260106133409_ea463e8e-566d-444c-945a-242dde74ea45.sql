-- RLS policies for homepage_slides
CREATE POLICY "Slides are viewable by everyone" 
ON public.homepage_slides 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage slides" 
ON public.homepage_slides 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for category_images
CREATE POLICY "Category images are viewable by everyone" 
ON public.category_images 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage category images" 
ON public.category_images 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));