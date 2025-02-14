
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Award, Users, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

const ONas = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na hlavní stránku
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">O nás</h1>
            <p className="text-xl text-muted-foreground">
              UM Parkour je více než jen tělocvična. Jsme komunita nadšenců,
              kteří sdílejí vášeň pro pohyb a osobní rozvoj.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-4">Naše hodnoty</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Award className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Kvalita</h3>
                    <p className="text-muted-foreground">
                      Poskytujeme špičkové vybavení a profesionální vedení pro
                      maximální bezpečnost a efektivitu tréninku.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Users className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Komunita</h3>
                    <p className="text-muted-foreground">
                      Vytváříme přátelské prostředí, kde se každý může cítit
                      vítaný a motivovaný k osobnímu růstu.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Target className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Rozvoj</h3>
                    <p className="text-muted-foreground">
                      Podporujeme kontinuální zlepšování a překonávání vlastních
                      limitů v bezpečném prostředí.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-8"
            >
              <h2 className="text-3xl font-bold mb-6">Naše úspěchy</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">5+ let</p>
                    <p className="text-muted-foreground">zkušeností</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">1000+</p>
                    <p className="text-muted-foreground">spokojených klientů</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">15+</p>
                    <p className="text-muted-foreground">certifikovaných trenérů</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <Button
              size="lg"
              onClick={() => navigate("/rezervace")}
              className="bg-primary hover:bg-primary/90"
            >
              Začněte s námi trénovat
            </Button>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ONas;
