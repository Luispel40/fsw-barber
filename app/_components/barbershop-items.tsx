import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface BarbershopItemProps {
    barbershop: Barbershop
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
                    <Button variant="secondary" className="w-full mt-3">Reservar</Button>
                </div>
            </CardContent>
        </Card>
     );
}
 
export default BarbershopItem;