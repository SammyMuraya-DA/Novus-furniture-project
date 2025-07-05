
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { AlertCircle, Package } from 'lucide-react';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { data: products = [], isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const isLoading = productsLoading || categoriesLoading;
  const hasError = productsError || categoriesError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" text="Loading products..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <EmptyState
            title="Failed to load products"
            description="We're having trouble loading the products. Please try again."
            icon={<AlertCircle className="h-12 w-12 text-red-500" />}
            action={
              <Button onClick={() => refetchProducts()} variant="outline">
                Try Again
              </Button>
            }
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Create category list with "All" option
  const categoryOptions = ['All', ...categories.map(cat => cat.name)];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our complete collection of premium furniture pieces, carefully selected for quality and style.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categoryOptions.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-amber-900 hover:bg-amber-800" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="flex justify-center py-16">
              <EmptyState
                title="No products found"
                description={selectedCategory === 'All' 
                  ? "We don't have any products available at the moment." 
                  : `No products found in the ${selectedCategory} category.`}
                icon={<Package className="h-12 w-12 text-gray-400" />}
                action={
                  selectedCategory !== 'All' && (
                    <Button 
                      onClick={() => setSelectedCategory('All')} 
                      variant="outline"
                    >
                      View All Products
                    </Button>
                  )
                }
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Products;
