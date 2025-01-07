import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const db = await pool.getConnection();
        // 1. Total Students
    const [totalStudentsResult] = await db.query(`
        SELECT COUNT(*) AS totalStudents
        FROM students
        WHERE is_left = false;
      `);
  
      // 2. New Students
      const [newStudentsResult] = await db.query(`
        SELECT COUNT(*) AS newStudents
        FROM students
        WHERE MONTH(created_at) = MONTH(CURDATE()) AND YEAR(created_at) = YEAR(CURDATE());
      `);
  
      // 3. Current Month Total Fee
      const [currentMonthTotalFeeResult] = await db.query(`
        SELECT SUM(monthly_fee) AS currentMonthTotalFee
        FROM students
        WHERE is_left = false;
      `);
  
      // 4. Current Month Paid Fee
      const [currentMonthPaidFeeResult] = await db.query(`
        SELECT SUM(amount) AS currentMonthPaidFee
        FROM fees
        WHERE month_name = MONTHNAME(CURDATE()) AND year = YEAR(CURDATE());
      `);

       // 3. Paid and Unpaid Students
    const [paidUnpaidStudentsResult] = await db.query(`
        SELECT 
            SUM(CASE WHEN f.amount >= s.monthly_fee THEN 1 ELSE 0 END) AS paidStudents,
            SUM(CASE WHEN f.amount < s.monthly_fee OR f.amount IS NULL THEN 1 ELSE 0 END) AS unpaidStudents
        FROM students s
        LEFT JOIN fees f 
            ON s.id = f.user_id 
            AND f.month_name = MONTHNAME(CURDATE()) 
            AND f.year = YEAR(CURDATE())
        WHERE s.is_left = false;
      `);
  
      // 5. Current Month Unpaid Students
      const [currentMonthUnpaidStudentsResult] = await db.query(`
        SELECT 
            s.id, 
            s.name, 
            s.class, 
            s.monthly_fee, 
            s.guardian_name, 
            s.mobile_number, 
            COALESCE(SUM(f.amount), 0) AS paid_amount, 
            (s.monthly_fee - COALESCE(SUM(f.amount), 0)) AS unpaid_amount
        FROM students s
        LEFT JOIN fees f ON s.id = f.user_id AND f.month_name = MONTHNAME(CURDATE()) AND f.year = YEAR(CURDATE())
        WHERE s.is_left = false
        GROUP BY s.id
        HAVING unpaid_amount > 0;
      `);
  
      // 6. Monthly Overview
      const [monthlyOverviewResult] = await db.query(`
        SELECT 
            month_name, 
            year, 
            SUM(amount) AS paidFee
        FROM fees
        GROUP BY month_name, year
        ORDER BY FIELD(month_name, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'), year;
      `);

        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const totalStudents = totalStudentsResult[0].totalStudents
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const newStudents = newStudentsResult[0].newStudents
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const currentMonthTotalFee = parseInt(currentMonthTotalFeeResult[0].currentMonthTotalFee || 0)
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const currentMonthPaidFee = parseInt(currentMonthPaidFeeResult[0].currentMonthPaidFee || 0)

        const currentMonthUnpaidFee = currentMonthTotalFee - currentMonthPaidFee;
        
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const paidStudents = parseInt(paidUnpaidStudentsResult[0].paidStudents) || 0;
        
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const unpaidStudents = parseInt(paidUnpaidStudentsResult[0].unpaidStudents) || 0;
        
        

        db.release();

        
        return NextResponse.json({
            totalStudents,
            newStudents,
            currentMonthTotalFee,
            currentMonthPaidFee,
            currentMonthUnpaidFee,
            paidStudents,
            unpaidStudents,
            monthlyOverview: monthlyOverviewResult,
            currentMonthUnpaidStudents: currentMonthUnpaidStudentsResult,
        }, {status: 200})
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            errors: ['Something went wrong']
        }, { status: 500 })
    }
}