'use client'

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Form = () => {
    const [csvData, setCsvData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const csvContent = e.target.result;
                // Convert CSV to JSON
                const jsonArray = csvToJson(csvContent);
                // Set the JSON data to state
                setCsvData(jsonArray);
            };

            reader.readAsText(file);
        } else {
            // Handle invalid file type
            alert('Please select a valid CSV file.');
        }
    };

    const csvToJson = (csv) => {
        // Split CSV content by lines
        csv = csv.replace(/\r/g, '')
        const lines = csv.split('\n');

        // Get headers (first line)
        const headers = lines[0].split(',');
        // Initialize an array to store the JSON objects
        const jsonArray = [];

        // Loop through the remaining lines
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');

            // Create a JSON object using headers and values
            const jsonObject = {};
            for (let j = 0; j < headers.length; j++) {
                jsonObject[headers[j]] = values[j];
            }
            jsonObject.mailSent = 'No'
            // Add the JSON object to the array
            jsonArray.push(jsonObject);
        }

        return jsonArray;
    };

    useEffect(() => {
        if (csvData) {
            console.log(csvData[0]);
        }
    }, [csvData])


    const sendAllMails = async () => {
        try {
            // Iterate through each row and send a request
            for (let i = 0; i < csvData.length; i++) {
                const rowData = csvData[i];
                const body = {
                    name: rowData.name,
                    email: rowData.email,
                    message: rowData.message,
                    service: rowData.service
                }
                console.log(body);

                setCsvData((prevCsvData) => {
                    const updatedData = [...prevCsvData];
                    updatedData[i].mailSent = '🔃';
                    return updatedData;
                });

                const response = await toast.promise(fetch('/api/sendMail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                }), {
                    loading: `Sending Mail to ${body.email}`,
                    success: `Mail Sent to ${body.email}`,
                    error: `Failed To Send Mail to ${body.email}`,
                }, {
                    style: {
                        border: '1px solid #713200',
                        padding: '16px',
                        color: '#713200',
                    }
                });

                if (response.ok) {
                    // If the response is successful, update the status in the table
                    setCsvData((prevCsvData) => {
                        const updatedData = [...prevCsvData];
                        updatedData[i].mailSent = '✔️';
                        return updatedData;
                    });
                } else {
                    // If there's an error, handle it accordingly
                    console.error('Failed to send mail for row', i);
                    setCsvData((prevCsvData) => {
                        const updatedData = [...prevCsvData];
                        updatedData[i].mailSent = '❌';
                        return updatedData;
                    });
                }
            }
        } catch (error) {
            console.error('Error sending mails:', error);
        }
    };

    return (
        <div className=''>
            <div className="h-screen container px-32 font-sans  border-box">
                <div className="flex justify-center w-full mx-auto sm:max-w-lg">
                    <div className="flex flex-col bg-white items-center justify-center w-full  my-20  sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                        <div className="mt-10 mb-10 text-center">
                            <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                            <p className="text-xs text-gray-500">File should be of format .csv</p>
                        </div>
                        <form
                            action="#"
                            className="relative w-4/5 h-32 max-w-xs mb-10 bg-gray-100 rounded-lg shadow-inner"
                        >
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept=".csv, application/vnd.ms-excel"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-upload"
                                className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                            >
                                <p className="z-10 text-xs font-light text-center text-gray-500">
                                    Drag & Drop your files here
                                </p>
                                <svg
                                    className="z-10 w-8 h-8 text-indigo-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"></path>
                                </svg>
                            </label>
                        </form>


                    </div>
                </div>

                {csvData && (
                    <div className="my-10">
                        <h3 className="text-xl font-semibold mb-2 inline-block">CSV Data</h3>
                        <div className="my-4 inline-block ml-12">
                            <button
                                onClick={sendAllMails}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Send All Mails
                            </button>
                        </div>
                        <table className="w-full border">
                            <thead>
                                <tr>
                                    {Object.keys(csvData[0]).map((header, index) => (
                                        <th key={index} className="border p-2">
                                            {header.toUpperCase()}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {csvData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, index) => (
                                            <td key={index} className="border p-2 text-center">
                                                {value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Form;
