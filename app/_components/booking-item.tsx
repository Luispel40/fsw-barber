"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      barbershop: true;
      service: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const isBookingConfirmed = isFuture(booking.date)

  const handleCancelClick = async () => {
    setIsDeleteLoading(true)
    try {
      await cancelBooking(booking.id);

      toast.success("Agendamento cancelado com sucesso!")
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="py-0 flex px-0">
            <div className="flex flex-col gap-2 py-5 flex-[3] px-5 pl-5">
              <Badge className="w-fit"
                variant={isBookingConfirmed ? "default" : "secondary"}>
                {isBookingConfirmed ? "Confirmado" : "Finalizado"} </Badge>
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
                {format(booking.date, "MMMM", {
                  locale: ptBR
                })}</p>
              <p className="text-2xl">{format(booking.date, "dd")}</p>
              <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="px-5 text-left pb-6 border-b border-solid border-secondary">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image
              src="/map.png"
              alt="Mapa"
              fill
              style={{
                objectFit: "contain"

              }}/>
            <div className="w-full absolute bottom-4 left-0">
              <Card className="mx-5">
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs overflow-hidden text-nowrap text-ellipsis">{booking.barbershop.address}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Badge className="w-fit mt-3 my-3"
            variant={isBookingConfirmed ? "default" : "secondary"}>
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card>
            <CardContent className="p-3 gap-3 flex flex-col">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {Intl.NumberFormat("pt-BR",
                    {
                      style: "currency",
                      currency: "BRL"
                    }).format(Number(booking.service.price))}</h3>
              </div>


              <div className="flex justify-between">
                <h3 className="text-gray-400">Data</h3>
                <h4 className="text-sm capitalize">{format(booking.date, "dd 'de' MMMM", {
                  locale: ptBR
                })}
                </h4>
              </div>


              <div className="flex justify-between">
                <h3 className="text-gray-400">Horário</h3>
                <h4 className="text-sm capitalize">{format(booking.date, "HH:mm",)}
                </h4>
              </div>


              <div className="flex justify-between">
                <h3 className="text-gray-400">barbearia</h3>
                <h4 className="text-sm capitalize">{booking.barbershop.name}
                </h4>
              </div>
            </CardContent>
          </Card>
          <SheetFooter className="flex-row w-full gap-3 mt-3">
            <SheetClose asChild>
              <Button className="w-full" variant={"secondary"}>Voltar</Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  
                  disabled={!isBookingConfirmed || isDeleteLoading}
                  className="w-full" variant={"destructive"}
                >
                  
                  Cancelar reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Deseja mesmo cancelar sua reserva?</AlertDialogTitle>
                  <AlertDialogDescription>
                   Uma vez cancelada, não poderá ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row gap-3">
                  <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>
                  <AlertDialogAction disabled={isDeleteLoading} className="w-full" onClick={handleCancelClick}>
                  {isDeleteLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}Confirmar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default BookingItem;