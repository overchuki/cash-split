"use client";

import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";

export default function Account() {
    return (
        <div className="flex flex-grow items-center justify-center py-5">
            <SignedIn>
                <UserProfile />
            </SignedIn>
            <SignedOut>
                <div>You are not signed in.</div>
            </SignedOut>
        </div>
    );
}
