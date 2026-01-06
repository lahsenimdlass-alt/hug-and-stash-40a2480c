-- Create junction table for promotions and products
CREATE TABLE public.promotion_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  promotion_id UUID NOT NULL REFERENCES public.promotions(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(promotion_id, product_id)
);

-- Enable RLS
ALTER TABLE public.promotion_products ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Promotion products are viewable by everyone" 
ON public.promotion_products 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage promotion products" 
ON public.promotion_products 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete orders
CREATE POLICY "Admins can delete orders" 
ON public.orders 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete order items
CREATE POLICY "Admins can delete order items" 
ON public.order_items 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));