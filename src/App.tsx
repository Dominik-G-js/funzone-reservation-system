
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Rezervace from "./pages/Rezervace";
import SluzbaDetail from "./pages/SluzbaDetail";
import SluzbyKategorie from "./pages/SluzbyKategorie";
import NotFound from "./pages/NotFound";
import Cenik from "./pages/Cenik";
import ONas from "./pages/ONas";
import Kontakt from "./pages/Kontakt";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rezervace" element={<Rezervace />} />
          <Route path="/sluzby/:categoryId" element={<SluzbyKategorie />} />
          <Route path="/sluzby/:categoryId/:serviceId" element={<SluzbaDetail />} />
          <Route path="/cenik" element={<Cenik />} />
          <Route path="/o-nas" element={<ONas />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
