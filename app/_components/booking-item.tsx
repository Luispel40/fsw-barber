import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AvatarFallback } from "@radix-ui/react-avatar";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      barbershop: true;
      service: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = isPast(booking.date)

  return (
    <>
      <Card >
        <CardContent className="py-0 flex px-0">
          <div className="flex flex-col gap-2 py-5 flex-[3] px-5 pl-5">
            <Badge className="w-fit"
            variant={isBookingConfirmed? "secondary" : "default"}> 
              {isBookingConfirmed? "Finalizado" : "Confirmado"} </Badge>
            <h3 className="font-semibold">{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.barbershop.imageUrl} />

                <AvatarFallback>A</AvatarFallback>
              </Avatar>

              <p className="text-sm">{booking.barbershop.name}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center px-5 border-l-2 flex-1 border-solid ">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM",{
                locale: ptBR
            })}</p>
            <p className="text-2xl">{format(booking.date, "dd")}</p>
            <p className="text-sm">{format(booking.date, "hh:mm")}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default BookingItem;