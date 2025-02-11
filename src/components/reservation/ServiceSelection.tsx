
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FormSchema, serviceOptions } from "@/types/reservation";

type ServiceSelectionProps = {
  form: UseFormReturn<FormSchema>;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

export const ServiceSelection = ({
  form,
  selectedCategory,
  setSelectedCategory,
}: ServiceSelectionProps) => {
  return (
    <>
      <div className="flex gap-4 mb-6">
        {Object.keys(serviceOptions).map((category) => (
          <Button
            key={category}
            type="button"
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="flex-1"
          >
            {category === "sport" && "Sport"}
            {category === "zabava" && "Zábava"}
            {category === "performance" && "Performance"}
          </Button>
        ))}
      </div>

      <FormField
        control={form.control}
        name="service"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Služba</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte službu" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {serviceOptions[selectedCategory as keyof typeof serviceOptions].map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
