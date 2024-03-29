"use client";

import { EVENT_STRING, EVENT_URL, HOME_URL, RECEIPT_STRING, RECEIPT_URL } from "../resources/constants";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo-no-background.png";
import logoIcon from "../../../public/logo-icon.png";
import { usePathname } from "next/navigation";
import { UserButton, SignedIn, SignedOut, SignInButton, ClerkLoading, ClerkLoaded, SignUpButton } from "@clerk/nextjs";
import Loader from "./loader";

export default function Nav() {
    const activeClass: string =
        "flex flex-1 justify-center items-center font-mono text-lg font-thin hover:cursor-pointer hover:text-sky-600 transition-all ease-in text-sky-400";
    const defaultClass: string =
        "flex flex-1 justify-center items-center font-mono text-lg font-thin hover:cursor-pointer hover:text-sky-600 transition-all ease-in";

    const pathname = usePathname();

    return (
        <div className="flex flex-row min-w-full h-20 justify-between border-b border-opacity-50 border-b-gray-700">
            <div className="flex flex-row justify-start w-full md:w-11/12 lg:w-5/6 xl:w-2/3">
                <Link href={HOME_URL} className="flex justify-center items-center hover:cursor-pointer mr-4">
                    <div className="hidden md:flex items-center justify-start max-h-full md:w-32 lg:w-48">
                        <Image src={logo} alt="Cash Split Logo" />
                    </div>
                    <div className="flex md:hidden items-center justify-start max-h-full w-8">
                        <Image src={logoIcon} alt="Cash Split Logo" />
                    </div>
                </Link>
                <div className="flex flex-grow flex-row justify-evenly">
                    <Link href={RECEIPT_URL} className={pathname.startsWith(RECEIPT_URL) ? activeClass : defaultClass}>
                        {RECEIPT_STRING}
                    </Link>
                    <Link href={EVENT_URL} className={pathname.startsWith(EVENT_URL) ? activeClass : defaultClass}>
                        {EVENT_STRING}
                    </Link>
                </div>
            </div>
            <SignedIn>
                <UserButton
                    afterSignOutUrl="/"
                    userProfileUrl="/account"
                    userProfileMode="navigation"
                    appearance={{
                        elements: {
                            rootBox: "flex justify-center items-center ml-4",
                            userButtonTrigger:
                                "outline outline-2 outline-offset-2 outline-sky-950 focus:shadow-none focus:outline-sky-400",
                        },
                    }}
                />
            </SignedIn>
            <SignedOut>
                <ClerkLoading>
                    <Loader />
                </ClerkLoading>
                <ClerkLoaded>
                    <div className="flex space-x-4">
                        <div className="hidden sm:flex items-center">
                            <SignUpButton mode="redirect">
                                <button className="btn font-mono text-sm hover:text-sky-600 whitespace-nowrap">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </div>
                        <div className="flex items-center">
                            <SignInButton mode="redirect">
                                <button className="btn font-mono text-sm border border-sky-400 p-2 border-opacity-50 rounded whitespace-nowrap hover:border-opacity-0 hover:bg-sky-800">
                                    Sign In
                                </button>
                            </SignInButton>
                        </div>
                    </div>
                </ClerkLoaded>
            </SignedOut>
        </div>
    );
}
