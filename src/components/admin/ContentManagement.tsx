
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from '@/components/ImageUpload';
import { useSiteContent, useUpdateSiteContent } from '@/hooks/useSiteContent';
import { useToast } from '@/hooks/use-toast';

const ContentManagement = () => {
  const { data: heroContent } = useSiteContent('hero');
  const { data: aboutContent } = useSiteContent('about');
  const updateSiteContent = useUpdateSiteContent();
  const { toast } = useToast();
  
  const [heroForm, setHeroForm] = useState({
    title: '',
    subtitle: '',
    image_url: '',
  });
  
  const [aboutForm, setAboutForm] = useState({
    title: '',
    description: '',
  });

  // Initialize forms with existing content
  useEffect(() => {
    if (heroContent) {
      setHeroForm({
        title: heroContent.title || '',
        subtitle: heroContent.subtitle || '',
        image_url: heroContent.image_url || '',
      });
    }
  }, [heroContent]);

  useEffect(() => {
    if (aboutContent) {
      setAboutForm({
        title: aboutContent.title || '',
        description: aboutContent.description || '',
      });
    }
  }, [aboutContent]);

  const handleUpdateHero = async () => {
    await updateSiteContent.mutateAsync({
      section: 'hero',
      title: heroForm.title,
      subtitle: heroForm.subtitle,
      description: '',
      image_url: heroForm.image_url,
      data: null,
    });
    toast({
      title: "Success",
      description: "Homepage content updated successfully",
    });
  };

  const handleUpdateAbout = async () => {
    await updateSiteContent.mutateAsync({
      section: 'about',
      title: aboutForm.title,
      subtitle: '',
      description: aboutForm.description,
      image_url: '',
      data: null,
    });
    toast({
      title: "Success",
      description: "About page content updated successfully",
    });
  };

  return (
    <Tabs defaultValue="homepage" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="homepage">Homepage</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>

      <TabsContent value="homepage">
        <Card>
          <CardHeader>
            <CardTitle>Homepage Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                value={heroForm.title}
                onChange={(e) => setHeroForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter hero section title"
              />
            </div>
            
            <div>
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Textarea
                id="heroSubtitle"
                value={heroForm.subtitle}
                onChange={(e) => setHeroForm(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Enter hero section subtitle"
              />
            </div>
            
            <ImageUpload
              label="Hero Image"
              onImageUploaded={(url) => setHeroForm(prev => ({ ...prev, image_url: url }))}
              currentImageUrl={heroForm.image_url}
            />
            
            <Button 
              onClick={handleUpdateHero} 
              className="bg-amber-900 hover:bg-amber-800"
              disabled={updateSiteContent.isPending}
            >
              {updateSiteContent.isPending ? 'Updating...' : 'Update Homepage'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>About Page Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="aboutTitle">Page Title</Label>
              <Input
                id="aboutTitle"
                value={aboutForm.title}
                onChange={(e) => setAboutForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter about page title"
              />
            </div>
            
            <div>
              <Label htmlFor="aboutDescription">Description</Label>
              <Textarea
                id="aboutDescription"
                value={aboutForm.description}
                onChange={(e) => setAboutForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter about page description"
                rows={6}
              />
            </div>
            
            <Button 
              onClick={handleUpdateAbout} 
              className="bg-amber-900 hover:bg-amber-800"
              disabled={updateSiteContent.isPending}
            >
              {updateSiteContent.isPending ? 'Updating...' : 'Update About Page'}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ContentManagement;
