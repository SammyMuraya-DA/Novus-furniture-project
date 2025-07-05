
-- Enable RLS on orders table (if not already enabled)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Enable RLS on order_items table (if not already enabled) 
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
CREATE POLICY "Anyone can create orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Create policy to allow admins to view all orders
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create policy to allow admins to update order status
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create policy to allow admins to view order items
DROP POLICY IF EXISTS "Admins can view order items" ON public.order_items;
CREATE POLICY "Admins can view order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);
