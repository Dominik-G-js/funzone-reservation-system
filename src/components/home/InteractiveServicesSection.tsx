
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { serviceOptions } from "@/types/reservation";
import { useState } from "react";

const services = {
  sports: {
    title: "Sportovní aktivity",
    description: "Kroužky, vedené lekce a více",
    items: serviceOptions.sport,
  },
  entertainment: {
    title: "Zábava & Events",
    description: "Volné vstupy a speciální akce",
    items: serviceOptions.zabava,
  },
  performance: {
    title: "Performance",
    description: "Shows, vystoupení a reklama",
    items: serviceOptions.performance,
  },
};

const getCategoryId = (section: string) => {
  switch (section) {
    case "sports":
      return "sport";
    case "entertainment":
      return "zabava";
    case "performance":
      return "performance";
    default:
      return "sport";
  }
};

export const InteractiveServicesSection = () => {
  const [activeSection, setActiveSection] = useState("sports");
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-4 mb-12">
          {Object.keys(services).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeSection === key
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-primary/10"
              }`}
            >
              {services[key as keyof typeof services].title}
            </button>
          ))}
        </div>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8"
        >
          <h3 className="text-3xl font-bold mb-4">
            {services[activeSection as keyof typeof services].title}
          </h3>
          <p className="text-xl text-foreground/70 mb-8">
            {services[activeSection as keyof typeof services].description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services[activeSection as keyof typeof services].items.map(
              (service) => (
                <div
                  key={service.id}
                  onClick={() =>
                    navigate(
                      `/sluzby/${getCategoryId(activeSection)}/${service.id}`
                    )
                  }
                  className="p-4 bg-white/50 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  {service.name}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
