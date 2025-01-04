import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PhoneItem from "./_components/phone-item";

interface BarbershopDetaisPageProps {
    params: {
        id: string;
    }
}

const BarbershopDetaisPage = async ({ params }: BarbershopDetaisPageProps) => {
    const session = await getServerSession(authOptions)

    if (!params.id) {
        //TODO redirecionar para a home
        return null
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true
        }
    })

    if (!barbershop) {
        //TODO redirecionar para a home
        return null
    }

    return (
       <div>
         <BarbershopInfo barbershop={barbershop} />
         
         <div className="px-5 flex flex-col gap-4 py-6">
         {barbershop.services.map((service) => (
             <ServiceItem key={service.id} service={service} />
         ))}
         </div>
         <div className="px-5 flex flex-col gap-4 py-6">
         <PhoneItem >(11) 99999-9999</PhoneItem>
         <PhoneItem >(11) 99999-9999</PhoneItem>
         </div>
       </div>
    )


}

export default BarbershopDetaisPage