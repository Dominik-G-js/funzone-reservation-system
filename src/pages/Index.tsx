import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Users, Star, Calendar, Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { serviceOptions } from "@/types/reservation";

const Index = () => {
  const [activeSection, setActiveSection] = useState("sports");
  const navigate = useNavigate();

  const services = {
    sports: {
      title: "Sportovní aktivity",
      description: "Kroužky, vedené lekce a více",
      items: serviceOptions.sport
    },
    entertainment: {
      title: "Zábava & Events",
      description: "Volné vstupy a speciální akce",
      items: serviceOptions.zabava
    },
    performance: {
      title: "Performance",
      description: "Shows, vystoupení a reklama",
      items: serviceOptions.performance
    }
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

  return <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Vítejte v{" "}
                <span className="text-primary">UM Parkour</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground/80">
                Sport • Zábava • Performance
              </p>
              <motion.button whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }} onClick={() => navigate("/rezervace")} className="px-8 py-4 bg-primary text-white rounded-full font-medium
                  text-lg shadow-lg hover:bg-primary-hover transition-all duration-300
                  flex items-center justify-center gap-2 mx-auto">
                <Calendar className="w-5 h-5" />
                Rezervovat termín
              </motion.button>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5
            }} className="glass-card p-8 cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigate("/rezervace?type=sport")}>
                <Activity className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Sport</h3>
                <p className="text-foreground/70">
                  Profesionální vedení, bezpečné prostředí a progresivní výuka.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }} className="glass-card p-8 cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigate("/rezervace?type=zabava")}>
                <Users className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Zábava</h3>
                <p className="text-foreground/70">
                  Volné vstupy, events a speciální akce pro všechny věkové kategorie.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.4
            }} className="glass-card p-8 cursor-pointer hover:shadow-xl transition-all duration-300" onClick={() => navigate("/rezervace?type=performance")}>
                <Star className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4">Performance</h3>
                <p className="text-foreground/70">
                  Profesionální vystoupení, shows a reklamní spolupráce.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-4 mb-12">
              {Object.keys(services).map(key => <button key={key} onClick={() => setActiveSection(key)} className={`px-6 py-2 rounded-full transition-all ${activeSection === key ? "bg-primary text-white" : "bg-muted hover:bg-primary/10"}`}>
                  {services[key as keyof typeof services].title}
                </button>)}
            </div>

            <motion.div key={activeSection} initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.3
          }} className="glass-card p-8">
              <h3 className="text-3xl font-bold mb-4">
                {services[activeSection as keyof typeof services].title}
              </h3>
              <p className="text-xl text-foreground/70 mb-8">
                {services[activeSection as keyof typeof services].description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {services[activeSection as keyof typeof services].items.map(service => <div key={service.id} onClick={() => navigate(`/sluzby/${getCategoryId(activeSection)}/${service.id}`)} className="p-4 bg-white/50 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                    {service.name}
                  </div>)}
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <footer className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-background via-muted to-muted mt-20">
        <div className="container mx-auto px-4 py-12 bg-slate-950 hover:bg-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                UM Parkour
              </h3>
              <p className="text-muted-foreground text-slate-50">
                Profesionální parkourová tělocvična s komplexním vybavením pro všechny věkové kategorie.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-50">Kontakt</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2 text-slate-50">
                  <Phone className="h-4 w-4" />
                  +420 777 888 999
                </li>
                <li className="flex items-center gap-2 text-slate-50">
                  <Mail className="h-4 w-4" />
                  info@umparkour.cz
                </li>
                <li className="flex items-center gap-2 text-slate-50">
                  <MapPin className="h-4 w-4" />
                  Sportovní 123, Praha
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-50">Rychlé odkazy</h4>
              <ul className="space-y-2 text-slate-50">
                <li>
                  <button onClick={() => navigate('/rezervace')} className="text-muted-foreground hover:text-primary transition-colors">
                    Rezervace
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/sluzby/sport/parkour')} className="text-muted-foreground hover:text-primary transition-colors">
                    Parkour kurzy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/sluzby/zabava/narozeniny')} className="text-muted-foreground hover:text-primary transition-colors">
                    Narozeninové oslavy
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-50">Sledujte nás</h4>
              <div className="flex gap-4 text-slate-50">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-slate-50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} UM Parkour. Všechna práva vyhrazena.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">Ochrana osobních údajů</a>
                <a href="#" className="hover:text-primary transition-colors">Obchodní podmínky</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};

export default Index;
