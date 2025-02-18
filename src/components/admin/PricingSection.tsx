
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";

interface PriceItem {
  id: string;
  title: string;
  price: number;
  duration: string;
  description: string;
}

interface Membership {
  id: string;
  name: string;
  price: number;
  period: string;
  benefits: string[];
}

export const PricingSection = () => {
  const { toast } = useToast();
  const [priceItems, setPriceItems] = useState<PriceItem[]>([
    {
      id: "1",
      title: "Jednorázový vstup",
      price: 200,
      duration: "2 hodiny",
      description: "Vstup do tělocvičny s trenérem",
    },
  ]);

  const [memberships, setMemberships] = useState<Membership[]>([
    {
      id: "1",
      name: "Základní členství",
      price: 1000,
      period: "měsíc",
      benefits: ["Neomezený vstup", "Sleva 10% na akce", "Rezervace předem"],
    },
  ]);

  const [newBenefit, setNewBenefit] = useState("");

  const handleAddPriceItem = () => {
    const newItem: PriceItem = {
      id: crypto.randomUUID(),
      title: "",
      price: 0,
      duration: "",
      description: "",
    };
    setPriceItems([...priceItems, newItem]);
  };

  const handleUpdatePriceItem = (id: string, field: keyof PriceItem, value: string | number) => {
    setPriceItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleDeletePriceItem = (id: string) => {
    setPriceItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Položka smazána",
      description: "Položka ceníku byla úspěšně odstraněna.",
    });
  };

  const handleAddMembership = () => {
    const newMembership: Membership = {
      id: crypto.randomUUID(),
      name: "",
      price: 0,
      period: "měsíc",
      benefits: [],
    };
    setMemberships([...memberships, newMembership]);
  };

  const handleUpdateMembership = (id: string, field: keyof Membership, value: string | number | string[]) => {
    setMemberships(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddBenefit = (membershipId: string) => {
    if (!newBenefit.trim()) return;
    
    setMemberships(prev =>
      prev.map(membership =>
        membership.id === membershipId
          ? { ...membership, benefits: [...membership.benefits, newBenefit.trim()] }
          : membership
      )
    );
    setNewBenefit("");
  };

  const handleRemoveBenefit = (membershipId: string, benefitIndex: number) => {
    setMemberships(prev =>
      prev.map(membership =>
        membership.id === membershipId
          ? {
              ...membership,
              benefits: membership.benefits.filter((_, index) => index !== benefitIndex),
            }
          : membership
      )
    );
  };

  const handleDeleteMembership = (id: string) => {
    setMemberships(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Členství smazáno",
      description: "Členství bylo úspěšně odstraněno z ceníku.",
    });
  };

  const handleSave = () => {
    // TODO: Implementace ukládání do databáze
    toast({
      title: "Změny uloženy",
      description: "Úpravy ceníku byly úspěšně uloženy.",
    });
  };

  return (
    <Tabs defaultValue="single">
      <TabsList className="mb-4">
        <TabsTrigger value="single">Jednorázové vstupné</TabsTrigger>
        <TabsTrigger value="memberships">Členství</TabsTrigger>
      </TabsList>

      <TabsContent value="single" className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Jednorázové vstupné</h3>
          <Button onClick={handleAddPriceItem} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Přidat položku
          </Button>
        </div>

        <div className="space-y-4">
          {priceItems.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Název</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => handleUpdatePriceItem(item.id, "title", e.target.value)}
                    placeholder="Název položky"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Délka trvání</Label>
                  <Input
                    value={item.duration}
                    onChange={(e) => handleUpdatePriceItem(item.id, "duration", e.target.value)}
                    placeholder="např. 2 hodiny"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cena (Kč)</Label>
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleUpdatePriceItem(item.id, "price", Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Popis</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => handleUpdatePriceItem(item.id, "description", e.target.value)}
                    placeholder="Popis položky"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePriceItem(item.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Smazat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="memberships" className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Členství</h3>
          <Button onClick={handleAddMembership} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Přidat členství
          </Button>
        </div>

        <div className="space-y-4">
          {memberships.map((membership) => (
            <div key={membership.id} className="p-4 border rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Název členství</Label>
                  <Input
                    value={membership.name}
                    onChange={(e) => handleUpdateMembership(membership.id, "name", e.target.value)}
                    placeholder="Název členství"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Období</Label>
                  <Input
                    value={membership.period}
                    onChange={(e) => handleUpdateMembership(membership.id, "period", e.target.value)}
                    placeholder="např. měsíc"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cena (Kč)</Label>
                  <Input
                    type="number"
                    value={membership.price}
                    onChange={(e) => handleUpdateMembership(membership.id, "price", Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Výhody členství</Label>
                <div className="space-y-2">
                  {membership.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span>• {benefit}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBenefit(membership.id, index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      value={newBenefit}
                      onChange={(e) => setNewBenefit(e.target.value)}
                      placeholder="Nová výhoda"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddBenefit(membership.id);
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => handleAddBenefit(membership.id)}
                    >
                      Přidat
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteMembership(membership.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Smazat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <Button onClick={handleSave} className="mt-6">Uložit změny</Button>
    </Tabs>
  );
};
