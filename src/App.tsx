
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import SluzbyKategorie from "@/pages/SluzbyKategorie";
import SluzbaDetail from "@/pages/SluzbaDetail";
import Cenik from "@/pages/Cenik";
import ONas from "@/pages/ONas";
import Kontakt from "@/pages/Kontakt";
import Rezervace from "@/pages/Rezervace";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sluzby/:categoryId" element={<SluzbyKategorie />} />
        <Route path="/sluzby/:categoryId/:serviceId" element={<SluzbaDetail />} />
        <Route path="/cenik" element={<Cenik />} />
        <Route path="/o-nas" element={<ONas />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/rezervace" element={<Rezervace />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
