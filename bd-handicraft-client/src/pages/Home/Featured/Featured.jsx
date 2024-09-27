import { useQuery } from '@tanstack/react-query';
import { FaHeart } from "react-icons/fa6";
import { MdOutlineWifiFind } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const Featured = () => {
    const axiosPublic = useAxiosPublic();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosPublic.get("/products");
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

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

    // console.log(data);

    const displayedProduct = data && data.length > 4
        ? data.slice(0, 6)
        : data;

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    return (
        <div className="my-20">
            <h3 className="text-2xl lg:text-3xl font-bold inter-600 text-center mb-5 dark:text-white text-gray-700">Featured <span className="text-orange-500">Products</span></h3>
            <div className="max-w-5xl lg:max-w-7xl mx-auto p-5">
                {displayedProduct && displayedProduct.length > 0 ? (
                    <Slider {...settings}>
                        {displayedProduct.map((item, index) => (
                            <div key={index} className="p-3">
                                <article className="relative overflow-hidden rounded-lg hover:cursor-pointer">
                                    <img
                                        alt={item?.business_name}
                                        src={item?.business_logo}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="relative bg-gradient-to-t from-gray-900/80 to-gray-900/10 pt-32 sm:pt-48 lg:pt-60">
                                        <div className='absolute top-5 right-5 flex gap-2 items-center'>
                                            <FaHeart className='text-red-500 text-xl' />
                                            <p className='text-white inter-500'>{item?.likes}</p>
                                        </div>
                                        <div className="p-4 sm:p-6">
                                            <a href="#">
                                                <h3 className="mt-0.5 text-lg text-orange-500 inter-700">{item?.business_name}</h3>
                                            </a>
                                            <p className="text-sm text-white/95">Years of operation: {item?.years_of_operation}</p>

                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <section className="w-full h-screen p-5 mx-auto">
                        <MdOutlineWifiFind className='text-6xl dark:text-white text-gray-700 text-center w-full' />
                        <h2 className="mt-2 text-lg font-medium text-center dark:text-white text-gray-700">No Data Found</h2>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Featured;