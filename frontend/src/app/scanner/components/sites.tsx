import React, { useEffect, useState } from "react";
import { QueryI, StandartResultI } from "./const";
import { LaunchedAxios } from "@modules/utils/api";

const SitesEl: React.FC<QueryI> = ({ query }) => {
    const [data, setData] = useState<StandartResultI[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const fetchSitesData = async () => {
            try {
                const response = await LaunchedAxios.post(`/scanner/sites/`, { query });
                setData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching sites data:", err);
                setError("Failed to fetch sites data.");
            }
        };
        fetchSitesData();
    }, [query]);

    return (
        <div className="mt-5 p-4 bg-gray-100 rounded-lg shadow">
            <button onClick={() => setVisible(!visible)} className="mb-2 bg-blue-500 text-white py-1 px-4 rounded-lg">
                {visible ? "Hide" : "Show"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {visible && (
                <>
                    {data && data.map((obj, id) => (
                        <div key={id} className="mt-5 p-4 bg-gray-200 rounded-lg shadow">
                            <h2 className="text-xl font-bold">{obj.name}</h2>
                            <p className="mt-2 text-gray-700">{obj.description}...</p>
                            <a href={obj.link} target="_blank" rel="noopener noreferrer" className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg inline-block">
                                Go to the site
                            </a>
                        </div>
                    ))}
                    <a href={`https://google.com/search?q=${query}`} target="_blank" rel="noopener noreferrer" className="mt-2 bg-blue-500 text-white py-1 px-4 rounded-lg inline-block">    
                        Go with this query
                    </a>
                </>
            )}
        </div>
    );
};

export default SitesEl;
