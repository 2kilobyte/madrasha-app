"use client"
import { StudentDisplayList } from "@/models/student";
import { useEffect, useState } from "react";

export default function Students() {
    const [students, setStudents] = useState<StudentDisplayList[]>([])
    async function loadData() {
        const response = await fetch('/api/students')

        if (response.ok) {
            const data = await response.json();
            
            setStudents(data)
        }
    }
    useEffect(() => {
        loadData();
    }, [])
    
    return (
        <div className='w-full pl-64'>
            <h1 className='p-4 text-3xl'>Students</h1>
            <div className="w-full p-6 relative overflow-x-auto min-h-screen">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th scope="col" className="px-6 py-3">
                        Student name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        age
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Father name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Mobile number
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Class
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Guardian name
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.length > 0 &&
                        students.map((student, idx) => (
                            <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <a href={`/dashboard/students/${student.id}`}>{student.name}</a>
                            </th>
                            <td className="px-6 py-4">{student.age}</td>
                            <td className="px-6 py-4">{student.father_name}</td>
                            <td className="px-6 py-4">{student.permanent_address}</td>
                            <td className="px-6 py-4">{student.mobile_number}</td>
                            <td className="px-6 py-4">{student.class && student.class}</td>
                            <td className="px-6 py-4">{student.gender}</td>
                            <td className="px-6 py-4">{student.guardian_name}</td>
                            </tr>
                        ))
                    }
                    
                </tbody>
                </table>

            </div>
        </div>
    );
}