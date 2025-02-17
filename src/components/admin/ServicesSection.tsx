
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export const ServicesSection = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newService = {
      id: crypto.randomUUID(),
      name,
      description,
      duration: Number(duration),
      price: Number(price)
    };

    setServices([...services, newService]);
    
    // Reset form
    setName("");
    setDescription("");
    setDuration("");
    setPrice("");

    toast({
      title: "Služba přidána",
      description: "Nová služba byla úspěšně přidána do systému.",
    });
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(service => service.id !== id));
    toast({
      title: "Služba smazána",
      description: "Služba byla úspěšně odstraněna ze systému.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Seznam služeb */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-4 border rounded-lg flex items-center justify-between gap-4"
          >
            <div className="flex-1">
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span>{service.duration} min</span>
                <span>{service.price} Kč</span>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(service.id)}
            >
              Smazat
            </Button>
          </div>
        ))}
      </div>

      {/* Formulář pro přidání nové služby */}
      <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              placeholder="Název služby"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Délka (minuty)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Popis služby"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="number"
            placeholder="Cena (Kč)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Přidat službu</Button>
      </form>
    </div>
  );
};
