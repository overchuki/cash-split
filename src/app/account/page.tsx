"use client";

import { SignedIn, SignedOut, UserProfile } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import Button from "../components/button";
import { useState } from "react";
import Modal from "../components/modal";
import { useRouter } from "next/navigation";
import { deleteUser } from "./actions";
import { useClerk } from "@clerk/clerk-react";
import Snackbar from "../components/snackbar";

export default function Account() {
    const router = useRouter();
    const { signOut } = useClerk();
    const { isSignedIn, user, isLoaded } = useUser();
    const [snackBarIsOpen, setSnackBarIsOpen] = useState<boolean>(false);
    const [snackbarText, setSnackbarText] = useState<string>("");
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const [isDeletingUser, setIsDeletingUser] = useState<boolean>(false);

    const deleteUserButtonClicked = async () => {
        try {
            if (!(isSignedIn && isLoaded && user)) {
                throw new Error("Cannot delete user. User is not present");
            }
            setIsDeletingUser(true);
            const result = await deleteUser(user.id);
            await processDeleteUserResult(result);
        } catch (e) {
            console.error(JSON.stringify(e));
            showSnackbar("Failed to delete user");
        }
    };

    const processDeleteUserResult = async (result: number) => {
        if (result === 200) {
            await signOut();
            router.push("/goodbye");
        } else {
            setIsDeletingUser(false);
            throw new Error("Failed to delete user");
        }
    };

    const showSnackbar = (text: string) => {
        setSnackbarText(text);
        setSnackBarIsOpen(true);
    };

    return (
        <div className="flex flex-grow items-center justify-center py-5">
            <Snackbar open={snackBarIsOpen} setOpen={setSnackBarIsOpen} type="error" text={snackbarText} />
            <Modal isOpen={dialogIsOpen} setDialogIsOpen={setDialogIsOpen} borderTailwind="border-rose-950">
                <div className="flex text-xl md:text-2xl text-rose-700 p-2">Are You Sure?</div>
                <div className="flex text-sm p-2">Deleting your account is final and all data is removed.</div>
                <div className="flex flex-row justify-between p-2">
                    <div className="flex basis-1/4">
                        <Button
                            text="Cancel"
                            type="outline"
                            theme="danger"
                            widthTailwind="min-w-full"
                            onClick={() => {
                                setDialogIsOpen(false);
                            }}
                        />
                    </div>
                    <div className="flex basis-1/3">
                        <Button
                            text="Delete Account"
                            type="fill"
                            theme="danger"
                            widthTailwind="min-w-full"
                            isLoading={isDeletingUser}
                            onClick={() => {
                                deleteUserButtonClicked();
                            }}
                        />
                    </div>
                </div>
            </Modal>
            <SignedIn>
                <div className="flex flex-col">
                    <UserProfile />
                    <div className="flex box-border">
                        <div className="flex flex-col w-[calc(100vw-0.75rem)] xs:w-full xs:mx-7 my-6 bg-light-black rounded-2xl border-2 border-rose-950 px-9 py-8">
                            <div className="flex text-2xl md:text-3xl text-rose-700">Delete Account</div>
                            <div className="flex mt-4">
                                <Button
                                    text="Delete my Account"
                                    type="fill"
                                    theme="danger"
                                    widthTailwind="w-48"
                                    onClick={() => {
                                        setDialogIsOpen(!dialogIsOpen);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <div>You are not signed in.</div>
            </SignedOut>
        </div>
    );
}
