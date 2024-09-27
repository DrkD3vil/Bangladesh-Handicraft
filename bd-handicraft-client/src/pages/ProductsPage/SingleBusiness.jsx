import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { MdAccessTimeFilled, MdOutlineWifiFind } from "react-icons/md";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SingleBusiness = () => {
    const { _id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", _id],
        queryFn: async () => {
            const response = await axiosPublic.get(`/products/${_id}`);
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    console.log(data);


    if (isLoading) return <div className='h-[500px] w-full flex justify-center items-center'>
        <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
            <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-500"></div>
        </div>
    </div>;
    if (isError) return <section className="w-full mx-auto">
        <MdOutlineWifiFind className='text-6xl text-gray-600 text-center w-full' />
        <h2 className="mt-2 text-lg font-medium text-center text-gray-800">No Data Found</h2>
    </section>;


    if (!data) return (
        <div className="grid h-screen place-content-center bg-white px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-gray-500">We can&apos;t find that page.</p>
                <a
                    href="/"
                    className="mt-6 inline-block rounded bg-orange-400 px-5 py-3 text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-20 lg:max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-auto">
                <figure className="p-5 lg:p-0"><img className="rounded-xl w-fit lg:w-[600px]" src={data.business_logo} alt="data Image" /></figure>
                <div className="mx-5">
                    <h3 className="text-xl lg:text-3xl font-semibold mb-3 dark:text-white text-black">About <span className="text-orange-500 uppercase">{data?.business_name}</span></h3>
                    <p className="lg:w-[550px] text-sm lg:text-lg text-justify dark:text-gray-300 text-gray-600">{data?.description}</p>
                    <div className="space-y-2 mt-10 inter-500">
                        <div className="flex gap-2 items-center">
                            <MdAccessTimeFilled className="text-orange-500 lg:text-xl text-3xl" />
                            <p className="w-[550px] text-base dark:text-gray-300 text-gray-600">{data?.years_of_operation} years</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <FaHeart className="text-orange-500 lg:text-xl text-3xl" />
                            <p className="w-[550px] text-base dark:text-gray-300 text-gray-600">{data?.likes} likes</p>
                        </div>
                        <div className="flex gap-2 items-center">
                            <FaLocationDot className="text-orange-500 lg:text-xl text-3xl" />
                            <p className="w-[550px] text-base dark:text-gray-300 text-gray-600">{data?.location}</p>

                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-5">
                        {
                            data?.featured_products?.map((tag, index) => (
                                <p key={index} className="bg-orange-50 dark:bg-orange-500 text-sm border border-orange-600 px-3 py-[1px] rounded-full dark:text-white text-black w-fit" href="#">{tag}</p>

                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBusiness;
