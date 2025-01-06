"use client"
import { StudentDisplay } from '@/models/student';
import React, { ChangeEvent, FormEvent, useState } from 'react'

interface FormData {
    student_name: string;
    student_age: string;
    father_name: string;
    date_of_birth: string;
    village: string;
    post_office: string;
    police_station: string;
    district: string;
    village1: string;
    post_office1: string;
    police_station1: string;
    district1: string;
    guardian_name: string;
    mobile_number: string;
    monthly_fee: string;
    class: string;
    gender: string;
  }

const Registration = () => {
    const [formData, setFormData] = useState<FormData>({
        student_name: '',
        student_age: '',
        father_name: '',
        date_of_birth: '',
        village: '',
        post_office: '',
        police_station: '',
        district: '',
        village1: '',
        post_office1: '',
        police_station1: '',
        district1: '',
        guardian_name: '',
        mobile_number: '',
        monthly_fee: '',
        class: '',
        gender: 'Male',
    });
    const [errors, setErrors] = useState<string[]>([])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
    };


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, gender: e.target.value }))
    }

    

    
      // Handle form submission
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: formData.student_name,
            age: formData.student_age,
            dateOfBirth: formData.date_of_birth,
            fatherName: formData.father_name,
            permanentAddress: {
                village: formData.village,
                postOffice: formData.post_office,
                policeStation: formData.police_station,
                zilla: formData.district
            },
            currentAddress: {
                village: formData.village1,
                postOffice: formData.post_office1,
                policeStation: formData.police_station1,
                zilla: formData.district1
            },
            guardianName: formData.guardian_name,
            gender: formData.gender,
            mobileNumber: formData.mobile_number,
            monthlyFee: formData.monthly_fee,
            class: formData.class
        }),
      });

      const data: StudentDisplay | { errors: string[] } = await response.json();
      

      if (response.status === 400) {
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
        setErrors(data.errors)
      }

      if (response.ok) {
        // Successfully submitted the form
        setErrors([]);
        alert('Student registered successfully.')
        // Optionally, reset the form
        setFormData({
          student_name: '',
          student_age: '',
          father_name: '',
          date_of_birth: '',
          village: '',
          post_office: '',
          police_station: '',
          district: '',
          village1: '',
          post_office1: '',
          police_station1: '',
          district1: '',
          guardian_name: '',
          mobile_number: '',
          monthly_fee: '',
          class: '',
          gender: 'Male',
        });
      } else {

      }
    } catch (error) {
        //@ts-expect-error Reason: TypeScript incorrectly infers type due to library type mismatch
      setErrors(error.errors)
    }
  };



    return (
        <div className='w-full pl-64'>
            <h1 className='p-4 text-3xl'>Student registration</h1>
            <div className='w-full flex flex-row'>
                <form className='p-10 w-7/12' onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                        <label
                            htmlFor="student_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Student name
                        </label>
                        <input
                            type="text"
                            id="student_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Name"
                            value={formData.student_name}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="student_age"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Student age
                        </label>
                        <input
                            type="number"
                            id="student_age"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            min={5}
                            step={1}
                            max={25}
                            placeholder='Age'
                            value={formData.student_age}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="father_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Father name
                        </label>
                        <input
                            type="text"
                            id="father_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Father name"
                            value={formData.father_name}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="date_of_birth"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Date of birth
                        </label>
                        <input
                            type="date"
                            id="date_of_birth"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="date of birth"
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Permanent Address:</label>
                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Village</label>
                            <input
                            type="text"
                            id="village"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Village"
                            value={formData.village}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post office</label>
                            <input
                            type="text"
                            id="post_office"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Post office"
                            value={formData.post_office}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Police station</label>
                            <input
                            type="text"
                            id="police_station"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="PS"
                            value={formData.police_station}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District</label>
                            <input
                            type="text"
                            id="district"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="District"
                            value={formData.district}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                    </div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Address:</label>
                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Village</label>
                            <input
                            type="text"
                            id="village1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Village"
                            value={formData.village1}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post office</label>
                            <input
                            type="text"
                            id="post_office1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Post office"
                            value={formData.post_office1}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Police station</label>
                            <input
                            type="text"
                            id="police_station1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="PS"
                            value={formData.police_station1}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">District</label>
                            <input
                            type="text"
                            id="district1"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="District"
                            value={formData.district1}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                    </div>
                    
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                        <label
                            htmlFor="guardian_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Guardian name
                        </label>
                        <input
                            type="text"
                            id="guardian_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Name"
                            value={formData.guardian_name}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="mobile_number"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Mobile number
                        </label>
                        <input
                            type="text"
                            id="mobile_number"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder='Mobile number'
                            value={formData.mobile_number}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="monthly_fee"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Monthly fee
                        </label>
                        <input
                            type="number"
                            id="monthly_fee"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            min={0}
                            step={100}
                            placeholder='Monthly fee'
                            value={formData.monthly_fee}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div>
                        <label
                            htmlFor="class"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Class
                        </label>
                        <input
                            type="text"
                            id="class"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Class"
                            value={formData.class}
                            onChange={handleInputChange}
                            
                        />
                        </div>
                    </div>


                    <div className="flex flex-col items-start mb-6">
                        <label
                            htmlFor="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select student gender
                        </label>
                        <select
                            id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleSelectChange}
                            
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
                <div className='p-8'>
                    {
                        errors.length > 0 &&
                        <ul className='list-disc text-red-400'>
                            {
                                errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                )  )
                            }
                        </ul>
                    }
                </div>
            </div>

        </div>
    )
}

export default Registration