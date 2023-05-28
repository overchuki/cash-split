import { useState } from "react";
import UserMenu from "./userMenu";

export default function UserIcon() {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                onClick={() => {
                    setMenuIsOpen(!menuIsOpen);
                }}
                className="flex items-center justify-center rounded-full bg-sky-800 h-10 w-10 border-4 border-sky-950 hover:cursor-pointer"
            >
                IO
            </div>
            <UserMenu isOpen={menuIsOpen} />
        </div>
    );
}
