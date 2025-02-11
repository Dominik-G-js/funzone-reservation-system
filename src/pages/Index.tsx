
import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Star, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeSection, setActiveSection] = useState("sports");
  const navigate = useNavigate();

  const services = {
    sports: {
      title: "Sportovní aktivity",
      description: "Kroužky, vedené lekce a více",
      items: ["Parkour", "Trampolíny", "Akrobacie", "Gymnastika"],
    },
    entertainment: {
      title: "Zábava & Events",
      description: "Volné vstupy a speciální akce",
      items: ["Volné vstupy", "Narozeninové oslavy", "Teambuilding", "Speciální akce"],
    },
    performance: {
      title: "Performance",
      description: "Shows, vystoupení a reklama",
      items: ["Vystoupení", "Shows", "Reklama", "Spolupráce"],
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Vítejte v{" "}
              <span className="text-primary">UM Parkour</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80">
              Sport • Zábava • Performance
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/rezervace")}
              className="px-8 py-4 bg-primary text-white rounded-full font-medium
                text-lg shadow-lg hover:bg-primary-hover transition-all duration-300
                flex items-center justify-center gap-2 mx-auto"
            >
              <Calendar className="w-5 h-5" />
              Rezervovat termín
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/rezervace?type=sport")}
            >
              <Activity className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Sport</h3>
              <p className="text-foreground/70">
                Profesionální vedení, bezpečné prostředí a progresivní výuka.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-8 cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/rezervace?type=zabava")}
            >
              <Users className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Zábava</h3>
              <p className="text-foreground/70">
                Volné vstupy, events a speciální akce pro všechny věkové kategorie.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-8 cursor-pointer hover:shadow-xl transition-all duration-300"
              onClick={() => navigate("/rezervace?type=performance")}
            >
              <Star className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Performance</h3>
              <p className="text-foreground/70">
                Profesionální vystoupení, shows a reklamní spolupráce.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Services Section */}
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
              {services[activeSection as keyof typeof services].items.map((item) => (
                <div
                  key={item}
                  className="p-4 bg-white/50 rounded-lg hover:bg-primary/10 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

