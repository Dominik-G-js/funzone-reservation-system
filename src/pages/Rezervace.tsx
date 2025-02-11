
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  service: z.string({
    required_error: "Prosím vyberte službu",
  }),
  date: z.date({
    required_error: "Prosím vyberte datum",
  }),
  time: z.string({
    required_error: "Prosím vyberte čas",
  }),
  name: z.string().min(2, {
    message: "Jméno musí obsahovat alespoň 2 znaky",
  }),
  email: z.string().email({
    message: "Prosím zadejte platný email",
  }),
  phone: z.string().min(9, {
    message: "Prosím zadejte platné telefonní číslo",
  }),
  notes: z.string().optional(),
});

const availableTimes = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
];

const serviceOptions = {
  sport: [
    { id: "parkour", name: "Parkour" },
    { id: "trampoliny", name: "Trampolíny" },
    { id: "akrobacie", name: "Akrobacie" },
    { id: "gymnastika", name: "Gymnastika" },
  ],
  zabava: [
    { id: "volny-vstup", name: "Volný vstup" },
    { id: "narozeniny", name: "Narozeninová oslava" },
    { id: "teambuilding", name: "Teambuilding" },
    { id: "special", name: "Speciální akce" },
  ],
  performance: [
    { id: "vystoupeni", name: "Vystoupení" },
    { id: "shows", name: "Shows" },
    { id: "reklama", name: "Reklama" },
    { id: "spoluprace", name: "Spolupráce" },
  ],
};

const Rezervace = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "sport";
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      notes: "",
    },
  });

  // Simulace dostupnosti termínů - v reálné aplikaci by toto bylo načítáno z backendu
  const getAvailableTimeSlots = (date: Date) => {
    // Pro demo účely - některé časy budou "obsazené"
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
          <h1 className="text-4xl font-bold text-center mb-8">
            Rezervace termínu
          </h1>

          <div className="glass-card p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Kategorie služeb */}
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

                {/* Výběr konkrétní služby */}
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

                {/* Datum a dostupné termíny */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Datum */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Datum</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: cs })
                                ) : (
                                  <span>Vyberte datum</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={handleDateSelect}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              modifiers={{
                                available: (date) => {
                                  // Pro demo účely - některé dny budou mít volné termíny
                                  return date.getDay() !== 0; // Neděle nemá volné termíny
                                },
                              }}
                              modifiersStyles={{
                                available: {
                                  fontWeight: "bold",
                                  textDecoration: "underline",
                                },
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Čas s indikací dostupnosti */}
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dostupné časy</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={!selectedDate}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={selectedDate ? "Vyberte čas" : "Nejdřív vyberte datum"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTimeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Kontaktní údaje */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jméno a příjmení</FormLabel>
                        <FormControl>
                          <Input placeholder="Jan Novák" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="jan@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon</FormLabel>
                        <FormControl>
                          <Input placeholder="+420 123 456 789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Poznámka */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poznámka</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Další informace k rezervaci..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
