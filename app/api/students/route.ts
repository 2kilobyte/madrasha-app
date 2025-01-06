import pool from "@/lib/db"
import { Student } from "@/models/student";
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'SELECT * FROM students';
        const [rows] = await db.execute(query)
        db.release()

        return NextResponse.json(rows)
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            errors: ['Something went wrong']
        }, { status: 500 })
    }
}



const validateStudentData = (data: Student) => {
    const errors: string[] = [];

    
  
    // Required fields validation
    if (!data.name) errors.push('Name is required');
    if (!data.class) errors.push('Class is required');
    if (!data.gender) errors.push('Gender is required');
    if (!data.age || isNaN(data.age) || data.age <= 0) errors.push('Valid age is required');
    if (!data.dateOfBirth) errors.push('Date of birth is required');
    if (!data.fatherName) errors.push('Father name is required');
    if (!data.permanentAddress || !data.permanentAddress.village || !data.permanentAddress.postOffice || !data.permanentAddress.policeStation || !data.permanentAddress.zilla) {
        errors.push('Permanent address is required with all fields');
    }
    if (!data.guardianName) errors.push('Guardian name is required');
    if (!data.mobileNumber) errors.push('Valid mobile number is required');
    if (!data.monthlyFee || isNaN(data.monthlyFee) || data.monthlyFee <= 0) errors.push('Valid monthly fee is required');
  
    // Optional fields validation (if present)
    if (data.currentAddress && (!data.currentAddress.village || !data.currentAddress.postOffice || !data.currentAddress.policeStation || !data.currentAddress.zilla)) {
      errors.push('Current address, if provided, must have all fields');
    }
  
    return errors;
  };



export async function POST(req: Request) {
    const query = `
      INSERT INTO students (name, age, date_of_birth, father_name, permanent_address, guardian_name, mobile_number, monthly_fee, current_address, class, gender)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
        // Parse the incoming request body as JSON
        const data: Student = await req.json() ;
        

        // Validate the data
        const validationErrors = validateStudentData(data);
        if (validationErrors.length > 0) {
            return NextResponse.json({errors: validationErrors}, {status: 400})
        }

        const permanentAddress = `${data.permanentAddress.village}, ${data.permanentAddress.postOffice}, ${data.permanentAddress.policeStation}, ${data.permanentAddress.zilla}`; // Store address as a JSON string
        const currentAddress = data.currentAddress ? `${data.currentAddress.village}, ${data.currentAddress.postOffice}, ${data.currentAddress.policeStation}, ${data.currentAddress.zilla}` : null;

        const values = [
            data.name,
            data.age,
            data.dateOfBirth,
            data.fatherName,
            permanentAddress,
            data.guardianName,
            data.mobileNumber,
            data.monthlyFee,
            currentAddress,
            data.class, // Use null if class is not provided
            data.gender
        ];

        const db = await pool.getConnection();
        const [results, fields] = await db.execute(query, values);
        db.release();
        
        return NextResponse.json({results: results, fields}, { status: 201 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            errors: ['Something went wrong']
        }, { status: 500 })
    }
    
}


export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
  
    // Validate the provided ID
    if (!id) {
      return NextResponse.json(
        { errors: ["Student ID is required."] },
        { status: 400 }
      );
    }
  
    try {
      const db = await pool.getConnection();
  
      // Update the `is_left` field for the student with the given ID
      const query = "UPDATE students SET is_left = true WHERE id = ?";
      const [result] = await db.execute(query, [id]);
      db.release();
  

      // Check if any rows were updated
      //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
      if (result.affectedRows === 0) {
        return NextResponse.json(
          { errors: ["Student not found or already marked as left."] },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { message: `Student with ID ${id} marked as left successfully.` },
        { status: 200 }
      );
    } catch (error) {
        console.error(error);
        
      return NextResponse.json(
        { errors: ["An error occurred while processing your request."] },
        { status: 500 }
      );
    }
  }

