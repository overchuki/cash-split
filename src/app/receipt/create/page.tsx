"use client";

import { DatePicker } from "@/app/components/shad/datepicker";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { UserSelect } from "@/app/components/userselect";
import { BasicReceiptUser } from "@/app/types/general";
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { PrismaClient, Receipt } from "@prisma/client";
import { useState } from "react";

export default function Receipt() {
    const { isSignedIn, user } = useUser();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [receiptUsers, setReceiptUsers] = useState<BasicReceiptUser[]>([]);

    return (
        <>
            <SignedIn>
                <div className="flex flex-col w-[240px] lg:w-[360px] py-8 flex-grow items-center">
                    <div className="flex mt-12 text-2xl lg:text-4xl font-extrabold">Create a Receipt</div>
                    <div className="flex w-full mt-5 lg:mt-8">
                        <Input
                            type="text"
                            placeholder="Name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            disabled={submitting}
                        />
                    </div>
                    <div className="flex w-full mt-5 lg:mt-8">
                        <DatePicker date={date} setDate={setDate} widthClass={"w-full"} disabled={submitting} />
                    </div>
                    <div className="flex w-full mt-5 lg:mt-8">
                        <UserSelect
                            disabled={submitting}
                            userSelected={(name, clerk_id) => {
                                console.log("selected");
                            }}
                        ></UserSelect>
                    </div>
                    <div className="flex w-full">
                        <Button
                            className="w-full mt-5 lg:mt-8"
                            size={"lg"}
                            onClick={() => {
                                console.log("Create Receipt");
                            }}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <div className="m-auto text-lg font-bold text-center">You must be signed in to create a receipt.</div>
            </SignedOut>
        </>
    );
}
