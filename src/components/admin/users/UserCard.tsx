
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCog, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, updateUserRole, updateUserName } from "./userOperations";

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onUpdate: (id: string, field: keyof User, value: string | boolean) => void;
}

export const UserCard = ({ user, onDelete, onToggleStatus, onUpdate }: UserCardProps) => {
  const handleNameChange = (value: string) => {
    onUpdate(user.id, "name", value);
  };

  const handleRoleChange = (value: string) => {
    if (value === "admin" || value === "user") {
      onUpdate(user.id, "role", value);
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-4 hover:bg-accent/5 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Jméno</Label>
          <Input
            value={user.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Jméno uživatele"
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={user.email}
            onChange={(e) => onUpdate(user.id, "email", e.target.value)}
            placeholder="email@example.com"
            disabled
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Label>Role:</Label>
            <Select 
              value={user.role} 
              onValueChange={handleRoleChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Uživatel</SelectItem>
                <SelectItem value="admin">Administrátor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Label>Vytvořen:</Label>
            <span className="text-sm text-muted-foreground">
              {user.createdAt.toLocaleDateString("cs-CZ")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={user.active ? "outline" : "default"}
            onClick={() => onToggleStatus(user.id)}
          >
            <UserCog className="w-4 h-4 mr-2" />
            {user.active ? "Deaktivovat" : "Aktivovat"}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(user.id)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Smazat
          </Button>
        </div>
      </div>
    </div>
  );
};
