
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  service: string;
  status: "pending" | "confirmed" | "cancelled";
}

export const ReservationsSection = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      customerName: "Jan Novák",
      email: "jan@email.cz",
      phone: "+420 777 888 999",
      date: new Date(),
      time: "14:00",
      service: "Parkour trénink",
      status: "pending",
    },
  ]);

  const handleStatusChange = (id: string, status: Reservation["status"]) => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );

    const statusText = {
      confirmed: "potvrzena",
      cancelled: "zamítnuta",
      pending: "čeká na vyřízení",
    }[status];

    toast({
      title: "Status změněn",
      description: `Rezervace byla ${statusText}.`,
    });
  };

  const getStatusColor = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return "text-green-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  const getStatusText = (status: Reservation["status"]) => {
    switch (status) {
      case "confirmed":
        return "Potvrzeno";
      case "cancelled":
        return "Zamítnuto";
      default:
        return "Čeká na vyřízení";
    }
  };

  const handleDeleteReservation = (id: string) => {
    setReservations(prev => prev.filter(reservation => reservation.id !== id));
    toast({
      title: "Rezervace smazána",
      description: "Rezervace byla úspěšně odstraněna ze systému.",
    });
  };

  return (
    <Tabs defaultValue="list">
      <TabsList className="mb-4">
        <TabsTrigger value="list">Seznam rezervací</TabsTrigger>
        <TabsTrigger value="calendar">Kalendář</TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="space-y-6">
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="p-4 border rounded-lg space-y-4 hover:bg-accent/5 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{reservation.customerName}</h4>
                  <p className="text-sm text-muted-foreground">{reservation.service}</p>
                </div>
                <span className={`text-sm font-medium ${getStatusColor(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Kontakt:</p>
                  <p>{reservation.email}</p>
                  <p>{reservation.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Termín:</p>
                  <p>
                    {reservation.date.toLocaleDateString("cs-CZ")} v {reservation.time}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                {reservation.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(reservation.id, "confirmed")}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Potvrdit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleStatusChange(reservation.id, "cancelled")}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Zamítnout
                    </Button>
                  </>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteReservation(reservation.id)}
                >
                  Smazat
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="calendar" className="space-y-6">
        <div className="p-4 border rounded-lg">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Rezervace pro vybraný den:</h3>
          {reservations
            .filter(
              (res) =>
                res.date.toDateString() === (date?.toDateString() ?? new Date().toDateString())
            )
            .map((reservation) => (
              <div
                key={reservation.id}
                className="p-3 border rounded-lg flex items-center justify-between hover:bg-accent/5"
              >
                <div>
                  <p className="font-medium">{reservation.time} - {reservation.customerName}</p>
                  <p className="text-sm text-muted-foreground">{reservation.service}</p>
                </div>
                <span className={`text-sm font-medium ${getStatusColor(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
              </div>
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};
