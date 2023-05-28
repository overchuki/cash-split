import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface props {
    popupClassName: string;
    menuIsOpen: boolean;
    setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UserMenu({ popupClassName, menuIsOpen, setMenuIsOpen }: props) {
    window.addEventListener("click", (e) => {
        const target = e.target as HTMLDivElement | HTMLLinkElement;
        if (!target.classList.contains(popupClassName) && menuIsOpen) {
            setMenuIsOpen(false);
        }
    });

    return (
        <div className="relative">
            <div
                className={
                    menuIsOpen
                        ? `absolute top-1 -right-5 bg-gray-900 py-3 border-2 border-sky-950 rounded-xl w-32 ${popupClassName}`
                        : `hidden ${popupClassName}`
                }
            >
                <div className={`flex flex-col z-10 ${popupClassName}`}>
                    <Link
                        href="#"
                        className={`flex py-1 px-6 justify-start text-md font-light hover:cursor-pointer hover:bg-gray-800 ${popupClassName}`}
                    >
                        Account
                    </Link>
                    <Link
                        href="#"
                        className={`flex py-1 px-6 justify-start text-md font-light hover:cursor-pointer hover:bg-gray-800 ${popupClassName}`}
                    >
                        Settings
                    </Link>
                    <div className={`flex h-0 my-1 border-t border-opacity-50 border-gray-500 ${popupClassName}`}></div>
                    <Link
                        href="#"
                        className={`flex py-1 px-6 justify-start text-md font-light hover:cursor-pointer hover:bg-gray-800 ${popupClassName}`}
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    );
}
