import { NextResponse } from "next/server";

export async function GET() {
    NextResponse.json({message: 'This feature coming soon'}, {status: 200});
}