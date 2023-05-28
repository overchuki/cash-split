import Footer from "./components/footer";
import Nav from "./components/nav";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Money Split",
    description: "Split money between friends on shared events/receipts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex min-h-screen flex-col items-center justify-between px-4 md:px-24 lg:px-48 xl:px-64 2xl:px-96 py-1">
                    <div className="flex flex-col items-center justify-start min-w-full">
                        <Nav />
                        {children}
                    </div>
                    <Footer />
                </main>
            </body>
        </html>
    );
}
