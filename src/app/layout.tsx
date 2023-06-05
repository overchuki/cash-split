import Footer from "./components/footer";
import Nav from "./components/nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Money Split",
    description: "Split money between friends on shared events/receipts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider
            appearance={{
                baseTheme: dark,
                elements: {
                    card: "bg-black border-2 rounded-4 border-sky-950",
                    footerActionLink: "text-sky-400 hover:text-sky-400",
                    formButtonPrimary: "bg-rose-800 hover:bg-rose-900",
                    userButtonPopoverCard: "bg-zinc-950",
                },
                variables: {
                    colorPrimary: "#082f49",
                },
            }}
        >
            <html lang="en">
                <body className={inter.className}>
                    <main className="flex min-h-screen flex-col items-center justify-between px-4 md:px-24 lg:px-48 xl:px-64 2xl:px-96 py-1">
                        <div className="flex flex-col flex-grow items-center justify-start min-w-full">
                            <Nav />
                            {children}
                            <Analytics />
                        </div>
                        <Footer />
                    </main>
                </body>
            </html>
        </ClerkProvider>
    );
}
