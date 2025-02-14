
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-background via-muted to-muted mt-20">
      <div className="container mx-auto px-4 py-12 bg-slate-950 hover:bg-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              UM Parkour
            </h3>
            <p className="text-muted-foreground text-slate-50">
              Profesionální parkourová tělocvična s komplexním vybavením pro
              všechny věkové kategorie.
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
                <button
                  onClick={() => navigate("/rezervace")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Rezervace
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/sluzby/sport/parkour")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Parkour kurzy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/sluzby/zabava/narozeniny")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Narozeninové oslavy
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-50">Sledujte nás</h4>
            <div className="flex gap-4 text-slate-50">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-primary/20 transition-colors"
              >
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
              <a href="#" className="hover:text-primary transition-colors">
                Ochrana osobních údajů
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Obchodní podmínky
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
