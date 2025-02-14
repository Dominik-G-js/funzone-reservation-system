
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">UM</span>
            </div>
            <span className="text-xl font-bold">Parkour</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <button onClick={() => navigate("/")} className="nav-link">
              Domů
            </button>
            <button onClick={() => navigate("/sluzby/sport")} className="nav-link">
              Služby
            </button>
            <button onClick={() => navigate("/cenik")} className="nav-link">
              Ceník
            </button>
            <button onClick={() => navigate("/o-nas")} className="nav-link">
              O nás
            </button>
            <button onClick={() => navigate("/kontakt")} className="nav-link">
              Kontakt
            </button>
            <button
              onClick={() => navigate("/rezervace")}
              className="button-primary"
            >
              Rezervovat
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
              className="nav-link text-left"
            >
              Domů
            </button>
            <button
              onClick={() => {
                navigate("/sluzby/sport");
                setIsMobileMenuOpen(false);
              }}
              className="nav-link text-left"
            >
              Služby
            </button>
            <button
              onClick={() => {
                navigate("/cenik");
                setIsMobileMenuOpen(false);
              }}
              className="nav-link text-left"
            >
              Ceník
            </button>
            <button
              onClick={() => {
                navigate("/o-nas");
                setIsMobileMenuOpen(false);
              }}
              className="nav-link text-left"
            >
              O nás
            </button>
            <button
              onClick={() => {
                navigate("/kontakt");
                setIsMobileMenuOpen(false);
              }}
              className="nav-link text-left"
            >
              Kontakt
            </button>
            <button
              onClick={() => {
                navigate("/rezervace");
                setIsMobileMenuOpen(false);
              }}
              className="button-primary w-full"
            >
              Rezervovat
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
