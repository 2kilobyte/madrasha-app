import pool from "@/lib/db";
import { Fees } from "@/models/fee";
import { NextResponse } from "next/server";

const validateFeesData = (data: Fees) => {

    
    const errors: string[] = []
    if (!data.amount) errors.push('Amount is required');
    if (!data.monthName) errors.push('Month name is required');
    if (!data.year) errors.push('Year is required');
    if (!data.userId) errors.push('Request not from valid user.')
    return errors;
}

export async function POST(req: Request) {
    
    try {
        const data: Fees = await req.json() ;
        
        const db = await pool.getConnection();
        
        const validationErrors = validateFeesData(data);
        if (validationErrors.length > 0) {
            return NextResponse.json({ errors: validationErrors }, { status: 400 });
        }

        const foundQuery = `SELECT * FROM fees WHERE month_name = ? AND year = ? AND user_id = ?`;

        const [rows] = await db.execute(foundQuery, [
            data.monthName,
            data.year,
            data.userId
        ]);

        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        if (rows.length > 0) {
            return NextResponse.json({ errors: ['Fee already paid'] }, { status: 400 });
        }

        const values = [
            data.amount,
            data.monthName,
            data.year,
            data.userId
        ]

        const query = `INSERT INTO fees (amount, month_name, year, user_id) VALUES (?, ?, ?, ?)`;

        const [results, fields] = await db.execute(query, values);
        db.release();

        return NextResponse.json({results: results, fields}, { status: 201 })
    
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            errors: ['Something went wrong']
        }, { status: 500 });
    }
}

export async function GET(req: Request) {
    
    const url = new URL(req.url);
    const month = url.searchParams.get('month');

    

    try {
        const db = await pool.getConnection();
        const query = `SELECT user_id FROM fees WHERE month_name = ?`;
        const [paidRows] = await db.execute(query, [month])
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const paidStudents = paidRows.map((row) => row.user_id);

        const placeHolders =  paidStudents.map(() => '?').join(', ');
        
        
        let query2 = `SELECT name, id, monthly_fee, guardian_name, mobile_number FROM students WHERE is_left = false`;
        let query3 = `SELECT name, id, monthly_fee, guardian_name, mobile_number FROM students WHERE is_left = false`;
        const query4 = `SELECT SUM(monthly_fee) AS total_monthly_fees FROM students WHERE is_left = false`;
        let query5 = `SELECT SUM(monthly_fee) AS paid_student_monthly_fee FROM students WHERE is_left = false`;
        let query6 = `SELECT SUM(monthly_fee) AS unpaid_student_monthly_fee FROM students WHERE is_left = false`;
        const query7 = `SELECT COUNT(*) AS row_count FROM students WHERE is_left = false`;

        if (paidStudents.length > 0) {
            query2+= ` AND id NOT IN (${placeHolders})`
            query3+= ` AND id IN (${placeHolders})`
            query5+= ` AND id IN (${placeHolders})`
            query6+= ` AND id NOT IN (${placeHolders})`
        }
        

        
        const [allUnPaidStudent] = paidStudents.length === 0 ?  await db.execute(query2) : await db.execute(query2, paidStudents)
        const [allPaidStudent] = paidStudents.length === 0 ? [[]] : await db.execute(query3, paidStudents)
        const [data] = await db.execute(query4)
        const [paidTotal] = paidStudents.length > 0 ? await db.execute(query5, paidStudents) : [[{ paid_student_monthly_fee: "0" }]]
        const [unpaidTotal] = await db.execute(query6, paidStudents);
        const [counts] = await db.execute(query7);
        
        db.release();
        

        
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        return NextResponse.json({allPaidStudent, allUnPaidStudent, total: data[0].total_monthly_fees, paidAmount: paidTotal[0].paid_student_monthly_fee, unpaidAmount: unpaidTotal[0].unpaid_student_monthly_fee, totalStudent: counts[0].row_count}, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            errors: ['Something went wrong']
        }, { status: 500 });
    }
}