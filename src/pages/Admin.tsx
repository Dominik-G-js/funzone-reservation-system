
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Users, Calendar, FileText, Image, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("obsah");

  const sections = [
    { id: "obsah", name: "Správa obsahu", icon: FileText },
    { id: "galerie", name: "Galerie", icon: Image },
    { id: "sluzby", name: "Služby", icon: Settings },
    { id: "cenik", name: "Ceník", icon: Receipt },
    { id: "rezervace", name: "Rezervace", icon: Calendar },
    { id: "uzivatele", name: "Uživatelé", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/bfbea331-45d9-48db-81a7-4a5c89636fae.png" 
                alt="UM PARK Logo" 
                className="h-8"
              />
              <span className="text-lg font-semibold">Administrace</span>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              Zpět na web
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      selectedSection === section.id
                        ? "bg-primary text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-5 p-6 bg-card rounded-lg shadow"
          >
            <h1 className="text-2xl font-bold mb-6">
              {sections.find((s) => s.id === selectedSection)?.name}
            </h1>
            
            {/* Placeholder pro budoucí implementaci jednotlivých sekcí */}
            <p className="text-muted-foreground">
              Sekce {sections.find((s) => s.id === selectedSection)?.name.toLowerCase()} je připravena k implementaci.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
