import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import Layout from "@modules/components/layout";
import { Link } from "react-router-dom";

export default function Index() {
    return (
        <Layout>
            <div className="pt-28 pl-12">
                <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                    <div className="sm:max-w-lg">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Discover the Power of Data Parsing
                        </h1>
                        <p className="mt-4 text-xl text-gray-500">
                            Dive into our latest collection of tools and techniques to parse and analyze information from various sources effortlessly.
                        </p>
                    </div>
                    <div className="flex space-x-4 mt-10">
                        <Link to="/a/signup">
                            <button className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">
                                Create new account
                            </button>
                        </Link>
                        <Link to="/scanner">
                            <button className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">
                                <MagnifyingGlassCircleIcon className="h-6 w-6 mr-2" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
