import type { WebhookEvent, UserJSON } from "@clerk/clerk-sdk-node";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { getErrorResponse } from "@/app/utils/general";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = (await request.json()) as WebhookEvent;
    console.log(body);

    const payload = JSON.stringify(body);
    console.log("HEADERS: ", request.headers);
    const svixHeaders: WebhookRequiredHeaders = {
        "svix-id": request.headers.get("svix-id") ?? "invalid_id",
        "svix-timestamp": request.headers.get("svix-timestamp") ?? "invalid_timestamp",
        "svix-signature": request.headers.get("svix-signature") ?? "invalid_signature",
    };
    console.log("payload: " + payload);
    console.log("headers: " + JSON.stringify(svixHeaders));

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

    switch (body.type) {
        case "user.created":
            console.log("USER CREATED EVENT");
            break;
        case "user.updated":
            console.log("USER UPDATED EVENT");
            break;
        case "user.deleted":
            console.log("USER DELETED EVENT");
            break;
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}

const createUser = (user: UserJSON): void => {};

const updateUser = (user: UserJSON): void => {};

const deleteUser = (user: UserJSON): void => {};
