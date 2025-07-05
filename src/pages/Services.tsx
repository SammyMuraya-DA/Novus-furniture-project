
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useServices } from '@/hooks/useServices';
import LoadingSpinner from '@/components/LoadingSpinner';

const Services = () => {
  const { data: services = [], isLoading } = useServices();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" text="Loading services..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From design consultation to delivery and setup, we provide comprehensive furniture solutions for your home and office.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {service.image_url && (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                    )}
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full"
                    >
                      <a href="https://wa.me/254708921377">Learn More</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔧</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Assembly & Installation</h3>
                <p className="text-gray-600">
                  Professional assembly and installation services for all furniture pieces. Our skilled technicians ensure perfect setup.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Warranty & Support</h3>
                <p className="text-gray-600">
                  Comprehensive warranty coverage and ongoing support for all our furniture pieces. Peace of mind guaranteed.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📏</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Space Planning</h3>
                <p className="text-gray-600">
                  Expert space planning services to optimize your room layout and furniture placement for maximum functionality.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔄</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Flexible Payment Plan</h3>
                <p className="text-gray-600">
                  We offer easy and flexible payment plans to make furnishing your space stress-free.
                  Choose from installment options that fit your budget and enjoy your new furniture now while paying over time.
                  Enjoy convenient payment options and fast, reliable delivery across Kenya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-lg mb-8 opacity-90">
            Contact us to discuss your specific furniture needs and get a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <a href="https://wa.me/254708921377">WhatsApp Us</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-amber-900">
              <a href="mailto:novusfurniture254@gmail.com">Send Email</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
