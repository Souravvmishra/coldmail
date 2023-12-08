'use client'


import React, { useState } from 'react'

const Form = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        message: '',
        service: ''
    })

    const inputHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data);
        fetch('/api/sendMail', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>

            <h1 className='text-5xl py-4 font-bold font-sans text-center italic'>Codestam Technologies</h1>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px]">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Full Name
                            </label>
                            <input
                                required
                                onChange={inputHandler}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Full Name Of Receiver"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Email Address
                            </label>
                            <input
                                required
                                onChange={inputHandler}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email Of Receiver"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="service"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Service To Offer
                            </label>
                            <input
                                required
                                onChange={inputHandler}
                                type="text"
                                name="service"
                                id="service"
                                placeholder="Service To Offer "
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="message"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                Message
                            </label>
                            <textarea
                                onChange={inputHandler}
                                rows="4"
                                name="message"
                                id="message"
                                placeholder="Details About Him"
                                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Form
