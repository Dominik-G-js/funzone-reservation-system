
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { serviceOptions } from "@/types/reservation";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

const SluzbyKategorie = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = Object.entries(serviceOptions).find(([id]) => id === categoryId);
  const services = category?.[1] || [];

  const getCategoryTitle = (id: string) => {
    switch (id) {
      case "sport":
        return "Sportovní aktivity";
      case "zabava":
        return "Zábava & Events";
      case "performance":
        return "Performance";
      default:
        return "Služby";
    }
  };

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
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-4">{getCategoryTitle(categoryId || '')}</h1>
            <p className="text-xl text-muted-foreground">
              Vyberte si z naší nabídky služeb
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/sluzby/${categoryId}/${service.id}`)}
              >
                <h3 className="text-2xl font-semibold mb-4">{service.name}</h3>
                <Button className="w-full">
                  Zobrazit detail
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SluzbyKategorie;
