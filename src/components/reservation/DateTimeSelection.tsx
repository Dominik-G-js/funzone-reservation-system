
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cs } from "date-fns/locale";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FormSchema } from "@/types/reservation";

type DateTimeSelectionProps = {
  form: UseFormReturn<FormSchema>;
  selectedDate: Date | undefined;
  availableTimeSlots: string[];
  handleDateSelect: (date: Date | undefined) => void;
};

export const DateTimeSelection = ({
  form,
  selectedDate,
  availableTimeSlots,
  handleDateSelect,
}: DateTimeSelectionProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Datum</FormLabel>
            <div className="border rounded-lg p-4 bg-card">
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
                    return date.getDay() !== 0;
                  },
                }}
                modifiersStyles={{
                  available: {
                    fontWeight: "bold",
                  },
                }}
                className="w-full"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4 w-full",
                  caption: "flex justify-center pt-1 relative items-center text-lg font-semibold",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                  ),
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex w-full",
                  head_cell: "text-muted-foreground rounded-md w-10 sm:w-14 font-normal text-[0.8rem] flex-1",
                  row: "flex w-full mt-2",
                  cell: "relative rounded-md flex items-center justify-center p-0 text-center h-10 sm:h-14 flex-1 hover:bg-accent hover:text-accent-foreground focus-within:relative focus-within:z-20",
                  day: cn(
                    "h-10 sm:h-14 w-10 sm:w-14 p-0 font-normal text-base",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  ),
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground font-semibold",
                  day_today: "bg-accent text-accent-foreground font-semibold",
                  day_outside: "text-muted-foreground opacity-50",
                  day_disabled: "text-muted-foreground opacity-50 line-through",
                  day_hidden: "invisible",
                }}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dostupné časy</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
              {availableTimeSlots.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={field.value === time ? "default" : "outline"}
                  onClick={() => field.onChange(time)}
                  disabled={!selectedDate}
                  className={cn(
                    "w-full",
                    field.value === time && "bg-primary text-primary-foreground"
                  )}
                >
                  {time}
                </Button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
