import { SearchIcon } from "lucide-react";
import Header from ".././_components/header";
import { Button } from ".././_components/ui/button";
import { Input } from ".././_components/ui/input";
import Image from "next/image";
import { db } from ".././_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from ".././_constants/search";
import BookingItem from ".././_components/booking-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";


//server client/components
const Home = async () => {
  const session = await getServerSession(authOptions)

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user
      ? db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: true,
          barbershop: true,
        },
      })
      : Promise.resolve([])
  ]);



  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    }
  })

  return (
    <div>

      <Header />

      <div className="p-5 pt-5">
        {session?.user
          ? `Olá, ${session.user.name?.split(" ")[0]}!`
          : "Olá! Vamos agendar ainda hoje?"}
        <p className="capitalize text-sm text-gray-400">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button size="icon">
            <SearchIcon />
          </Button>
        </div>

        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title} />
              {option.title}
            </Button>))}


        </div>


        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div className="mt-6">


          {confirmedBookings.length > 0 && (
            <>
              <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
              <div className="pl-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
              </div>
            </>
          )}
        </div>

        <h2 className="mb-3 mt-6 uppercase text-gray-400 font-bold text-xs">
          RECOMENDADOS
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>

        <h2 className="mb-3 mt-6 uppercase text-gray-400 font-bold text-xs">
          POPULARES
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(barbershop => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>
      </div>
    </div>
  )

}

export default Home