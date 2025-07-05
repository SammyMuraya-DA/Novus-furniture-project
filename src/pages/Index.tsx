
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useSiteContent } from '@/hooks/useSiteContent';

const Index = () => {
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: heroContent } = useSiteContent('hero');
  
  // Show featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {heroContent?.title || 'Transform Your Space with Premium Furniture'}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {heroContent?.subtitle || 'Discover our curated collection of modern and classic furniture pieces designed to elevate your home.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-amber-900 hover:bg-amber-800 text-white px-8 py-3"
                  onClick={() => window.location.href = '/products'}
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-amber-900 text-amber-900 hover:bg-amber-50 px-8 py-3"
                  onClick={() => window.location.href = '/about'}
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroContent?.image_url || ""}
                alt="Premium Furniture"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked pieces that combine style, comfort, and exceptional craftsmanship
            </p>
          </div>
          
          {productsLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-amber-900 text-amber-900 hover:bg-amber-50"
              onClick={() => window.location.href = '/products'}
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Novus Furniture?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best furniture shopping experience in Kenya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">★</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Every piece is carefully selected and crafted using the finest materials and techniques.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Payment plan</h3>
              <p className="text-gray-600">
                We offer easy and flexible payment plans to make furnishing your space stress-free.
                Choose from installment options that fit your budget and enjoy your new furniture now while paying over time.
                Enjoy convenient payment options and fast, reliable delivery across Kenya.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Advice</h3>
              <p className="text-gray-600">
                Our experienced team provides personalized recommendations for your space.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
