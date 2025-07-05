
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SiteContent {
  id: string;
  section: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  data: any;
  updated_at: string;
}

export const useSiteContent = (section: string) => {
  return useQuery({
    queryKey: ['site-content', section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('section', section)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data as SiteContent | null;
    },
  });
};

export const useUpdateSiteContent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (content: Omit<SiteContent, 'id' | 'updated_at'>) => {
      // First, try to get existing content
      const { data: existingContent } = await supabase
        .from('site_content')
        .select('id')
        .eq('section', content.section)
        .single();

      let result;
      
      if (existingContent) {
        // Update existing content
        const { data, error } = await supabase
          .from('site_content')
          .update({
            title: content.title,
            subtitle: content.subtitle,
            description: content.description,
            image_url: content.image_url,
            data: content.data,
            updated_at: new Date().toISOString(),
          })
          .eq('section', content.section)
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      } else {
        // Insert new content
        const { data, error } = await supabase
          .from('site_content')
          .insert([{
            ...content,
            updated_at: new Date().toISOString(),
          }])
          .select()
          .single();
        
        if (error) throw error;
        result = data;
      }
      
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['site-content', data.section] });
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update content: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};
