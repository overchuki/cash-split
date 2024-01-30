"use client";

import DropdownInput from "@/app/components/shad/dropdownInput";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { useState } from "react";

export default function ReceiptPage({ params }: { params: { id: string } }) {
    const [open, setopen] = useState(false);
    return (
        <div className="flex flex-col min-w-full py-8">
            ID: {params.id}
            <Input type="email" placeholder="Email" />
            <DropdownMenu
                open={open}
                onOpenChange={(isOpen) => {
                    setopen(isOpen);
                    console.log(isOpen);
                }}
            >
                <DropdownMenuTrigger>
                    <DropdownInput open={open}>Some string</DropdownInput>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
