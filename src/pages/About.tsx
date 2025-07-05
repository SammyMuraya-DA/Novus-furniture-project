
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useSiteContent } from '@/hooks/useSiteContent';

const About = () => {
  const { data: aboutContent } = useSiteContent('about');

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {aboutContent?.title || 'About Novus Furniture'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutContent?.description || 'We are passionate about creating beautiful, functional furniture that transforms spaces into homes.'}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded with a vision to make quality furniture accessible to every Kenyan home, 
                  Novus Furniture has grown from a small family business to one of the most trusted 
                  furniture retailers in the country.
                </p>
                <p>
                  We believe that furniture is more than just functional pieces – it's about creating 
                  spaces where memories are made, where families gather, and where life happens. 
                  That's why we carefully curate every piece in our collection.
                </p>
                <p>
                  With years of experience in the furniture industry, we've built relationships with 
                  skilled craftsmen and suppliers who share our commitment to quality and sustainability.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://ypkefyzvhfhpnsjxzoma.supabase.co/storage/v1/object/public/product-images//IMG-20250603-WA0158.jpg"
                alt="Our furniture showroom"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from product selection to customer service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">Q</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every piece meets our strict standards for durability and craftsmanship.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Affordability</h3>
              <p className="text-gray-600">
                Beautiful furniture shouldn't break the bank. We offer competitive prices without sacrificing quality.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service</h3>
              <p className="text-gray-600">
                From consultation to delivery, we provide exceptional service at every step of your journey.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">♻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to environmentally responsible practices and sustainable sourcing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our furniture collection in person. Our showroom is designed to inspire 
              and help you visualize how our pieces will look in your home.
            </p>
          </div>
          
          <div className="bg-amber-50 rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Come See Us Today
                </h3>
                <div className="space-y-3 text-gray-600">
                  <p><strong>Address:</strong> Thika Road, Roysambu Carwash, Nairobi</p>
                  <p><strong>Phone:</strong> +254 708 921 377</p>
                  <p><strong>Email:</strong> novusfurniture254@gmail.com</p>
                  <p><strong>Hours:</strong> Monday - Saturday: 8:00 AM - 6:00 PM</p>
                  <p><strong>Sunday:</strong> 10:00 AM - 4:00 PM</p>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src="https://ypkefyzvhfhpnsjxzoma.supabase.co/storage/v1/object/public/product-images//IMG-20250603-WA0157.jpg"
                  alt="Our showroom interior"
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
