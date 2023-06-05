import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-grow items-center justify-center">
            <SignUp />
        </div>
    );
}
