import React, { useEffect, useState } from "react";
import { FaReddit, FaGoogle } from "react-icons/fa";
import { QueryI, StandartResultI } from "./const";
import { LaunchedAxios } from "@modules/utils/api";

const RedditEl: React.FC<QueryI> = ({ query }) => {
    const [data, setData] = useState<StandartResultI>({
        name: "",
        description: "",
        link: "",
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRedditData = async () => {
            try {
                const response = await LaunchedAxios.post(`/scanner/reddit/`, { query });
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching Reddit data:", err);
                setError("Failed to fetch Reddit data.");
            }
        };
        fetchRedditData();
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
                        <FaReddit className="mr-2" /> Read more on Reddit
                    </a>
                </div>
            )}
            <a
                href={`https://google.com/search?q=${query}%20reddit`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg inline-flex items-center"
            >
                <FaGoogle className="mr-2" /> Search on Google
            </a>
        </div>
    );
};

export default RedditEl;
