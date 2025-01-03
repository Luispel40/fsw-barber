"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Barbershop } from "@prisma/client"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, ScissorsIcon, StarIcon } from "lucide-react"
import SideMenu from "@/app/_components/side-menu"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import Link from "next/link"
import ServiceItem from "@/app/_components/service-item"
import { Decimal } from "@prisma/client/runtime/library"
import PhoneItem from "@/app/_components/phone-item"

interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter()

    const handleBackClick = () => {
        router.back()
    }

    return (
        <div>
        {/**IMAGEM */}
        <div className="relative w-full h-[250px]">
            <Image
                alt={barbershop.name}
                src={barbershop?.imageUrl}
                fill
                className="object-cover"
            />

            <Button
                size="icon"
                variant="secondary"
                className="absolute left-4 top-4"
                asChild
                onClick={handleBackClick}
            >
                <Link href="/">
                    <ChevronLeftIcon />
                </Link>
            </Button>

            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon"
                        variant="outline"
                        className="absolute right-4 top-4"
                    >
                        <MenuIcon />
                    </Button>
                </SheetTrigger>
                <SidebarSheet />
            </Sheet>
        </div>

        {/**TITULO */}
        <div className="p-5 border-b border-solid">
            <h1 className="font-bold text-xl mb-3">{barbershop.name}</h1>
            <div className="mb-2 flex items-center gap-2">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
            </div>
            <div className="flex items-center gap-2">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm">{`5,0 (498 Avaliações)`}</p>
            </div>
        </div>

        {/**DESCRIÇÃO */}
        <div className="p-5 border-solid border-b space-y-3">
            <h2 className="font-bold uppercase text-gray-400">Sobre Nós</h2>
            <p className="text-sm text-justify">{barbershop?.description}</p>
        </div>

        {/**SERVIÇOS */}
        <div className="p-5 space-y-3 border-b border-solid">
            <h2 className="font-bold uppercase text-gray-400 mb-3" >Serviços</h2>
            <div className="space-y-3">
                {barbershop.services.map((service: { id: string; name: string; description: string; imageUrl: string; price: Decimal; barbershopId: string }) => (
                    <ServiceItem key={service.id}
                        service={service} />
                ))}
            </div>
        </div>

        {/**CONTATO */}
        <div className="p-5 space-y-3">
            {barbershop.phones.map(phone => (
                <PhoneItem key={phone} phone={phone} />
            ))}
        </div>
    </div>
    )
}

export default BarbershopInfo