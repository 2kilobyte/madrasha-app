"use client"

import { FeesOut } from '@/models/fee'
import { StudentDisplayList } from '@/models/student'
import { usePathname, useRouter } from 'next/navigation'
import { FormEvent, useCallback, useEffect, useState } from 'react'


export default function StudentDetails() {
    const pathname = usePathname()
    const brokenPath = pathname.split("/")
    const id = brokenPath[brokenPath.length - 1]
    const router = useRouter()

    const [student, setStudent] = useState<StudentDisplayList | null>(null);
    const [allFees, setAllFees] = useState<FeesOut[]>([])
    const [isAddingFee, setIsAddingFee] = useState(false);
    const [isAddingExamResult, setIsAddingExamResult] = useState(false);
    const [monthName, setMonthName] = useState('January')

    const loadData = useCallback(async () => {
        try {
            const response = await fetch(`/api/students/details?id=${id}`);
            const feesResponse = await fetch(`/api/fees/me?id=${id}`);
            
            if (!response.ok || !feesResponse.ok) {
                console.error("Something went wrong");
                return;
            }

            const data = await response.json();
            const feesData = await feesResponse.json();

            setStudent(data);
            setAllFees(feesData);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    }, [id]);

    useEffect(() => {
        loadData()
    }, [loadData])


    async function handleFeeSubmit(e: FormEvent) {
        e.preventDefault();
        if (!student) {
            return
        }

        const today = new Date();
        const year = today.getFullYear();

        try {
            const response  = await fetch('/api/fees', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({monthName, userId: student.id, amount: student.monthly_fee, year: `${year}`})
            });
            
            
            if (!response.ok) {
                console.log("something went wrong");
                
            }

            if (response.ok) {
                alert(`${monthName} fee paid`);
                loadData()
                setIsAddingFee(false)
            }

        } catch (error) {
            console.error('Error fetching student data:', error)
        }
    }


    async function leftStudent(id: number) {
        try {
            const response = await fetch(`/api/students?id=${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                router.push('/dashboard/students')
            }
        } catch (error) {
            console.log("something went wrong", error);
        }
    }

    

    return (
        <>
        {
            student && !isAddingFee && !isAddingExamResult? 
        
        <div className='w-full pl-64'>
            
            <div className='w-full p-6 flex flex-col relative'>
                {
                    student.is_left ?
                    <div className="w-[97%] h-[110vh] bg-gray-800 opacity-80 absolute flex items-center justify-center">
                        <h1 className='uppercase text-[120px] text-white rotate-45'>Student left</h1>
                    </div>
                    :
                    <></>
                }
                
                <div className='w-full flex flex-row gap-12'>
                    <div className='flex flex-col w-2/4'>
                        <div className="w-48 h-48 bg-white border border-b-0 border-gray-200 rounded-t-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center cursor-pointer">
                            <svg className="w-32 h-32 text-gray-800 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <div className='w-full min-h-[400px] bg-white border border-gray-200 rounded-b-lg rounded-tr-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4'>
                            <div className="w-full grid gap-4 mb-2 md:grid-cols-3">
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Student name
                                </label>
                                <input
                                    type="text"
                                    id="student_name"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    placeholder="Name"
                                    value={student.name}
                                    disabled                 
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Date of birth
                                </label>
                                <input
                                    type="text"
                                    id="student_name"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    placeholder="Name"
                                    value={`${new Date(student.date_of_birth)}`.split(" ")[2]+" "+`${new Date(student.date_of_birth)}`.split(" ")[1]+" "+`${new Date(student.date_of_birth)}`.split(" ")[3]}
                                    disabled                 
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Father name
                                </label>
                                <input
                                    type="text"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    value={student.father_name}
                                    disabled                 
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Guardian name
                                </label>
                                <input
                                    type="text"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    value={student.guardian_name}
                                    disabled                 
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Mobile number
                                </label>
                                <input
                                    type="text"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    value={student.mobile_number}
                                    disabled                 
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Gender
                                </label>
                                <input
                                    type="text"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    value={student.gender}
                                    disabled                 
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Age
                                </label>
                                <input
                                    type="text"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    value={student.age}
                                    disabled                 
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Class
                                </label>
                                <input
                                    type="text"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    value={student.class}
                                    disabled                 
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Monthly fee
                                </label>
                                <input
                                    type="text"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    value={student.monthly_fee}
                                    disabled                 
                                />
                            </div>
                            
                        </div>
                        <div className='w-full flex flex-row gap-8'>
                            <div className='p-4'>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    >
                                        Permanent Address
                                </label>
                                <p>{student.permanent_address}</p>
                            </div>
                            <div className='p-4'>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    >
                                        Current Address
                                </label>
                                <p>{student.permanent_address}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col items-center justify-center border border-gray-700 rounded-lg bg-gray-800 cursor-pointer'>
                        <svg className="w-48 h-48 text-gray-800 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clipRule="evenodd"/>
                        </svg>
                        <h2 className='dark:text-gray-500 text-3xl mt-2'>Birth certificate</h2>
                    </div>
                    <div className='w-1/6 flex flex-col items-end'>
                        <button 
                        onClick={() => setIsAddingFee(true)} type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                            <svg className="w-6 h-6 text-gray-800 dark:text-blue-500 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
                            </svg>

                            <span className="sr-only">Icon description</span>
                        </button>

                        <button
                        onClick={() => setIsAddingExamResult(true)}
                        type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500 mt-4">
                            <svg
                            className="w-6 h-6 text-gray-800 dark:text-blue-500 dark:hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            >
                            <path
                                fillRule="evenodd"
                                d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"
                                clipRule="evenodd"
                            />
                            <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                            </svg>
                        </button>
                        <button
                        onClick={() => leftStudent(student.id)}
                        type="button" className="text-red-400 border border-red-600 hover:bg-red-400 hover:text-white focus:ring-4 focus:outline-none focus:red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:red-800 dark:hover:bg-red-500 mt-4">
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                                viewBox="0 0 24 24"
                                >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                                />
                                </svg>

                        </button>
                    </div>
                </div>

                <div className='w-full p-0 pt-8 pb-2'>
                    <h2 className='text-2xl'>Monthly Fees</h2>
                </div>

                <div className="w-full flex flex-row gap-4">
                    {
                        allFees.map(fee => {
                            const date = `${new Date(fee.created_at)}`.split(" ")[2]+" "+`${new Date(fee.created_at)}`.split(" ")[1]+" "+`${new Date(fee.created_at)}`.split(" ")[3];
                            
                            return(
                            <div key={fee.id} className="max-w-sm px-6 py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                
                                <h5 className="mb-2 ml-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    {fee.month_name} ({fee.year})
                                    </h5>
                                <div className='w-full flex flex-row'>
                                    <svg
                                    className="w-6 h-6 text-gray-800 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                                    />
                                    </svg>
                                    <p>Amount: {fee.amount}</p>
                                </div>
                                <div className='w-full flex flex-row mt-2 gap-1'>
                                    <svg
                                    className="w-6 h-6 text-gray-800 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                    <p className='mt-[2px]'>Paid Date: {date}</p>
                                </div>
                                
                            </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
        : student&& isAddingFee ? 
            <div className='w-full pl-64 h-screen flex items-center justify-center'>
                <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Pay fee
                    </h5>
                    <form onSubmit={handleFeeSubmit} className="w-80 mx-auto">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                >
                                    Monthly fee
                            </label>
                            <input
                                type="text"
                                className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                value={student.monthly_fee}
                                disabled                 
                            />
                        </div>
                        <div>
                            <select 
                            onChange={(e) => setMonthName(e.target.value)}
                            id="monthName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                            </select>
                        </div>
                        <div className='mt-6'>
                            <button 
                                type="submit" 
                                className="w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Submit</button>
                        </div>
                        <div className='mt-2'>
                            <button 
                            onClick={() => setIsAddingFee(false)}
                            type="button" className="w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                        </div>
                    </form>
                </div>

            </div>
        : student && isAddingExamResult ?
            <div className='w-full pl-64 h-screen flex items-center justify-center'>
                <div className="w-[500px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Set exam result
                        </h5>
                    <form className='w-full'>
                        <div className='w-full grid grid-cols-2 gap-4'>
                            <div>
                                <label
                                    htmlFor="examType"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Select exam type
                                </label>
                                <select
                                    id="examType"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="1">প্রথম সাময়িক পরীক্ষা</option>
                                    <option value="2">দ্বিতীয় সাময়িক পরীক্ষা
                                    </option>
                                    <option value="3">বার্ষিক পরীক্ষা
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="examYear"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Select exam year
                                </label>
                                <select
                                    id="examYear"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="2025">2025</option>
                                    <option value="2026">2026
                                    </option>
                                    <option value="2027">2027
                                    </option>
                                    <option value="2028">2028
                                    </option>
                                    <option value="2029">2029
                                    </option>
                                    <option value="2030">2030
                                    </option>
                                    <option value="2031">2031
                                    </option>
                                    <option value="2032">2032
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    >
                                        Bangla
                                </label>
                                <input
                                    type="text"
                                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-50"
                                    value={30}
                                    placeholder='Bangla marks'
                                                    
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        :
            <div className='w-full pl-64 h-screen flex items-center justify-center'>
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                        />
                        <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>

            </div>
        }
        </>
    )
}