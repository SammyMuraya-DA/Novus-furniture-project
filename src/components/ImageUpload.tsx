
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUploaded, 
  currentImageUrl, 
  label = "Image" 
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl || '');
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setPreviewUrl(publicUrl);
      onImageUploaded(publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to upload image: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 15MB",
        variant: "destructive",
      });
      return;
    }

    uploadImage(file);
  };

  const removeImage = () => {
    setPreviewUrl('');
    onImageUploaded('');
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {previewUrl ? (
        <div className="relative inline-block">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={removeImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <Label htmlFor="image-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Click to upload an image
              </span>
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF up to 15MB
          </p>
        </div>
      )}
      
      {uploading && (
        <div className="text-center">
          <div className="inline-flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-900 mr-2"></div>
            <span className="text-sm text-gray-600">Uploading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
