
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
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
            Vítejte v <span className="text-primary">UM Parkour</span>
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
  );
};
