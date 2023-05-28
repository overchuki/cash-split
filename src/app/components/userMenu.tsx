import Link from "next/link";

interface props {
    isOpen: boolean;
}

export default function UserMenu({ isOpen }: props) {
    return (
        <div className="relative">
            <div
                className={
                    isOpen ? "absolute top-1 -right-5 bg-gray-900 py-3 border-2 border-sky-950 rounded-xl" : "hidden"
                }
            >
                <div className="flex flex-col">
                    <Link href="#" className="flex py-1 px-6 justify-center hover:cursor-pointer hover:bg-gray-800">
                        Account
                    </Link>
                    <Link
                        href="#"
                        className="flex py-1 mb-0.5 px-6 justify-center hover:cursor-pointer hover:bg-gray-800"
                    >
                        Settings
                    </Link>
                    <Link
                        href="#"
                        className="flex py-1 mt-0.5 px-6 justify-center border-t border-opacity-50 border-gray-500 hover:cursor-pointer hover:bg-gray-800"
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
