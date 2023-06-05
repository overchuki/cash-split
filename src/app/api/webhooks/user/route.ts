import type { WebhookEvent, UserJSON, DeletedObjectJSON } from "@clerk/clerk-sdk-node";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { getErrorResponse } from "@/app/utils/general";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
    const body = (await request.json()) as WebhookEvent;

    const payload = JSON.stringify(body);
    const svixHeaders: WebhookRequiredHeaders = {
        "svix-id": request.headers.get("svix-id") ?? "invalid_id",
        "svix-timestamp": request.headers.get("svix-timestamp") ?? "invalid_timestamp",
        "svix-signature": request.headers.get("svix-signature") ?? "invalid_signature",
    };

    const secret = process.env.SVIX_SECRET;
    if (secret === undefined) {
        return getErrorResponse(500, "Server error");
    }
    const wh = new Webhook(secret);
    try {
        wh.verify(payload, svixHeaders);
    } catch (err) {
        return getErrorResponse(403, "Request is invalid");
    }

    try {
        switch (body.type) {
            case "user.created":
                await createUser(body.data);
                break;
            case "user.updated":
                await updateUser(body.data);
                break;
            case "user.deleted":
                await deleteUser(body.data);
                break;
        }
    } catch (err) {
        console.log(JSON.stringify(err));
        return NextResponse.json({ message: "Webhook received, error processing" }, { status: 500 });
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}

const createUser = async (user: UserJSON) => {
    const prisma = new PrismaClient();
    const res = await prisma.user.create({
        data: {
            clerk_id: user.id,
            username: user.username,
            email: user.email_addresses.find((ema) => ema.id === user.primary_email_address_id)?.email_address,
            name: user.first_name + " " + user.last_name,
        },
    });
    console.log("USER CREATED: ", JSON.stringify(res));
};

const updateUser = async (user: UserJSON) => {
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
        },
    });
    console.log("USER UPDATED: ", JSON.stringify(res));
};

const deleteUser = async (user: DeletedObjectJSON) => {
    if (user.deleted) {
        const prisma = new PrismaClient();
        const res = await prisma.user.delete({
            where: {
                clerk_id: user.id,
            },
        });
        console.log("USER DELETED: ", JSON.stringify(res));
    }
};
