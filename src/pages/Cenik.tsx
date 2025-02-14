
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

const Cenik = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Jednorázový vstup",
      price: "200 Kč",
      features: [
        "Vstup na 2 hodiny",
        "Základní vybavení",
        "Společný prostor",
        "Bez rezervace"
      ]
    },
    {
      name: "Měsíční členství",
      price: "1200 Kč",
      popular: true,
      features: [
        "Neomezený vstup",
        "Veškeré vybavení",
        "Rezervace lekcí",
        "Členské slevy",
        "Osobní skříňka"
      ]
    },
    {
      name: "10 vstupů",
      price: "1600 Kč",
      features: [
        "10× vstup na 2 hodiny",
        "Platnost 3 měsíce",
        "Veškeré vybavení",
        "Možnost rezervace"
      ]
    }
  ];

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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-4"
          >
            Ceník služeb
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-center mb-12"
          >
            Vyberte si plán, který vám nejlépe vyhovuje
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`glass-card p-8 relative ${
                  plan.popular ? "border-2 border-primary" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm">
                    Nejoblíbenější
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-8"
                  onClick={() => navigate("/rezervace")}
                >
                  Vybrat plán
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

export default Cenik;
