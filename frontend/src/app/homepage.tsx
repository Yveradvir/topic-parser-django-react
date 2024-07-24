import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Layout from "@modules/components/layout";
import { LaunchedAxios } from "@modules/utils/api";

const HomePage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [username, setUsername] = useState<string | null>(null);
    const [totalItems, setTotalItems] = useState(0);
    const [historyData, setHistoryData] = useState<{ id: number; query: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await LaunchedAxios.get('/core/a/', {
                    params: { page: currentPage }
                });
                const data = response.data;

                setUsername(data.results.username);
                setTotalPages(data.results.total_pages);
                setTotalItems(data.results.total_items);
                setHistoryData(data.results.histories);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [currentPage]);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <Layout>
            {username && (
                <div className="p-6 max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900">Hello {username}</h1>
                    <div className="space-y-4">
                        {historyData.map((history) => (
                            <div key={history.id} className="p-4 bg-white border rounded shadow-sm">
                                <p className="text-gray-700">{history.query}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 mt-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={handlePrevious}
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="ml-2">Previous</span>
                            </button>
                            <button
                                onClick={handleNext}
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                <span className="mr-2">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{" "}
                                    <span className="font-medium">
                                        {(currentPage - 1) * 5 + 1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-medium">
                                        {Math.min(currentPage * 5, totalItems)}
                                    </span>{" "}
                                    of <span className="font-medium">{totalItems}</span>{" "}
                                    results
                                </p>
                            </div>
                            <div>
                                <nav
                                    aria-label="Pagination"
                                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                                >
                                    <button
                                        onClick={handlePrevious}
                                        className="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    {[...Array(totalPages).keys()].map((page) => (
                                        <button
                                            key={page + 1}
                                            onClick={() => setCurrentPage(page + 1)}
                                            aria-current={
                                                page + 1 === currentPage ? "page" : undefined
                                            }
                                            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                                                page + 1 === currentPage
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-gray-700"
                                            } ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0`}
                                        >
                                            {page + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={handleNext}
                                        className="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default HomePage;
