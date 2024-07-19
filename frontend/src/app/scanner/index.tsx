import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@modules/components/layout";

const Scanner = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const queryValue = formData.get("q") as string;
        navigate(`/scanner?q=${queryValue}`);
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="w-full p-12 space-y-4">
                <div className="flex items-center space-x-4">
                    <input
                        id="q"
                        name="q"
                        type="text"
                        placeholder="Enter your query"
                        className="flex-grow p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        Submit
                    </button>
                </div>
                {query && (
                    <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow">
                        Элемент для наличия параметра q
                    </div>
                )}
            </form>
        </Layout>
    );
};

export default Scanner;
