
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageUpload from '@/components/ImageUpload';
import { useAdminProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { useAdminCategories } from '@/hooks/useCategories';

const ProductsManagement = () => {
  const { data: products = [], isLoading: productsLoading } = useAdminProducts();
  const { data: categories = [] } = useAdminCategories();
  
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image_url: '',
    stock_quantity: 0,
  });

  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image_url: '',
    stock_quantity: 0,
  });

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProduct.mutateAsync({
      ...newProduct,
      is_active: true,
    });
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      image_url: '',
      stock_quantity: 0,
    });
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product.id);
    setEditProduct({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category: product.category,
      image_url: product.image_url || '',
      stock_quantity: product.stock_quantity,
    });
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    await updateProduct.mutateAsync({
      id: editingProduct,
      ...editProduct,
    });
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      image_url: '',
      stock_quantity: 0,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="price">Price (KES)</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock_quantity}
                onChange={(e) => setNewProduct(prev => ({ ...prev, stock_quantity: Number(e.target.value) }))}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            
            <div className="md:col-span-2">
              <ImageUpload
                label="Product Image"
                onImageUploaded={(url) => setNewProduct(prev => ({ ...prev, image_url: url }))}
                currentImageUrl={newProduct.image_url}
              />
            </div>
            
            <div className="md:col-span-2">
              <Button type="submit" className="bg-amber-900 hover:bg-amber-800" disabled={createProduct.isPending}>
                {createProduct.isPending ? 'Creating...' : 'Create Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Products</CardTitle>
        </CardHeader>
        <CardContent>
          {productsLoading ? (
            <p className="text-center py-8">Loading products...</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg p-4">
                  {editingProduct === product.id ? (
                    <form onSubmit={handleUpdateProduct} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-name">Product Name</Label>
                          <Input
                            id="edit-name"
                            value={editProduct.name}
                            onChange={(e) => setEditProduct(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-category">Category</Label>
                          <Select value={editProduct.category} onValueChange={(value) => setEditProduct(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-price">Price (KES)</Label>
                          <Input
                            id="edit-price"
                            type="number"
                            value={editProduct.price}
                            onChange={(e) => setEditProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-stock">Stock Quantity</Label>
                          <Input
                            id="edit-stock"
                            type="number"
                            value={editProduct.stock_quantity}
                            onChange={(e) => setEditProduct(prev => ({ ...prev, stock_quantity: Number(e.target.value) }))}
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={editProduct.description}
                            onChange={(e) => setEditProduct(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <ImageUpload
                            label="Product Image"
                            onImageUploaded={(url) => setEditProduct(prev => ({ ...prev, image_url: url }))}
                            currentImageUrl={editProduct.image_url}
                          />
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button type="submit" className="bg-amber-900 hover:bg-amber-800" disabled={updateProduct.isPending}>
                          {updateProduct.isPending ? 'Updating...' : 'Update Product'}
                        </Button>
                        <Button type="button" variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.category} • {formatPrice(product.price)}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock_quantity}</p>
                        <p className="text-sm text-gray-500">Status: {product.is_active ? 'Active' : 'Inactive'}</p>
                        {product.description && (
                          <p className="text-sm text-gray-500 mt-1">{product.description.substring(0, 100)}...</p>
                        )}
                        {product.image_url && (
                          <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover rounded mt-2" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateProduct.mutate({ 
                            id: product.id, 
                            is_active: !product.is_active 
                          })}
                        >
                          {product.is_active ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this product?')) {
                              deleteProduct.mutate(product.id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsManagement;
