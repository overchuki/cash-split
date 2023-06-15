import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { getHTTPResponse } from "@/app/api/utils/general";
import { NextRequest } from "next/server";
import { createUser, updateUser, deleteUser } from "@/app/api/webhooks/user/user";
import { ProcessResponseObject } from "@/app/types/general";
import { verifySvixHeaders } from "./svix";

export async function POST(request: NextRequest) {
    const svixVerifyObj = await verifySvixHeaders(request);
    if (svixVerifyObj.code >= 400) {
        return getHTTPResponse(svixVerifyObj.code, svixVerifyObj.msg);
    }

    const processBodyObj = await processRequest(request);
    return getHTTPResponse(processBodyObj.code, processBodyObj.msg);
}

const processRequest = async (request: NextRequest): Promise<ProcessResponseObject> => {
    const body = (await request.json()) as WebhookEvent;
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

        return { code: 200, msg: "Webhook received and processed" };
    } catch (err) {
        console.log(JSON.stringify(err));
        return { code: 500, msg: "Webhook received, error processing" };
    }
};
