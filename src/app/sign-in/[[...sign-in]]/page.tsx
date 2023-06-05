import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex flex-grow items-center justify-center py-5">
            <SignIn />
        </div>
    );
}
