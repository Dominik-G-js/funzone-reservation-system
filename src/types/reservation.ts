
import { z } from "zod";

export const formSchema = z.object({
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

export type FormSchema = z.infer<typeof formSchema>;

export const serviceOptions = {
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
} as const;

export const availableTimes = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00", "18:00"
] as const;
