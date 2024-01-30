"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { createNewReceipt, searchUsers } from "@/app/receipt/create/actions";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";

interface props {
    disabled: boolean;
    userSelected: (name: string, clerk_id: string) => void;
}

export const MIN_USER_SEARCH = 4;

export function UserSelect({ disabled, userSelected }: props) {
    const [searching, setSearching] = useState<boolean>(false);
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const [userTypedValue, setUserTypedValue] = useState<string>("");

    const itemSelected = (name: string) => {
        console.log("select: " + name);
    };

    const valueChanged = (value: string) => {
        if (value.length >= MIN_USER_SEARCH) {
            console.log(value);
        }
    };

    const searchUserButtonClicked = async () => {
        setSearching(true);
        const searchUserRes = await searchUsers(userTypedValue);
        setSearchedUsers(searchUserRes);
        setSearching(false);
        console.log(searchUserRes);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full" variant={"secondary"}>
                    Click to Add Users
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Users</DialogTitle>
                    <DialogDescription>
                        You can search for users by their username, name, or exact email. You can also simply add
                        anonymous users.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col flex-wrap w-full">
                    <div className={`flex flex-col w-full`}>
                        <Input
                            type="text"
                            placeholder="Search users..."
                            onChange={(e) => {
                                setUserTypedValue(e.target.value);
                                valueChanged(e.target.value);
                            }}
                            value={userTypedValue}
                            disabled={disabled}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    console.log("submit");
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-row flex-wrap justify-around">
                        <div className="flex mt-2">
                            <Button variant={"secondary"} disabled={userTypedValue.length < 1 || searching}>
                                Add Anonymous
                            </Button>
                        </div>
                        <div className="flex mt-2">
                            <Button
                                variant={"outline"}
                                disabled={userTypedValue.length < MIN_USER_SEARCH || searching}
                                onClick={searchUserButtonClicked}
                            >
                                Search Users
                            </Button>
                        </div>
                    </div>
                </div>
                <DialogFooter className="!justify-center !flex-row mt-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="mr-1">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant="default"
                            className="ml-1"
                            onClick={() => {
                                console.log("save selected users");
                            }}
                        >
                            Save
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
