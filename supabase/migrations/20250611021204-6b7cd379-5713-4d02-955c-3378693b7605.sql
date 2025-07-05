
-- Create policy to allow anyone to insert order items (needed for checkout)
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;
CREATE POLICY "Anyone can create order items" 
ON public.order_items 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);
