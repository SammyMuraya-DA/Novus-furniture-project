
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { useAdminCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/hooks/useCategories';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, FolderOpen } from 'lucide-react';

const CategoriesManagement = () => {
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useAdminCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const { toast } = useToast();

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    sort_order: 0,
    is_active: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newCategory.name.trim()) {
      newErrors.name = 'Category name is required';
    } else if (newCategory.name.length < 2) {
      newErrors.name = 'Category name must be at least 2 characters';
    } else if (categories.some(cat => cat.name.toLowerCase() === newCategory.name.toLowerCase())) {
      newErrors.name = 'Category with this name already exists';
    }

    if (newCategory.sort_order < 0) {
      newErrors.sort_order = 'Sort order must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await createCategory.mutateAsync(newCategory);
      setNewCategory({
        name: '',
        description: '',
        sort_order: 0,
        is_active: true,
      });
      setErrors({});
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCategory = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Are you sure you want to delete the category "${categoryName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteCategory.mutateAsync(categoryId);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (categoryId: string, currentStatus: boolean) => {
    try {
      await updateCategory.mutateAsync({ 
        id: categoryId, 
        is_active: !currentStatus 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category status. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (categoriesLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="lg" text="Loading categories..." />
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="flex justify-center py-8">
        <EmptyState
          title="Failed to load categories"
          description="There was an error loading the categories. Please try again."
          icon={<AlertCircle className="h-12 w-12 text-red-500" />}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCategory} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="categoryName">Category Name *</Label>
              <Input
                id="categoryName"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                className={errors.name ? 'border-red-500' : ''}
                placeholder="Enter category name"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                type="number"
                min="0"
                value={newCategory.sort_order}
                onChange={(e) => setNewCategory(prev => ({ ...prev, sort_order: Number(e.target.value) }))}
                className={errors.sort_order ? 'border-red-500' : ''}
                placeholder="0"
              />
              {errors.sort_order && <p className="text-red-500 text-sm mt-1">{errors.sort_order}</p>}
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="categoryDescription">Description</Label>
              <Textarea
                id="categoryDescription"
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description (optional)"
                rows={3}
              />
            </div>
            
            <div className="md:col-span-2">
              <Button 
                type="submit" 
                className="bg-amber-900 hover:bg-amber-800" 
                disabled={createCategory.isPending}
              >
                {createCategory.isPending ? 'Creating...' : 'Create Category'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Categories ({categories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <EmptyState
              title="No categories found"
              description="Create your first category to get started."
              icon={<FolderOpen className="h-12 w-12 text-gray-400" />}
            />
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{category.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          category.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {category.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Sort Order: {category.sort_order}</p>
                      {category.description && (
                        <p className="text-sm text-gray-500 mt-2">{category.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleActive(category.id, category.is_active)}
                        disabled={updateCategory.isPending}
                      >
                        {category.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id, category.name)}
                        disabled={deleteCategory.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesManagement;
