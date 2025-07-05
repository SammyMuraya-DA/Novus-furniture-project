
-- Create services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on services table
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create policies for services
CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
USING (is_admin());

-- Create trigger for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default services data
INSERT INTO public.services (title, description, image_url, sort_order) VALUES
('Custom Design', 'Work with our designers to create custom furniture pieces tailored to your specific needs and space.', 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop', 1),
('Home Delivery', 'Free delivery and setup service within Nairobi and surrounding areas.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop', 2),
('Interior Consultation', 'Get expert advice on furniture placement and interior design from our experienced consultants.', 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop', 3);
