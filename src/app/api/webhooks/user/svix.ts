import { ProcessResponseObject } from "@/app/types/general";
import { NextRequest } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

export const verifySvixHeaders = async (request: NextRequest): Promise<ProcessResponseObject> => {
    const payload = JSON.stringify(await request.json());
    const svixHeaders: WebhookRequiredHeaders = {
        "svix-id": request.headers.get("svix-id") ?? "invalid_id",
        "svix-timestamp": request.headers.get("svix-timestamp") ?? "invalid_timestamp",
        "svix-signature": request.headers.get("svix-signature") ?? "invalid_signature",
    };

    const secret = process.env.SVIX_SECRET;
    if (secret === undefined) {
        return { code: 500, msg: "SVIX secret not set" };
    }
    const wh = new Webhook(secret);
    try {
        wh.verify(payload, svixHeaders);
    } catch (err) {
        return { code: 403, msg: "Request is invalid" };
    }

    return { code: 200, msg: "Request verified" };
};
