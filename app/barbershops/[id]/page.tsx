import { authOptions } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { db } from "@/app/_lib/prisma";

interface BarbershopDetaisPageProps {
    params: {
        id?: string;
    }
}

const BarbershopDetaisPage = async ({ params }: BarbershopDetaisPageProps) => {
    const session = await getServerSession(authOptions)

    if (!params.id) {
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
        return null
    }

    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />

            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} barbershop={barbershop} isAutenticated={!!session} service={service} />
                ))}
            </div>
            <div className="px-5 flex flex-col gap-4 py-6">
            </div>
        </div>
    )


}

export default BarbershopDetaisPage