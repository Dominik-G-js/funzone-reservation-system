
import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Users, Calendar, FileText, Image, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentSection } from "@/components/admin/ContentSection";
import { GallerySection } from "@/components/admin/GallerySection";

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

  const renderContent = () => {
    switch (selectedSection) {
      case "obsah":
        return <ContentSection />;
      case "galerie":
        return <GallerySection />;
      default:
        return (
          <p className="text-muted-foreground">
            Sekce {sections.find((s) => s.id === selectedSection)?.name.toLowerCase()} je připravena k implementaci.
          </p>
        );
    }
  };

  return (
    <main className="min-h-screen bg-background p-4">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/bfbea331-45d9-48db-81a7-4a5c89636fae.png" 
                alt="UM PARK Logo" 
                className="h-8"
              />
              <h1 className="text-lg font-semibold">Administrace</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Zpět na web
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto pt-20">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Sidebar */}
          <nav className="md:col-span-1 space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    selectedSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent/10"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Content Area */}
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-5 p-6 bg-card rounded-lg border shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-6">
              {sections.find((s) => s.id === selectedSection)?.name}
            </h2>
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Admin;
