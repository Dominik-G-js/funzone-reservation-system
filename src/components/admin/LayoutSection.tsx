
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterContact {
  phone: string;
  email: string;
  address: string;
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

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...socialLinks];
    newLinks[index][field] = value;
    setSocialLinks(newLinks);
  };

  const handleContactChange = (field: keyof FooterContact, value: string) => {
    setContact(prev => ({ ...prev, [field]: value }));
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
          <h3 className="text-lg font-medium">Logo a navigace</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Logo</Label>
              <Input type="file" accept="image/*" />
            </div>
          </div>
        </div>
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
