import { SearchIcon } from "lucide-react";
import Header from ".././_components/header";
import { Button } from ".././_components/ui/button";
import { Input } from ".././_components/ui/input";
import Image from "next/image";
import { db } from ".././_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from ".././_constants/search";
import BookingItem from ".././_components/booking-item";


//server client/components
const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    }
  })

  return <div>
    {/**Header */}
    <Header />
    <div className="p-5">

      {/**Texto */}
      <h2 className="text-xl font-bold">Olá, Luis!</h2>
      <span>Sexta-Feira, 12 de Setembro</span>

      {/**Busca */}
      <div className="mt-6 flex items-center gap-2">
        <Input placeholder="Faça sua busca..." />
        <Button size="icon">
          <SearchIcon />
        </Button>
      </div>

      {/* Busca Rápida */}
      <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
               <Image
                 src={option.imageUrl}
                    width={16} 
                    height={16} 
                    alt={option.title}/>
                    {option.title}
        </Button>))}

        
      </div>


      {/* Imagem */}
      <div className="relative mt-6 h-[150px] w-full">
        <Image 
         alt="Agende nos melhores com FSW Barber"
         src="/banner-01.png"
         fill 
         className="rounded-xl object-cover"
         />
      </div>

      {/** Agendamento */}
      <BookingItem />

      <h2 className="mb-3 mt-6 uppercase text-gray-400 font-bold text-xs">
        RECOMENDADOS
      </h2>
      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
      {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop}/>)}
      </div>

      <h2 className="mb-3 mt-6 uppercase text-gray-400 font-bold text-xs">
        POPULARES
      </h2>
      <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
      {popularBarbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop}/>)}
      </div>
    </div>
  </div>
}

export default Home