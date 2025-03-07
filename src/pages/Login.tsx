
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Registrace nového uživatele
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          toast({
            title: "Registrace úspěšná",
            description: "Váš účet byl vytvořen. Můžete se přihlásit.",
          });
          setIsSignUp(false);
        }
      } else {
        // Přihlášení existujícího uživatele
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        // Kontrola, zda je uživatel admin
        if (data.user) {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .single();

          if (profileError) {
            throw profileError;
          }

          if (profileData.role === 'admin') {
            toast({
              title: "Přihlášení úspěšné",
              description: "Byli jste úspěšně přihlášeni jako administrátor.",
            });
            navigate("/admin");
          } else {
            toast({
              title: "Přístup zamítnut",
              description: "Nemáte oprávnění pro přístup do administrace.",
              variant: "destructive"
            });
            // Odhlásíme uživatele
            await supabase.auth.signOut();
          }
        }
      }
    } catch (error: any) {
      console.error('Chyba při přihlášení/registraci:', error);
      
      // Zpracování běžných chyb
      let errorMessage = "Nastala neočekávaná chyba.";
      
      if (error.message.includes("Email not confirmed")) {
        errorMessage = "Emailová adresa nebyla potvrzena.";
      } else if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Nesprávné přihlašovací údaje.";
      } else if (error.message.includes("Email already registered")) {
        errorMessage = "Tento email je již zaregistrován.";
      } else if (error.message.includes("Password should be at least")) {
        errorMessage = "Heslo musí mít alespoň 6 znaků.";
      }
      
      toast({
        title: "Chyba",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <img 
            src="/lovable-uploads/bfbea331-45d9-48db-81a7-4a5c89636fae.png" 
            alt="UM PARK Logo" 
            className="h-10 mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold">
            {isSignUp ? "Registrace" : "Přihlášení"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp 
              ? "Vytvořte si nový účet pro přístup do administrace" 
              : "Přihlaste se do administrace UM PARK"}
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="vas@email.cz" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isSignUp ? "Registrace..." : "Přihlašování..."}
                </>
              ) : (
                isSignUp ? "Zaregistrovat se" : "Přihlásit se"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button 
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp 
                ? "Již máte účet? Přihlaste se" 
                : "Nemáte účet? Zaregistrujte se"}
            </button>
          </div>
        </div>

        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
          >
            Zpět na hlavní stránku
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
