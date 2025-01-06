import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ errors: ['Something went wrong.'] }, { status: 400 });
    }

    
    
    try {
        const db = await pool.getConnection()
        const query = 'SELECT * FROM fees WHERE user_id = ? ORDER BY id';
        const [rows] = await db.execute(query, [id])
        db.release()


        return NextResponse.json(rows, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            errors: ['Something went wrong']
        }, { status: 500 })
    }
}