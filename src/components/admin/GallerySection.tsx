
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

export const GallerySection = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    // TODO: Implementace nahrávání obrázků
    toast({
      title: "Obrázek nahrán",
      description: "Obrázek byl úspěšně nahrán do galerie.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Placeholder pro obrázky */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground">Náhled {i}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="flex-1"
        />
        <Button onClick={handleUpload} disabled={!selectedFile}>
          Nahrát
        </Button>
      </div>
    </div>
  );
};
