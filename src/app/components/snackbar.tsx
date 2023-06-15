"use client";

import { Dispatch, SetStateAction, useEffect } from "react";

interface props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    type: "success" | "error";
    text: string;
    closeAfterMilliseconds?: number;
    onClose?: () => void;
}

export default function Snackbar({ open, setOpen, type, text, closeAfterMilliseconds = 3000, onClose }: props) {
    const typeStyles: { success: string; error: string } = {
        success: "bg-green-950",
        error: "bg-red-950",
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, closeAfterMilliseconds);
        }
    }, [open]);

    return (
        <div className={`${open ? "fixed" : "hidden"} left-16 bottom-8 ${typeStyles[type]} z-50 rounded-lg shadow-2xl`}>
            <div className="flex flex-row py-3 px-4">
                <div className="flex items-center">
                    {type === "success" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.6em"
                            viewBox="0 0 512 512"
                            style={{ fill: "#031003" }}
                        >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                    ) : (
                        ""
                    )}
                    {type === "error" ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1.6em"
                            viewBox="0 0 512 512"
                            style={{ fill: "#100303" }}
                        >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                        </svg>
                    ) : (
                        ""
                    )}
                </div>
                <div className="flex items-center mx-4 text-sm whitespace-nowrap">{text}</div>
                <div className="flex items-center justify-end">
                    <div
                        className="flex items-center justify-center rounded-full w-8 h-8 hover:cursor-pointer hover:bg-white hover:bg-opacity-10"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 384 512"
                            style={{ fill: `${type === "success" ? "#031003" : "#100303"}` }}
                        >
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
