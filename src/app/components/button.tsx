import Loader from "./loader";

type buttonStyle = {
    borderClass: string;
    bg: string;
    secondaryBg: string;
    textColor: string;
    loaderColor: `fill-${string}`;
};

interface props {
    text: string;
    type: "outline" | "text" | "fill";
    theme: "default" | "danger";
    isLoading?: boolean;
    hover?: boolean;
    textSizeTailwind?: string;
    widthTailwind?: string;
    onClick?: () => void;
}

export default function Button({
    text,
    type,
    theme,
    isLoading = false,
    hover = true,
    textSizeTailwind,
    widthTailwind,
    onClick,
}: props) {
    const classConfig: {
        default: buttonStyle;
        danger: buttonStyle;
    } = {
        default: {
            borderClass: "border-sky-400",
            bg: "bg-sky-600",
            secondaryBg: "hover:bg-sky-800",
            textColor: "text-sky-700",
            loaderColor: "fill-sky-400",
        },
        danger: {
            borderClass: "border-rose-400",
            bg: "bg-rose-600",
            secondaryBg: "hover:bg-rose-800",
            textColor: "text-rose-700",
            loaderColor: "fill-rose-950",
        },
    };

    const getButton = () => {
        switch (type) {
            case "outline":
                return (
                    <button
                        onClick={onClick}
                        disabled={isLoading}
                        className={`btn border font-mono p-2 border-opacity-50 rounded whitespace-nowrap disabled:opacity-50 disabled:cursor-default ${
                            widthTailwind ?? ""
                        }  ${textSizeTailwind ?? "text-sm"}  ${classConfig[theme].borderClass}  ${
                            hover && !isLoading ? `hover:border-opacity-0 ` + classConfig[theme].secondaryBg : ``
                        }`}
                    >
                        {isLoading ? <Loader size="sm" primaryColorTailwind={classConfig[theme].loaderColor} /> : text}
                    </button>
                );
            case "text":
                return (
                    <button
                        onClick={onClick}
                        disabled={isLoading}
                        className={`btn font-mono whitespace-nowrap disabled:opacity-50 disabled:cursor-default ${
                            widthTailwind ?? ""
                        } ${textSizeTailwind ?? "text-sm"}  ${
                            hover && !isLoading ? "hover:" + classConfig[theme].textColor : ``
                        }`}
                    >
                        {isLoading ? <Loader size="sm" primaryColorTailwind={classConfig[theme].loaderColor} /> : text}
                    </button>
                );
            case "fill":
                return (
                    <button
                        onClick={onClick}
                        disabled={isLoading}
                        className={`btn ${widthTailwind ?? ""} font-mono ${
                            textSizeTailwind ?? "text-sm"
                        } p-2 disabled:opacity-50 disabled:cursor-default rounded whitespace-nowrap ${
                            classConfig[theme].bg
                        } ${hover ? classConfig[theme].secondaryBg : ``}`}
                    >
                        {isLoading ? <Loader size="sm" primaryColorTailwind={classConfig[theme].loaderColor} /> : text}
                    </button>
                );
        }
    };

    return getButton();
}
