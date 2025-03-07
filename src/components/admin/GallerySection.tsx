
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
}

export const GallerySection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setGalleryItems(data || []);
    } catch (error) {
      console.error('Chyba při načítání galerie:', error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst galerii.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !newItemTitle) {
      toast({
        title: "Chyba",
        description: "Vyberte soubor a zadejte název obrázku.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      // 1. Nahrání souboru do storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      // 2. Získání veřejné URL
      const { data: publicURL } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // 3. Uložení záznamu do databáze
      const { error: insertError } = await supabase
        .from('gallery')
        .insert([
          {
            title: newItemTitle,
            description: newItemDescription || null,
            image_url: publicURL.publicUrl
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      toast({
        title: "Obrázek nahrán",
        description: "Obrázek byl úspěšně nahrán do galerie.",
      });

      // Reset formuláře
      setSelectedFile(null);
      setNewItemTitle("");
      setNewItemDescription("");
      if (document.getElementById('file-upload') as HTMLInputElement) {
        (document.getElementById('file-upload') as HTMLInputElement).value = '';
      }

      // Aktualizace seznamu
      fetchGallery();
    } catch (error) {
      console.error('Chyba při nahrávání obrázku:', error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se nahrát obrázek.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Získání URL obrázku před smazáním položky
      const { data: item, error: fetchError } = await supabase
        .from('gallery')
        .select('image_url')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Smazání položky z databáze
      const { error: deleteError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Pokud máme URL, můžeme se pokusit smazat i soubor
      if (item?.image_url) {
        try {
          // Extrahování cesty souboru z URL
          const url = new URL(item.image_url);
          const pathParts = url.pathname.split('/');
          const filePath = pathParts.slice(pathParts.indexOf('gallery')).join('/');

          // Smazání souboru ze storage
          await supabase.storage
            .from('gallery')
            .remove([filePath]);
        } catch (storageError) {
          console.error('Chyba při mazání souboru:', storageError);
          // Pokračujeme i když se nepodaří smazat soubor
        }
      }

      toast({
        title: "Položka smazána",
        description: "Položka byla úspěšně odstraněna z galerie.",
      });

      // Aktualizace seznamu
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Chyba při mazání položky:', error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se smazat položku.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
        <span>Načítání galerie...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid s galerii */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="relative group rounded-lg overflow-hidden border bg-card">
            <div className="aspect-square relative">
              <img 
                src={item.image_url} 
                alt={item.title} 
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Smazat
                </Button>
              </div>
            </div>
            <div className="p-3">
              <h4 className="font-medium truncate">{item.title}</h4>
              {item.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              )}
            </div>
          </div>
        ))}

        {galleryItems.length === 0 && (
          <div className="col-span-full flex items-center justify-center p-8 border rounded-lg">
            <p className="text-muted-foreground">
              Galerie je prázdná
            </p>
          </div>
        )}
      </div>
      
      {/* Formulář pro nahrání */}
      <div className="border rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Přidat nový obrázek</h3>
        
        <div className="space-y-2">
          <Label htmlFor="title">Název obrázku</Label>
          <Input
            id="title"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            placeholder="Zadejte název obrázku"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Popis (volitelný)</Label>
          <Textarea
            id="description"
            value={newItemDescription}
            onChange={(e) => setNewItemDescription(e.target.value)}
            placeholder="Zadejte popis obrázku"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="file-upload">Vyberte soubor</Label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="flex-1"
          />
        </div>
        
        <Button 
          onClick={handleUpload} 
          disabled={!selectedFile || uploading || !newItemTitle}
          className="w-full"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Nahrávání...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Nahrát obrázek
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
