import React from 'react'

const Exam = () => {
    return (
        <div className='w-full pl-64'>
            <div className="w-full p-6 h-screen flex flex-col bg-[#101316] text-center justify-center items-center">
                            <svg
                className="w-32 h-32 text-gray-800 dark:text-blue-600"
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
                    d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                />
                </svg>
                <h2 className='text-2xl'>This feature coming soon</h2>
            </div>
        </div>
    )
}

export default Exam