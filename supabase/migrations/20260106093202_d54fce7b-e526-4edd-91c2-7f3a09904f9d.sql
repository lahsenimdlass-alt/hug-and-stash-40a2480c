-- Allow anyone to insert orders (for guest checkout)
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (true);

-- Allow anyone to insert order items (for guest checkout)
CREATE POLICY "Anyone can create order items" 
ON public.order_items 
FOR INSERT 
WITH CHECK (true);