"use client";

import { DatePicker } from "@/app/components/datepicker";
import { Input } from "@/app/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { PrismaClient, Receipt } from "@prisma/client";
import { useState } from "react";

export default function Receipt() {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());

    return (
        <div className="flex flex-col min-w-full py-8 flex-grow items-center">
            <div className="flex mt-12 text-4xl font-extrabold">Create a Receipt</div>
            <div className="flex w-[240px] mt-8">
                <Input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    disabled={submitting}
                />
            </div>
            <div className="flex w-[240px] mt-8">
                <DatePicker date={date} setDate={setDate} disabled={submitting} />
            </div>
            <div>users</div>
            <div className="flex h-24"></div>
        </div>
    );
}
