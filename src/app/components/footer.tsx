import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex flex-row min-w-full justify-evenly py-4 border-t border-opacity-50 border-t-gray-700 text-center">
            <div className="font-mono">Developed by Igor Overchuk</div>
            <Link
                href="https://overchuk.dev"
                target="_blank"
                className="text-sky-400 hover:underline font-mono text-center"
            >
                Visit my Personal Site
            </Link>
        </div>
    );
}
