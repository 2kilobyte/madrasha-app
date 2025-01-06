import pool from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; 


interface Login {
    email: string;
    password: string;
}

const validateLoginData = (data: Login) => {
    const errors: string[] = []
    if (!data.email) errors.push('Email is required.');
    if (!data.password) errors.push('Password is required.');

    return errors;
}

export async function POST(req: Request) {
    try {
        const data: Login = await req.json();

        const validationErrors = validateLoginData(data)
        if(validationErrors.length > 0) {
            return NextResponse.json({ errors: validationErrors }, { status: 400 });
        }

        const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

        const values = [
            data.email,
            data.password
        ];

        const db = await pool.getConnection()
        const [rows] = await db.execute(query, values)
        db.release()

        

        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        if (rows.length === 1) {
            // create jwt token
            const token = jwt.sign({userId: 1}, 'ajsoie822s6U^*%UY872sja', {expiresIn: '3h'});

            return NextResponse.json({token}, { status: 200 })
        }else{
            return NextResponse.json({ errors: ['Email or password incorrect'] }, { status: 401 });
        }
    } catch (error) {
        console.error(error);
        
        return NextResponse.json({
            errors: ['Something went wrong']
        }, { status: 500 })
    }
}