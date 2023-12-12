'use client'

import React, { useState } from 'react';

const Form = () => {
    const [csvData, setCsvData] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type === 'text/csv') {
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

            // Add the JSON object to the array
            jsonArray.push(jsonObject);
        }

        return jsonArray;
    };

    return (
        <div>
            <div className="h-screen font-sans text-gray-900 bg-gray-300 border-box">
                <div className="flex justify-center w-full mx-auto sm:max-w-lg">
                    <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
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

                        {csvData && (
                            <div className="mt-10">
                                <h3 className="text-xl font-semibold mb-2">CSV Data</h3>
                                <table className="w-full border">
                                    <thead>
                                        <tr>
                                            {Object.keys(csvData[0]).map((header, index) => (
                                                <th key={index} className="border p-2">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {csvData.map((row, index) => (
                                            <tr key={index}>
                                                {Object.values(row).map((value, index) => (
                                                    <td key={index} className="border p-2">
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
            </div>
        </div>
    );
};

export default Form;
