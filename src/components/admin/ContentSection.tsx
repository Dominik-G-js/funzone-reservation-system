
import { FormEvent, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  content: string;
  slug?: string;
}

export const ContentSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [currentItem, setCurrentItem] = useState<ContentItem | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setContentItems(data);
      if (data.length > 0) {
        setCurrentItem(data[0]);
      }
    } catch (error) {
      console.error('Chyba při načítání obsahu:', error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst obsah.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    const newItem: ContentItem = {
      id: crypto.randomUUID(),
      title: "Nový článek",
      content: "",
      slug: ""
    };
    setCurrentItem(newItem);
  };

  const handleSelectItem = (item: ContentItem) => {
    setCurrentItem(item);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Obsah smazán",
        description: "Obsah byl úspěšně smazán.",
      });

      // Aktualizujeme seznam a vybereme první položku, pokud existuje
      const updatedItems = contentItems.filter(item => item.id !== id);
      setContentItems(updatedItems);
      if (currentItem?.id === id) {
        setCurrentItem(updatedItems.length > 0 ? updatedItems[0] : null);
      }
    } catch (error) {
      console.error('Chyba při mazání obsahu:', error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se smazat obsah.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;

    try {
      // Vytvoříme slug z titulku, pokud není zadán
      const slug = currentItem.slug || currentItem.title
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Odstraní diakritiku
        .replace(/[^a-z0-9]/g, '-') // Nahradí nealfanumerické znaky pomlčkou
        .replace(/-+/g, '-') // Nahradí vícenásobné pomlčky jednou
        .replace(/^-|-$/g, ''); // Odstraní pomlčky na začátku a konci

      const item = { ...currentItem, slug };

      // Kontrola, zda se jedná o novou položku nebo aktualizaci
      const isNewItem = !contentItems.some(i => i.id === item.id);

      let result;
      if (isNewItem) {
        result = await supabase.from('content').insert([item]);
      } else {
        result = await supabase.from('content').update(item).eq('id', item.id);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Obsah uložen",
        description: "Změny byly úspěšně uloženy.",
      });

      // Aktualizujeme seznam po úspěšném uložení
      fetchContent();
    } catch (error) {
      console.error('Chyba při ukládání obsahu:', error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se uložit obsah.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
        <span>Načítání obsahu...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sidebar s články */}
      <div className="md:col-span-1 space-y-4">
        <Button onClick={handleCreateNew} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Nový článek
        </Button>
        
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
          {contentItems.map(item => (
            <div 
              key={item.id} 
              className={`p-3 rounded-lg border cursor-pointer ${currentItem?.id === item.id ? 'bg-primary/10 border-primary' : 'hover:bg-accent/5'}`}
              onClick={() => handleSelectItem(item)}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium truncate">{item.title}</h4>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground truncate">{item.slug || 'Bez URL'}</p>
            </div>
          ))}

          {contentItems.length === 0 && (
            <p className="text-sm text-muted-foreground text-center p-4">
              Žádný obsah nebyl nalezen
            </p>
          )}
        </div>
      </div>

      {/* Editor obsahu */}
      <div className="md:col-span-3">
        {currentItem ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Název</label>
              <Input
                placeholder="Název stránky"
                value={currentItem.title}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">URL (slug)</label>
              <Input
                placeholder="url-stranky"
                value={currentItem.slug || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, slug: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Nechte prázdné pro automatické vygenerování z názvu
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Obsah</label>
              <Textarea
                placeholder="Obsah stránky"
                value={currentItem.content || ''}
                onChange={(e) => setCurrentItem({ ...currentItem, content: e.target.value })}
                className="min-h-[300px]"
              />
            </div>
            
            <Button type="submit">Uložit změny</Button>
          </form>
        ) : (
          <div className="flex items-center justify-center h-full p-8 border rounded-lg">
            <p className="text-muted-foreground">
              Vyberte článek k úpravě nebo vytvořte nový
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
