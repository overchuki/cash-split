import { Dispatch, ReactNode, SetStateAction } from "react";

interface props {
    isOpen: boolean;
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>;
    borderTailwind?: string;
    children?: ReactNode;
}

export default function Modal({ isOpen, setDialogIsOpen, borderTailwind, children }: props) {
    return (
        <div className={`${isOpen ? "" : "hidden"}`}>
            <div
                className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-10"
                onClick={(e) => {
                    setDialogIsOpen(false);
                }}
            ></div>
            <div
                className={`fixed top-1/2 left-1/2 z-20 w-[calc(100vw-0.75rem)] xs:w-3/4 md:w-1/2 2xl:w-1/3 max-w-screen -translate-y-1/2 -translate-x-1/2 bg-light-black rounded-2xl border-2 ${
                    borderTailwind ?? "border-sky-950"
                } p-4`}
            >
                <div className="flex flex-col">{children}</div>
            </div>
        </div>
    );
}
