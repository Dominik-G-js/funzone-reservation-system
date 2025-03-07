
import { UserCard } from "./UserCard";
import { User } from "./userOperations";

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onUpdate: (id: string, field: keyof User, value: string | boolean) => void;
}

export const UserList = ({ users, onDelete, onToggleStatus, onUpdate }: UserListProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center p-6 border rounded-lg">
        <p className="text-muted-foreground">Žádní uživatelé nenalezeni</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
