interface props {
    open: boolean;
    children: React.ReactNode;
}

export default function DropdownInput({ open, children }: props) {
    return (
        <div
            className={`btn py-2 px-4 bg-neutral-950 border border-neutral-700 rounded flex flex-row justify-between ${
                open ? "outline outline-1" : ""
            }`}
        >
            <div className="flex justify-center items-center mr-4">{children}</div>
            <div className="flex justify-center items-center">
                {open ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        style={{ fill: "#ffffff" }}
                    >
                        <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                        style={{ fill: "#ffffff" }}
                    >
                        <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                )}
            </div>
        </div>
    );
}
