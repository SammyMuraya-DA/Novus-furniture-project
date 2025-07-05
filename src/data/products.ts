
import { DatabaseProduct } from '@/hooks/useProducts';

// Convert database product to the format expected by existing components
export const convertDatabaseProduct = (dbProduct: DatabaseProduct) => ({
  id: dbProduct.id,
  name: dbProduct.name,
  price: dbProduct.price,
  image: dbProduct.image_url || '',
  category: dbProduct.category,
  description: dbProduct.description || '',
});
