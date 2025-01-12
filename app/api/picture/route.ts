import { bucket } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { Readable } from "stream";
import pool from "@/lib/db"


export async function POST(req: NextRequest) {
  // Access query parameters using req.nextUrl
  const { searchParams } = req.nextUrl;
  const picFor = searchParams.get('pic_for'); // Assuming a query parameter 'fileFor'
  const id = searchParams.get('id'); // Assuming a query parameter 'id'

  

    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) {
        return NextResponse.json({ errors: ["No file uploaded"] }, { status: 400 });
    }

    const db = await pool.getConnection()

    try {
        const query = picFor === "student_pic" ? `SELECT src_picture FROM students WHERE id = ? AND src_picture IS NOT NULL` : `SELECT src_birth FROM students WHERE id = ? AND src_birth IS NOT NULL`;

        const [rows] = await db.execute(query, [id]);

        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        if (rows.length > 0) {
          //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
          const picPath = picFor === "student_pic" ? rows[0].src_picture : rows[0].src_birth;
          const deleteBlob = bucket.file(picPath)

          console.log(deleteBlob);
          

          deleteBlob.delete();
        }

        
        // Create a unique file name for Firebase
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const fileName = Date.now() + path.extname(file.name);
        const filePath = picFor === 'student_pic' ? `students/pictures/${fileName}` : `students/birth/${fileName}`;
    
        // Create a reference to the file in Firebase Storage
        const blob = bucket.file(filePath);

        console.log(blob);
        
        const blobStream = blob.createWriteStream({
          resumable: false,  // Disable resumable uploads for simplicity
        });
        
    
         // Convert the file (Blob) to a Node.js stream
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        const readableStream = file.stream();
        const nodeStream = Readable.from(readableStream);

        // Pipe the Node.js Readable stream to Firebase Storage
        nodeStream.pipe(blobStream);
    
        // Wait for the upload to finish
        await new Promise((resolve, reject) => {
          blobStream.on('finish', resolve);
          blobStream.on('error', reject);
        });
    
        // Get the file's URL after uploading
        const fileUrl = picFor === 'student_pic' ?  `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/students%2Fpictures%2F${fileName}?alt=media` : `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/students%2Fbirth%2F${fileName}?alt=media`;

        await db.execute(
          `UPDATE students SET ${picFor === "student_pic" ? "picture" : "birth_cirtificate"} = ?, ${picFor === "student_pic" ? "src_picture" : "src_birth"} = ? WHERE id = ?`,
          [fileUrl, filePath, id]
        );

        db.release();
        return NextResponse.json({ message: "File uploaded and profile updated", fileUrl}, { status: 200 })
      } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ errors: ["Error uploading file"] }, { status: 500 });
      }
    
  }