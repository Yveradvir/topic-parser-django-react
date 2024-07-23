import React, { useEffect, useState } from "react";
import { FaTwitter, FaGoogle } from "react-icons/fa";
import { QueryI, StandartResultI } from "./const";
import { LaunchedAxios } from "@modules/utils/api";

const TwitterEl: React.FC<QueryI> = ({ query }) => {
    const [data, setData] = useState<StandartResultI>({
        name: "",
        description: "",
        link: "",
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTwitterData = async () => {
            try {
                const response = await LaunchedAxios.post(`/scanner/twitter/`, { query });
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching Twitter data:", err);
                setError("Failed to fetch Twitter data.");
            }
        };
        fetchTwitterData();
    }, [query]);

    return (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow">
            {error && <p className="text-red-500">{error}</p>}
            {data.name && (
                <div>
                    <h2 className="text-xl font-bold">{data.name}</h2>
                    <p className="mt-2 text-gray-700">{data.description}...</p>
                    <a
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-500 underline flex items-center"
                    >
                        <FaTwitter className="mr-2" /> Read more on Twitter
                    </a>
                </div>
            )}
            <a
                href={`https://google.com/search?q=${query}%20twitter`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg inline-flex items-center"
            >
                <FaGoogle className="mr-2" /> Search on Google
            </a>
        </div>
    );
};

export default TwitterEl;
