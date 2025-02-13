
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ServiceSelection } from "@/components/reservation/ServiceSelection";
import { DateTimeSelection } from "@/components/reservation/DateTimeSelection";
import { ContactForm } from "@/components/reservation/ContactForm";
import { availableTimes, formSchema } from "@/types/reservation";
import { ArrowLeft } from "lucide-react";
import type { FormSchema } from "@/types/reservation";

const Rezervace = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialType = searchParams.get("type") || "sport";
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      notes: "",
    },
  });

  const getAvailableTimeSlots = (date: Date) => {
    const busySlots = new Set([
      "10:00",
      "14:00",
      "16:00",
    ]);

    return availableTimes.filter(time => !busySlots.has(time));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const slots = getAvailableTimeSlots(date);
      setAvailableTimeSlots(slots);
      form.setValue("date", date);
    }
  };

  const onSubmit = (values: FormSchema) => {
    console.log(values);
    toast({
      title: "Rezervace odeslána!",
      description: "Brzy vás budeme kontaktovat s potvrzením.",
    });
  };

  const [selectedCategory, setSelectedCategory] = useState(initialType);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4"
      >
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zpět na hlavní stránku
          </Button>

          <h1 className="text-4xl font-bold text-center mb-8">
            Rezervace termínu
          </h1>

          <div className="glass-card p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <ServiceSelection
                  form={form}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />

                <DateTimeSelection
                  form={form}
                  selectedDate={selectedDate}
                  availableTimeSlots={availableTimeSlots}
                  handleDateSelect={handleDateSelect}
                />

                <ContactForm form={form} />

                <Button type="submit" className="w-full">
                  Odeslat rezervaci
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Rezervace;
