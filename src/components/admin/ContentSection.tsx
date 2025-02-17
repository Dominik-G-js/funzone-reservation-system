
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const ContentSection = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implementace ukládání obsahu
    toast({
      title: "Obsah uložen",
      description: "Změny byly úspěšně uloženy.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Input
          placeholder="Název stránky"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Textarea
          placeholder="Obsah stránky"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px]"
        />
      </div>
      <Button type="submit">Uložit změny</Button>
    </form>
  );
};
