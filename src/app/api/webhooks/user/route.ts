import type { WebhookEvent, UserJSON } from "@clerk/clerk-sdk-node";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { getErrorResponse } from "@/app/utils/general";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = (await request.json()) as WebhookEvent;
    console.log(body);

    const payload = JSON.stringify(body);
    const headers: WebhookRequiredHeaders = {
        "svix-id": request.headers.get("svix-id") ?? "invalid_id",
        "svix-timestamp": request.headers.get("svix-timestamp") ?? "invalid_timestamp",
        "svix-signature": request.headers.get("svix-signature") ?? "invalid_signature",
    };
    console.log("payload: " + payload);
    console.log("headers: " + headers);

    const secret = process.env.SVIX_SECRET;
    if (secret === undefined) {
        return getErrorResponse(500, "Server error");
    }
    const wh = new Webhook(secret);
    let msg;
    try {
        msg = wh.verify(payload, headers);
    } catch (err) {
        return getErrorResponse(403, "Request is invalid");
    }
    console.log("msg: " + msg);

    switch (body.type) {
        case "user.created":
            console.log(body.data);
            break;
        case "user.updated":
            console.log(body.data);
            break;
        case "user.deleted":
            console.log(body.data);
            break;
    }
}

const createUser = (user: UserJSON): void => {};

const updateUser = (user: UserJSON): void => {};

const deleteUser = (user: UserJSON): void => {};
