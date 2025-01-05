"use client"

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

interface ServiceItemProps {
    barbershop: Barbershop;
    service: Service;
    isAutenticated: boolean;
}

const ServiceItem = ({ service, barbershop, isAutenticated }: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
    }


    const handleHourClick = (time: string) => {
        setHour(time)
    }

    const handleBookingClick = () => {

        if (!isAutenticated) {
            return signIn('google')
        }

        //TODO abrir modal de agendamento
    };

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : []
    }, [date])

    console.log(timeList)

    return (
        <Card>
            <CardContent className="p-3 w-full">
                <div className="flex items-center">
                    <div className="relative 
                        min-h-[110px]
                        min-w-[110px]
                        max-h-[110px]
                        max-w-[110px]">
                        <Image
                            className="object-cover rounded-lg"
                            src={service.imageUrl}
                            alt={service.name}
                            fill
                            style={{ objectFit: "contain" }}

                        />
                    </div>
                    <div className="flex flex-col ml-3 w-full">
                        <h2 className="font-bold text-sm">{service.name}</h2>
                        <p className="text-gray-400 text-sm">{service.description}</p>

                        <div className="flex items-center justify-between mt-3">
                            <p className="font-bold text-sm text-primary">
                                {Intl.NumberFormat("pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }).format(Number(service.price))}
                            </p>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="secondary" size="sm"
                                        onClick={handleBookingClick}
                                    >
                                        Reservar
                                    </Button>
                                </SheetTrigger>

                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>Fazer reserva</SheetTitle>

                                    </SheetHeader>

                                    <div className="py-6">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            className="mt-6"
                                            fromDate={new Date()}
                                            locale={ptBR}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                },
                                                cell: {
                                                    width: "100%",
                                                },
                                                button: {
                                                    width: "100%",
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px",
                                                },
                                                caption: {
                                                    textTransform: "capitalize",
                                                }
                                            }}


                                        />
                                    </div>

                                    {date && (
                                        <div className="flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden py-6 px-5 border-t border-solid border-secondary">
                                            {timeList.map((time) => (
                                                <Button
                                                    key={time}
                                                    variant={hour === time ? "default" : "outline"}
                                                    className="rounded-full"
                                                    onClick={() => handleHourClick(time)}
                                                >
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    )}

                                    <div className="py-6 px-5 border-t border-solid border-secondary">
                                        <Card>
                                            <CardContent className="p-3 gap-3 flex flex-col">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <h3 className="font-bold text-sm">
                                                        {Intl.NumberFormat("pt-BR",
                                                            {
                                                                style: "currency",
                                                                currency: "BRL"
                                                            }).format(Number(service.price))}</h3>
                                                </div>

                                                {date && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400">Data</h3>
                                                        <h4 className="text-sm capitalize">{format(date, "dd 'de' MMMM", {
                                                            locale: ptBR
                                                        })}
                                                        </h4>
                                                    </div>
                                                )}
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400">Horário</h3>
                                                        <h4 className="text-sm capitalize">{hour}
                                                        </h4>
                                                    </div>
                                                )}

                                                <div className="flex justify-between">
                                                    <h3 className="text-gray-400">barbearia</h3>
                                                    <h4 className="text-sm capitalize">{barbershop.name}
                                                    </h4>
                                                </div>
                                            </CardContent>
                                        </Card>

                                    </div>
                                        <SheetFooter className="px-5 py-6 border-t border-solid border-secondary">
                                                <Button disabled={!hour}>Confirmar reserva</Button>
                                        </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;