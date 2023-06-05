import { useState } from "react";
import UserMenu from "./userMenu";

export default function UserIcon() {
    const popupClassName = "POPUP_ELEMENT";

    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

    return (
        <div className={`flex flex-col items-center justify-center ${popupClassName}`}>
            <div
                onClick={() => {
                    setMenuIsOpen(!menuIsOpen);
                }}
                className={`flex items-center justify-center rounded-full bg-sky-800 h-10 w-10 border-4 border-sky-950 hover:cursor-pointer ${popupClassName}`}
            >
                IO
            </div>
            <UserMenu menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} popupClassName={popupClassName} />
        </div>
    );
}
