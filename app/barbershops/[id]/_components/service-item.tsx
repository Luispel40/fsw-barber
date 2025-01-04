import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import Image from "next/image";

interface ServiceItemProps {
    service: Service
}

const ServiceItem = ({ service }: ServiceItemProps) => {
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
                            <p className="font-bold text-sm text-primary">{Intl.NumberFormat("pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL"
                                }).format(Number(service.price))}
                            </p>
                            <Button variant="secondary" size="sm">
                                Reservar
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;