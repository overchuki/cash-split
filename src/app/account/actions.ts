"use server";
import { clerkClient } from "@clerk/nextjs/server";

export const deleteUser = async (userId: string): Promise<number> => {
    try {
        await clerkClient.users.deleteUser(userId);
        return 200;
    } catch (error) {
        console.log(error);
        return 500;
    }
};
