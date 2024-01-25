import { PrismaClient, Receipt, User } from "@prisma/client";
import { useQuery } from "react-query";
import { useUser } from "@clerk/nextjs";

interface props {
    receipt: Receipt;
}

export default function ReceiptCard({ receipt }: props) {
    return <div className="flex flex-row min-w-full">Receipt page here</div>;
}
