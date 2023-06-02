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
                // elements: {
                //     modalBackdrop: "border-w",
                //     card: "",
                // },
                // variables: {
                //     colorPrimary: "#082f49",
                //     // colorPrimary: "#F87338",
                //     colorText: "white",
                //     colorBackground: "#0f172a",
                //     colorInputBackground: "#0f172a",
                // },
                // #e48893
                // 8A6B87
                // BC3A6C
                // D53C6B
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
