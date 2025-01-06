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
        const query = 'SELECT * FROM students WHERE id = ?';
        const [rows] = await db.execute(query, [id])
        db.release()


        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const data = rows[0]

        return NextResponse.json(data, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            errors: ['Something went wrong']
        }, { status: 500 })
    }
}