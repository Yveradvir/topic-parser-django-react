import React, { useEffect, useState } from "react";
import { QueryI } from "./const";
import { LaunchedAxios } from "@modules/utils/api";

interface WikipediaData {
    name: string;
    description: string;
    link: string;
}

const WikipediaEl: React.FC<QueryI> = ({ query }) => {
    const [data, setData] = useState<WikipediaData>({ name: "", description: "", link: "" });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWikipediaData = async () => {
            try {
                const response = await LaunchedAxios.post(`/scanner/wikipedia/`, { query });
                setData(response.data);
                setError(null); 
            } catch (err) {
                console.error("Error fetching Wikipedia data:", err);
                setError("Failed to fetch Wikipedia data.");
            }
        };
        fetchWikipediaData();
    }, [query]);

    return (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow">
            {error && <p className="text-red-500">{error}</p>}
            {data.name && (
                <div>
                    <h2 className="text-xl font-bold">{data.name}</h2>
                    <p className="mt-2 text-gray-700">{data.description}...</p>
                    <a href={data.link} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-500 underline">
                        Read more on Wikipedia
                    </a>
                </div>
            )}
        </div>
    );
};

export default WikipediaEl;
