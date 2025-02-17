
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { GripVertical, Plus, Trash2 } from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterContact {
  phone: string;
  email: string;
  address: string;
}

interface NavButton {
  id: string;
  label: string;
  link: string;
  order: number;
}

export const LayoutSection = () => {
  const { toast } = useToast();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "Youtube", url: "https://youtube.com" },
  ]);
  
  const [contact, setContact] = useState<FooterContact>({
    phone: "+420 777 888 999",
    email: "info@umparkour.cz",
    address: "Sportovní 123, Praha",
  });

  const [navButtons, setNavButtons] = useState<NavButton[]>([
    { id: "1", label: "Domů", link: "/", order: 1 },
    { id: "2", label: "Služby", link: "/sluzby/sport", order: 2 },
    { id: "3", label: "Ceník", link: "/cenik", order: 3 },
    { id: "4", label: "O nás", link: "/o-nas", order: 4 },
    { id: "5", label: "Kontakt", link: "/kontakt", order: 5 },
  ]);

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index][field] = value;
    setSocialLinks(newLinks);
  };

  const handleContactChange = (field: keyof FooterContact, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  const handleNavButtonChange = (id: string, field: 'label' | 'link', value: string) => {
    setNavButtons(prev =>
      prev.map(button =>
        button.id === id ? { ...button, [field]: value } : button
      )
    );
  };

  const handleAddNavButton = () => {
    const newButton: NavButton = {
      id: crypto.randomUUID(),
      label: "Nové tlačítko",
      link: "/",
      order: navButtons.length + 1,
    };
    setNavButtons([...navButtons, newButton]);
  };

  const handleDeleteNavButton = (id: string) => {
    setNavButtons(prev => prev.filter(button => button.id !== id));
  };

  const handleMoveButton = (id: string, direction: 'up' | 'down') => {
    setNavButtons(prev => {
      const index = prev.findIndex(button => button.id === id);
      if (
        (direction === 'up' && index === 0) ||
        (direction === 'down' && index === prev.length - 1)
      ) {
        return prev;
      }

      const newButtons = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      [newButtons[index], newButtons[targetIndex]] = [newButtons[targetIndex], newButtons[index]];
      
      return newButtons.map((button, i) => ({ ...button, order: i + 1 }));
    });
  };

  const handleSave = () => {
    // TODO: Implementace ukládání do databáze
    toast({
      title: "Změny uloženy",
      description: "Úpravy hlavičky a patičky byly úspěšně uloženy.",
    });
  };

  return (
    <Tabs defaultValue="header">
      <TabsList className="mb-4">
        <TabsTrigger value="header">Hlavička</TabsTrigger>
        <TabsTrigger value="footer">Patička</TabsTrigger>
      </TabsList>
      
      <TabsContent value="header" className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Logo</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Logo</Label>
              <Input type="file" accept="image/*" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Navigační tlačítka</h3>
            <Button
              onClick={handleAddNavButton}
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Přidat tlačítko
            </Button>
          </div>
          
          <div className="space-y-3">
            {navButtons.map((button, index) => (
              <div
                key={button.id}
                className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 items-center p-3 border rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">#{button.order}</span>
                </div>
                <div>
                  <Input
                    placeholder="Text tlačítka"
                    value={button.label}
                    onChange={(e) => handleNavButtonChange(button.id, 'label', e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Odkaz"
                    value={button.link}
                    onChange={(e) => handleNavButtonChange(button.id, 'link', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveButton(button.id, 'up')}
                    disabled={index === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMoveButton(button.id, 'down')}
                    disabled={index === navButtons.length - 1}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteNavButton(button.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave}>Uložit změny</Button>
      </TabsContent>
      
      <TabsContent value="footer" className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Kontaktní informace</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input
                value={contact.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={contact.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Adresa</Label>
              <Input
                value={contact.address}
                onChange={(e) => handleContactChange("address", e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sociální sítě</h3>
          <div className="space-y-4">
            {socialLinks.map((link, index) => (
              <div key={link.platform} className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Platforma</Label>
                  <Input
                    value={link.platform}
                    onChange={(e) => handleSocialLinkChange(index, "platform", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL</Label>
                  <Input
                    value={link.url}
                    onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave}>Uložit změny</Button>
      </TabsContent>
    </Tabs>
  );
};
