import { NextResponse } from "next/server";

export function getHTTPResponse(code: number, message: string): Response {
    return NextResponse.json({ message: message }, { status: code });
}
