
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  active: boolean;
  createdAt: Date;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: "admin" | "user";
  created_at: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    const formattedUsers: User[] = data.map((profile: Profile) => ({
      id: profile.id,
      name: profile.full_name || "Bez jména",
      email: profile.email,
      role: profile.role as "admin" | "user",
      active: true, // Nemáme zatím sloupec pro aktivaci/deaktivaci
      createdAt: new Date(profile.created_at)
    }));

    return formattedUsers;
  } catch (error) {
    console.error('Chyba při načítání uživatelů:', error);
    toast({
      title: "Chyba",
      description: "Nepodařilo se načíst seznam uživatelů.",
      variant: "destructive"
    });
    return [];
  }
};

export const updateUserRole = async (id: string, role: "admin" | "user"): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', id);

    if (error) {
      throw error;
    }

    toast({
      title: "Role aktualizována",
      description: `Role uživatele byla změněna na ${role}.`,
    });
    
    return true;
  } catch (error) {
    console.error('Chyba při aktualizaci role:', error);
    toast({
      title: "Chyba",
      description: "Nepodařilo se aktualizovat roli uživatele.",
      variant: "destructive"
    });
    return false;
  }
};

export const updateUserName = async (id: string, name: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name })
      .eq('id', id);

    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Chyba při aktualizaci jména:', error);
    toast({
      title: "Chyba",
      description: "Nepodařilo se aktualizovat jméno uživatele.",
      variant: "destructive"
    });
    return false;
  }
};

export const createNewUser = (): User => {
  return {
    id: crypto.randomUUID(),
    name: "",
    email: "",
    role: "user",
    active: true,
    createdAt: new Date(),
  };
};
