
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Sparkles, Users, Star } from "lucide-react";
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
    <div className="min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na hlavní stránku
          </Button>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-8 glass-card p-6 rounded-2xl"
          >
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {service.name}
              </h1>
              <p className="text-muted-foreground mt-2">Objevte svůj potenciál s námi</p>
            </div>
            <Button 
              onClick={() => navigate('/rezervace')} 
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 transition-colors"
            >
              <Calendar className="h-4 w-4" />
              Rezervovat termín
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">O službě</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {getServiceDescription(service.id)}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-6 w-6 text-secondary" />
                <h2 className="text-2xl font-semibold">Dostupné termíny</h2>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                  <h3 className="font-semibold flex items-center gap-2 mb-3">
                    <Users className="h-5 w-5 text-accent" />
                    Tento týden
                  </h3>
                  <p className="text-sm text-muted-foreground space-y-2">
                    <span className="block">Pondělí - Pátek: 9:00 - 18:00</span>
                    <span className="block">Sobota: 10:00 - 16:00</span>
                    <span className="block">Neděle: Zavřeno</span>
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90 transition-colors" 
                  onClick={() => navigate(`/rezervace?type=${categoryId}&service=${serviceId}`)}
                >
                  Zobrazit všechny termíny
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SluzbaDetail;
