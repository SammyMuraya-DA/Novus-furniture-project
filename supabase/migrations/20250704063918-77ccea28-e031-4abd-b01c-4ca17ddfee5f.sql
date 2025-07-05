
-- Create a table for categories
CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view active categories
CREATE POLICY "Anyone can view active categories"
ON public.categories
FOR SELECT
USING (is_active = true);

-- Allow admins to manage all categories
CREATE POLICY "Admins can manage categories"
ON public.categories
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Insert default categories
INSERT INTO public.categories (name, description, sort_order) VALUES
('Sofas', 'Comfortable seating solutions', 1),
('Chairs', 'Individual seating furniture', 2),
('Tables', 'Dining and coffee tables', 3),
('Beds', 'Bedroom furniture', 4),
('Storage', 'Storage and organization solutions', 5);

-- Add a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at 
    BEFORE UPDATE ON public.categories 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
