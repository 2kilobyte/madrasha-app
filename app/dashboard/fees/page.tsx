"use client"
import { months } from '@/lib/month';
import { FeesDetails } from '@/models/fee';
import React, { useEffect, useState } from 'react'

const Fees = () => {
  const [feesDetails, setFeesDetails] = useState<FeesDetails | null>(null);
  async function loadFeesData() {
    const currentMonthIndex = new Date().getMonth();
    const currentMonth = months[currentMonthIndex]

    try {
      const response = await fetch(`/api/fees?month=${currentMonth}`);
      if (!response.ok) {
        console.log("something went wrong");
        
      }
      if (response.ok) {
        
        const data: FeesDetails = await response.json();

        setFeesDetails(data);
      }


    } catch (error) {
      console.log("something went wrong", error);
    }
    
    
  }

  useEffect(() => {
    loadFeesData()
  }, [])
  
  return (
    <>
      {
        feesDetails ?
      
      <div className='w-full pl-64'>
        <div className="w-full p-6 h-screen flex flex-col bg-[#101316]">
          <div className="flex items-center justify-between">
            <h3 className='text-lg font-medium'>
              Monthly Fees
            </h3>
            <div></div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4 mt-4">
            <div className='relative flex flex-col rounded-md bg-[#191e23] p-6'>
              <div className='flex flex-row items-center justify-between mb-4 text-[#dcebfab3]'>
                <p className='text-sm font-medium'>Total Amount</p>
                <svg
                className="w-6 h-6 text-gray-800 dark:text-[#dcebfab3]"
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
                  strokeWidth={2}
                  d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
                </svg>
              </div>
              <h5 className='inline text-2xl/none font-semibold'>BDT {feesDetails.total}</h5>
              <p className='text-sm font-medium dark:text-[#dcebfab3]'>All student total fee</p>
            </div>

            <div className='relative flex flex-col rounded-md bg-[#191e23] p-6'>
              <div className='flex flex-row items-center justify-between mb-4 text-[#dcebfab3]'>
                <p className='text-sm font-medium'>Paid Amount</p>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-[#dcebfab3]"
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
                    d="M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                  />
                </svg>

              </div>
              <h5 className='inline text-2xl/none font-semibold'>BDT {feesDetails.paidAmount}</h5>
              <p className='text-sm font-medium dark:text-[#dcebfab3]'>Students paid amount</p>
            </div>

            <div className='relative flex flex-col rounded-md bg-[#191e23] p-6'>
              <div className='flex flex-row items-center justify-between mb-4 text-[#dcebfab3]'>
                <p className='text-sm font-medium'>Unpaid Amount</p>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-[#dcebfab3]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.458 3.11A1 1 0 0 1 19 4v16a1 1 0 0 1-1.581.814L12 16.944V7.056l5.419-3.87a1 1 0 0 1 1.039-.076ZM22 12c0 1.48-.804 2.773-2 3.465v-6.93c1.196.692 2 1.984 2 3.465ZM10 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6V8Zm0 9H5v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h5 className='inline text-2xl/none font-semibold'>BDT {feesDetails.unpaidAmount}</h5>
              <p className='text-sm font-medium dark:text-[#dcebfab3]'>Students have to pay this amount</p>
            </div>

            <div className='relative flex flex-col rounded-md bg-[#191e23] p-6'>
              <div className='flex flex-row items-center justify-between mb-4 text-[#dcebfab3]'>
                <p className='text-sm font-medium'>Total students</p>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-[#dcebfab3]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h5 className='inline text-2xl/none font-semibold'>{feesDetails.totalStudent}</h5>
              <p className='text-sm font-medium dark:text-[#dcebfab3]'>Students study here</p>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-6 pt-6">
            {
                feesDetails.allUnPaidStudent.length > 0  &&
              
            <div className="p-6 rounded-md border-[1px] border-[#252b32] bg-[#191E23]">
              <h4>Unpaid students</h4>
              <div className='w-full grid grid-cols-4 gap-4 mt-4 bg-[#272f35] p-2 border-b-[1px] text-[#9da2a7b3] border-b-[#374151]'>
                <div>Name</div>
                <div>Monthly Fee</div>
                <div>Guardian name</div>
                <div>Mobile number</div>
              </div>
              {
                feesDetails.allUnPaidStudent.map(student => (
                  <div key={student.id} className='w-full grid grid-cols-4 gap-4 bg-[#262e33] p-2 border-b-[1px] border-b-[#374151] text-[#dcebfab3]'>
                    <div><a className='hover:text-white' href={`/dashboard/students/${student.id}`}>{student.name}</a></div>
                    <div>{student.monthly_fee}</div>
                    <div>{student.guardian_name}</div>
                    <div>{student.mobile_number}</div>
                  </div>
                ))
              }
            </div>
          }
            {
                feesDetails.allPaidStudent.length > 0  &&
              
            <div className="p-6 rounded-md border-[1px] border-[#252b32] bg-[#191E23]">
              <h4>Paid students</h4>
              <div className='w-full grid grid-cols-4 gap-4 mt-4 bg-[#272f35] p-2 border-b-[1px] text-[#9da2a7b3] border-b-[#374151]'>
                <div>Name</div>
                <div>Monthly Fee</div>
                <div>Guardian name</div>
                <div>Mobile number</div>
              </div>
              {
                feesDetails.allPaidStudent.map(student => (
                  <div key={student.id} className='w-full grid grid-cols-4 gap-4 bg-[#262e33] p-2 border-b-[1px] border-b-[#374151] text-[#dcebfab3]'>
                    <div><a className='hover:text-white' href={`/dashboard/students/${student.id}`}>{student.name}</a></div>
                    <div>{student.monthly_fee}</div>
                    <div>{student.guardian_name}</div>
                    <div>{student.mobile_number}</div>
                  </div>
                ))
              }
            </div>
          }
          </div>
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

export default Fees