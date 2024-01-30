"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";

interface props {
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    widthClass?: String;
    disabled?: boolean;
}

export function DatePicker({ date, setDate, widthClass, disabled = false }: props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(`${widthClass ? widthClass : "w-[240px]"} justify-start text-left font-normal`, !date && "text-muted-foreground")}
                    disabled={disabled}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
