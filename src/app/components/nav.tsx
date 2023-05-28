"use client";

import { EVENT_STRING, EVENT_URL, HOME_STRING, HOME_URL, RECEIPT_STRING, RECEIPT_URL } from "../resources/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserIcon from "./userIcon";

export default function Nav() {
    const activeClass: string =
        "flex flex-1 justify-center font-mono text-sky-400 font-medium text-xl font-thin py-5 mr-4 md:mr-12 lg:mr-24 hover:cursor-pointer";
    const defaultClass: string =
        "flex flex-1 justify-center font-mono text-xl font-thin py-5 mr-4 md:mr-12 lg:mr-24 hover:cursor-pointer";

    const pathname = usePathname();

    return (
        <div className="flex flex-row min-w-full justify-between">
            <div className="flex flex-row">
                <Link href={HOME_URL} className={pathname == HOME_URL ? activeClass : defaultClass}>
                    {HOME_STRING}
                </Link>
                <Link href={RECEIPT_URL} className={pathname.startsWith(RECEIPT_URL) ? activeClass : defaultClass}>
                    {RECEIPT_STRING}
                </Link>
                <Link href={EVENT_URL} className={pathname.startsWith(EVENT_URL) ? activeClass : defaultClass}>
                    {EVENT_STRING}
                </Link>
            </div>
            <UserIcon />
        </div>
    );
}
