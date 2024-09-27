import { useQuery } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa6";
import { MdOutlineWifiFind } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CardGrid from "../Loading/CardGrid";


const BusinessPage = () => {
    const axiosPublic = useAxiosPublic();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosPublic.get("/products");
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    if (isLoading) return <CardGrid />;
    if (isError) return <section className="w-full mx-auto">
        <MdOutlineWifiFind className='text-6xl text-gray-600 text-center w-full' />
        <h2 className="mt-2 text-lg font-medium text-center text-gray-800">No Data Found</h2>
    </section>;

    // console.log(data);

    const displayedProduct = data && data.length > 4
        ? data.slice(0, 6)
        : data;

    return (
        <div className="my-20 bg-white dark:bg-gray-900">
            <h3 className="z-10 text-2xl lg:text-3xl inter-600 mb-5 mx-36 max-w-2xl dark:text-white text-black text-left">Business <span className="text-orange-500">Products</span></h3>
            <div className="lg:max-w-4xl xl:max-w-7xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5 mx-auto justify-center gap-5 xl:gap-10">
                {displayedProduct.map((product, index) => (
                    <Link to={`/products/${product?._id}`} key={index} className="flex mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-800 hover:shadow-xl hover:border-orange-400 transition transform hover:scale-105 overflow-hidden cursor-pointer">
                    <div className="relative">
                        <article className="lg:w-[220px] h-full rounded-l-lg">
                            <img
                                alt={product?.business_name}
                                src={product?.business_logo}
                                className="lg:h-[250px] h-[230px] lg:w-full w-[220px] object-cover rounded-tl-lg rounded-bl-lg transition-opacity hover:opacity-90"
                            />
                        </article>
                        <div className="absolute top-3 left-3 flex gap-2 items-center">
                            <FaHeart className="text-red-500 text-xl" />
                            <p className="text-white inter-500">{product?.likes}</p>
                        </div>
                        <div className="absolute bottom-3 left-3">
                            <p className="px-2 py-[2px] text-white text-xs bg-orange-500 border border-orange-500 rounded-lg">Qty: {product?.number_of_products}</p>
                        </div>
                    </div>
                    
                    <div className="px-5 py-4 w-[200px] flex flex-col justify-between">
                        <div className="mb-4">
                            <p className="uppercase tracking-wide lg:text-lg text-orange-500 font-semibold">{product.business_name}</p>
                            <p className="mt-1 lg:text-base leading-tight text-sm font-medium dark:text-white text-black">Operating for {product.years_of_operation} Years</p>
                            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm line-clamp-3 lg:line-clamp-5">{product?.description}</p>
                        </div>
                        <div className="flex items-center mt-auto">
                            <FaHeart className="text-red-500 text-xl" />
                            <p className="ml-2 text-white inter-500">{product?.likes}</p>
                            <p className="ml-auto px-2 py-1 text-white text-xs bg-orange-500 border border-orange-500 rounded-lg">Qty: {product?.number_of_products}</p>
                        </div>
                    </div>
                </Link>
                
                ))}

            </div>
        </div >

    );
};

export default BusinessPage;