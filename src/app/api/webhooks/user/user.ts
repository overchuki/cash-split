import { UserJSON, DeletedObjectJSON } from "@clerk/clerk-sdk-node";
import { PrismaClient, User } from "@prisma/client";

export const createUser = async (user: UserJSON) => {
    const existingUser = await findExistingUser(user.id);

    if (existingUser) {
        await updateUser(user);
    } else {
        const prisma = new PrismaClient();
        const res = await prisma.user.create({
            data: {
                clerk_id: user.id,
                username: user.username,
                email: user.email_addresses.find((ema) => ema.id === user.primary_email_address_id)?.email_address,
                name: user.first_name + " " + user.last_name,
                profile_img_url: user.image_url,
            },
        });
        console.log("USER CREATED: ", JSON.stringify(res));
    }
};

export const updateUser = async (user: UserJSON) => {
    const existingUser = await findExistingUser(user.id);

    if (existingUser) {
        const prisma = new PrismaClient();
        const res = await prisma.user.update({
            where: {
                clerk_id: user.id,
            },
            data: {
                clerk_id: user.id,
                username: user.username,
                email: user.email_addresses.find((ema) => ema.id === user.primary_email_address_id)?.email_address,
                name: user.first_name + " " + user.last_name,
                profile_img_url: user.image_url,
            },
        });
        console.log("USER UPDATED: ", JSON.stringify(res));
    } else {
        createUser(user);
    }
};

export const deleteUser = async (user: DeletedObjectJSON) => {
    const userToDelete = user.id ? await findExistingUser(user.id) : null;
    if (!user.deleted || !userToDelete) {
        console.error("TRY DELETE: failed to find user in db");
    } else {
        const prisma = new PrismaClient();
        const res = await prisma.user.delete({
            where: {
                clerk_id: user.id,
            },
        });
        console.log("USER DELETED: ", JSON.stringify(res));
    }
};

const findExistingUser = async (userId: string): Promise<User | null> => {
    const prisma = new PrismaClient();
    return await prisma.user.findFirst({
        where: {
            clerk_id: userId,
        },
    });
};
