"use client"

import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter()
    const handleBackClick = () => {
        router.replace("/")
    }

    return (
        <div>
            <div className="h-[250px] wfull relative object-cover">
                <Button size="icon" variant="outline"
                    className="absolute left-4 top-4 z-10"
                    onClick={handleBackClick}
                >
                    <ChevronLeftIcon />
                </Button>


                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline"
                            className="absolute right-4 top-4 z-10">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu />
                    </SheetContent>
                </Sheet>

                <Image
                    src={barbershop.imageUrl}
                    alt={barbershop.name}
                    fill
                    className="opacity-75"
                />
            </div>
            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold "> {barbershop.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <MapPinIcon className="text-primary " size={18} />
                    <p className="text-sm">{barbershop.address}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <StarIcon className="text-primary " size={18} />
                    <p className="text-sm">(899 avaliações)</p>
                </div>
            </div>
        </div>

    );
}

export default BarbershopInfo;