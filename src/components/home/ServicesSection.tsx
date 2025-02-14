
import { motion } from "framer-motion";
import { Activity, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ServicesSection = () => {
  const navigate = useNavigate();

  return (
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
  );
};
