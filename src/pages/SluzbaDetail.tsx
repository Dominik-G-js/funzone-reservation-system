
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { serviceOptions } from "@/types/reservation";

const SluzbaDetail = () => {
  const { categoryId, serviceId } = useParams();
  const navigate = useNavigate();

  // Najít kategorii a službu podle ID
  const category = Object.entries(serviceOptions).find(([id]) => id === categoryId);
  const service = category?.[1].find((s) => s.id === serviceId);

  if (!service) {
    return <div>Služba nenalezena</div>;
  }

  const getServiceDescription = (id: string) => {
    const descriptions: Record<string, string> = {
      parkour: "Naučte se základy parkouru pod vedením zkušených instruktorů. Vhodné pro začátečníky i pokročilé.",
      trampoliny: "Skákání na profesionálních trampolínách pro všechny věkové kategorie.",
      akrobacie: "Základy akrobacie, salt a přemetů v bezpečném prostředí.",
      gymnastika: "Gymnastická průprava a trénink pod vedením kvalifikovaných trenérů.",
      "volny-vstup": "Volný vstup do našeho areálu s možností využití všech dostupných aktivit.",
      narozeniny: "Uspořádejte nezapomenutelnou narozeninovou oslavu plnou zábavy a pohybu.",
      teambuilding: "Firemní akce a teambuilding s různými aktivitami na míru.",
      special: "Speciální akce a události pro veřejnost.",
      vystoupeni: "Profesionální vystoupení našeho týmu na různých akcích.",
      shows: "Ukázky parkouru, akrobacie a dalších dovedností.",
      reklama: "Spolupráce na reklamních projektech a natáčení.",
      spoluprace: "Možnosti dlouhodobé spolupráce a partnerství.",
    };
    return descriptions[id] || "Popis brzy doplníme";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">{service.name}</h1>
            <Button onClick={() => navigate('/rezervace')} className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Rezervovat termín
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">O službě</h2>
              <p className="text-lg text-muted-foreground">
                {getServiceDescription(service.id)}
              </p>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold mb-4">Dostupné termíny</h2>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-semibold">Tento týden</h3>
                  <p className="text-sm text-muted-foreground">
                    Pondělí - Pátek: 9:00 - 18:00<br />
                    Sobota: 10:00 - 16:00<br />
                    Neděle: Zavřeno
                  </p>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/rezervace?type=${categoryId}&service=${serviceId}`)}
                >
                  Zobrazit všechny termíny
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SluzbaDetail;
