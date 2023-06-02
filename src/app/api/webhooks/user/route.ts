import type { WebhookEvent, UserJSON } from "@clerk/clerk-sdk-node";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { getErrorResponse } from "@/app/utils/general";
import { loadEnvConfig } from "@next/env";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const projectDir = process.cwd();
    const env = loadEnvConfig(projectDir);
    console.log(request);
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
        console.log("ERROR: could not locate secret");
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

    if (body && body.evt) {
        const evt = body.evt as WebhookEvent;
        switch (evt.type) {
            case "user.created":
                console.log(evt.data);
                break;
            case "user.updated":
                console.log(evt.data);
                break;
            case "user.deleted":
                console.log(evt.data);
                break;
        }
    } else {
        return getErrorResponse(400, "Body does not have required data");
    }
}

const createUser = (user: UserJSON): void => {};

const updateUser = (user: UserJSON): void => {};

const deleteUser = (user: UserJSON): void => {};
