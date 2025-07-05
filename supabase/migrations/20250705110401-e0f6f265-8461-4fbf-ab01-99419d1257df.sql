
-- Update the product-images bucket to allow larger file uploads (50MB limit)
UPDATE storage.buckets 
SET file_size_limit = 52428800 
WHERE id = 'product-images';

-- If the above doesn't work (older Supabase versions), we may need to recreate the bucket
-- First, let's ensure the bucket exists and update its configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('product-images', 'product-images', true, 52428800)
ON CONFLICT (id) 
DO UPDATE SET file_size_limit = 52428800;
