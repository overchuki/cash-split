import { useUser } from "@clerk/nextjs";
import { PrismaClient, Receipt } from "@prisma/client";
import { useQuery } from "react-query";

export default function Receipt() {
    // const { isSignedIn, user, isLoaded } = useUser();
    // const { data } = useQuery<Receipt[]>("receipts", async () => {
    //     const prisma = new PrismaClient();
    //     const userObj = await prisma.user.findFirst({
    //         where: {
    //             clerk_id: user?.id,
    //         },
    //     });
    //     return await prisma.receipt.findMany({
    //         where: {},
    //     });
    // });

    return <div className="flex flex-row min-w-full">rece</div>;
}
