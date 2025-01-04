"use client"

import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "../../_components/ui/card";
import Image from "next/image";
import { Button } from "../../_components/ui/button";
import { Badge } from "../../_components/ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
    barbershop: Barbershop
}

const handleBookingClick = ({ barbershop }: {barbershop: Barbershop}) => {
    const router = useRouter()
    
    router.push(`/barbershops/${barbershop.id}`)
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    return ( 
        <Card className="min-w-[167px] rounded-2xl">
            <CardContent className="p-0 px-1 pt-1">
                {/**Imagem */}
                <div className="relative h-[159px] w-full">
                    <Image 
                      alt={barbershop.name} 
                      fill 
                      className="rounded-2xl object-cover" 
                      src={barbershop.imageUrl}
                    />
                    <Badge className="absolute top-2 left-2 space-x-1" variant="secondary">
                        <StarIcon size={12} className="fill-primary text-primary"/>
                        <p className="text-xs font-semibold">5,0</p>
                    </Badge>
                </div>
                {/**Texto */}
                <div className="px-1 py-3">
                    <h3 className="truncate font-semibold">{barbershop.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
                    <Button variant="secondary" className="w-full mt-3" asChild
                        onClick={() => handleBookingClick({barbershop})}>
                        <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BarbershopItem;