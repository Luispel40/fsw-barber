import { db } from "@/app/_lib/prisma";

interface BarbershopDetaisPageProps {
    params: {
        id: string;
    }
}

const BarbershopDetaisPage = async ({ params }: BarbershopDetaisPageProps) => {
    if (!params.id) {
        //TODO redirecionar para a home
        return null
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
    })

    if (!barbershop) {
        //TODO redirecionar para a home
        return null
    }

    return <h1>{barbershop.name}</h1>
        
    
}

export default BarbershopDetaisPage