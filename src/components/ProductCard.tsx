
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { DatabaseProduct } from '@/hooks/useProducts';
import { useState } from 'react';

interface ProductCardProps {
  product: DatabaseProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock_quantity === 0) return;
    
    setIsLoading(true);
    try {
      const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || '',
        category: product.category,
        description: product.description || '',
      };
      
      addToCart(cartProduct);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {!imageError && product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image available</span>
            </div>
          )}
          
          <div className="absolute top-4 left-4">
            <span className="bg-amber-900 text-white px-2 py-1 text-xs font-semibold rounded">
              {product.category}
            </span>
          </div>
          
          {product.stock_quantity <= 5 && product.stock_quantity > 0 && (
            <div className="absolute top-4 right-4">
              <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded">
                Only {product.stock_quantity} left
              </span>
            </div>
          )}
          
          {product.stock_quantity === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 font-semibold rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-900 transition-colors line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-900">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-6 pb-6">
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock_quantity === 0 || isLoading}
          className="w-full bg-amber-900 hover:bg-amber-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Adding...' : product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
