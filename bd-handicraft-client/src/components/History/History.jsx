import { useQuery } from "@tanstack/react-query";
import { MdOutlineWifiFind } from "react-icons/md";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const History = () => {
    const axiosPublic = useAxiosPublic();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["history"],
        queryFn: async () => {
            const response = await axiosPublic.get("/history");
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    if (isLoading) return (
        <div className='h-[500px] w-full flex justify-center items-center'>
            <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
            </div>
        </div>
    );

    if (isError) return (
        <section className="w-full mx-auto">
            <MdOutlineWifiFind className='text-6xl dark:text-white text-gray-600 text-center w-full' />
            <h2 className="mt-2 text-lg font-medium text-center dark:text-white text-gray-800">No Data Found</h2>
        </section>
    );

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h3 className="text-2xl lg:text-3xl font-bold inter-600 text-center dark:text-white text-gray-800 mb-5">
                History of <span className="text-orange-500">Handicrafts in Bangladesh</span>
            </h3>

            {
                data.map((item, index) => (
                    <div key={index}>
                        <h1 className="text-base lg:text-xl dark:text-white text-gray-500 text-center mb-4">{item?.title}</h1>

                        {/* Pre-Independence Era */}
                        <h2 className="text-lg lg:text-xl font-semibold mb-2 text-orange-500">Pre-Independence Era</h2>
                        <p className="mb-4 dark:text-white text-gray-700">
                            <strong className="dark:text-white text-gray-700">British Colonial Influence:</strong> {item?.pre_independence_era?.british_colonial_influence}
                        </p>
                        <p className="mb-4 dark:text-white text-gray-700">
                            <strong className="dark:text-white text-gray-700">Rural Industries:</strong> {item?.pre_independence_era?.rural_industries}
                        </p>

                        {/* Post-Independence Era */}
                        <h2 className="text-lg lg:text-xl font-semibold mb-2 text-orange-500">Post-Independence Era</h2>
                        <p className="mb-4 dark:text-white text-gray-700">
                            <strong className="dark:text-white text-gray-700">Government Support:</strong> {item?.post_independence_era?.government_support}
                        </p>
                        <p className="mb-4 dark:text-white text-gray-700">
                            <strong className="dark:text-white text-gray-700">Global Market:</strong> {item?.post_independence_era?.global_market}
                        </p>
                        <p className="mb-4 dark:text-white text-gray-700">
                            <strong className="dark:text-white text-gray-700">Challenges and Opportunities:</strong> {item?.post_independence_era?.challenges_and_opportunities}
                        </p>
                        <h2 className="text-lg lg:text-xl font-semibold mb-4 text-orange-500">Key Handicrafts of Bangladesh</h2>
                        <ul className="list-disc ml-6">
                            {
                                Object.keys(item?.key_handicrafts).map((handicraftKey, index) => (
                                    <li key={index} className="dark:text-white text-gray-700">
                                        <strong>{handicraftKey.charAt(0).toUpperCase() + handicraftKey.slice(1)}:</strong> {item?.key_handicrafts[handicraftKey]}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }

        </div>
    );
};

export default History;
