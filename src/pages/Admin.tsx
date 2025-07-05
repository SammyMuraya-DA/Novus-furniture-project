
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import AdminAuth from '@/components/AdminAuth';
import ProductsManagement from '@/components/admin/ProductsManagement';
import CategoriesManagement from '@/components/admin/CategoriesManagement';
import ServicesManagement from '@/components/admin/ServicesManagement';
import ContentManagement from '@/components/admin/ContentManagement';
import { useAuth, useUserRole } from '@/hooks/useAuth';
import { useAdminProducts } from '@/hooks/useProducts';
import { useAdminCategories } from '@/hooks/useCategories';
import { useAdminServices } from '@/hooks/useServices';

const Admin = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { data: userRole, isLoading: roleLoading } = useUserRole();
  const { data: products = [] } = useAdminProducts();
  const { data: categories = [] } = useAdminCategories();
  const { data: services = [] } = useAdminServices();

  // Show loading while checking auth
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Show auth form if not logged in
  if (!user) {
    return <AdminAuth />;
  }

  // Check if user is admin
  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-600">Access denied. Admin privileges required.</p>
            <Button onClick={() => signOut()} className="w-full mt-4">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={() => signOut()} variant="outline">
            Sign Out
          </Button>
        </div>
        
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
            <TabsTrigger value="categories">Categories ({categories.length})</TabsTrigger>
            <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsManagement />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManagement />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManagement />
          </TabsContent>

          <TabsContent value="content">
            <ContentManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
