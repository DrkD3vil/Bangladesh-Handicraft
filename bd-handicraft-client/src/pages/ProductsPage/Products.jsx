import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { MdOutlineWifiFind } from "react-icons/md";
import { Link } from "react-router-dom";
import CardGrid from "../../components/Loading/CardGrid";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider"; // Assuming you have AuthContext to get user info

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext); // Get the logged-in user
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axiosPublic.get("/products");
            return response.data;
        },
        refetchOnWindowFocus: false,
    });

    // State to store favorite products for the current user
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem(`favoriteProducts_${user?.email}`);
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle adding/removing a product to/from favorites
    const toggleFavorite = (productId) => {
        let updatedFavorites;

        if (favorites.includes(productId)) {
            // Remove from favorites
            updatedFavorites = favorites.filter((id) => id !== productId);
        } else {
            // Add to favorites
            updatedFavorites = [...favorites, productId];
        }

        setFavorites(updatedFavorites);
        // Save favorites in local storage for the specific user
        localStorage.setItem(`favoriteProducts_${user?.email}`, JSON.stringify(updatedFavorites));
    };

    if (isLoading)
        return (
            <div className="pt-10">
                <CardGrid></CardGrid>
            </div>
        );

    if (isError)
        return (
            <section className="w-full h-[500px] flex flex-col justify-center items-center mx-auto">
                <MdOutlineWifiFind className="text-6xl text-gray-600 text-center w-full" />
                <h2 className="mt-2 text-lg font-medium text-center dark:text-white text-gray-800">No Data Found</h2>
            </section>
        );

    return (
        <div className="min-h-screen py-20 max-w-7xl mx-auto">
            <h3 className="z-10 text-2xl lg:text-3xl inter-600 lg:mb-5 mx-auto max-w-3xl dark:text-white text-black text-center">
                Business <span className="text-orange-500">Products</span>
            </h3>
            <div className="lg:max-w-4xl xl:max-w-7xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5 mx-auto justify-center gap-5 xl:gap-10">
                {data.map((product, index) => (
                    <Link
                        to={`/products/${product?._id}`}
                        key={index}
                        className="flex flex-col md:flex-row mx-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:shadow-orange-400/20 dark:hover:shadow-orange-500/40 transition-all duration-300 ease-in-out transform hover:scale-105 overflow-hidden cursor-pointer"
                    >
                        <div className="relative md:w-[220px] w-full">
                            <article className="h-full rounded-l-lg">
                                <img
                                    alt={product?.business_name}
                                    src={product?.business_logo}
                                    className="md:h-[250px] h-[230px] w-full object-cover rounded-t-xl md:rounded-t-none md:rounded-l-xl transition-opacity duration-300 hover:opacity-90"
                                />
                            </article>
                            <div className="absolute top-3 left-3 flex gap-2 items-center">
                                {/* Toggle between selected and unselected heart */}
                                {favorites.includes(product?._id) ? (
                                    <FaHeart
                                        className="text-red-500 text-xl cursor-pointer hover:scale-110 transition-transform"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleFavorite(product._id);
                                        }}
                                        aria-label="Remove from favorites"
                                    />
                                ) : (
                                    <FaRegHeart
                                        className="text-red-500 text-xl cursor-pointer hover:scale-110 transition-transform"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleFavorite(product._id);
                                        }}
                                        aria-label="Add to favorites"
                                    />
                                )}
                                <p className="text-white text-sm">{product?.likes}</p>
                            </div>
                            <div className="absolute bottom-3 left-3">
                                <p className="px-3 py-1 text-xs bg-orange-500 border border-orange-500 text-white rounded-lg shadow-lg">
                                    Qty: {product?.number_of_products}
                                </p>
                            </div>
                        </div>

                        <div className="px-6 py-4 w-full">
                            <div className="flex flex-col h-full">
                                <p className="uppercase tracking-wide text-lg text-orange-500 font-semibold mb-1">
                                    {product?.business_name}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Operating for {product?.years_of_operation} Years
                                </p>
                                <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm line-clamp-3 lg:line-clamp-5">
                                    {product?.description}
                                </p>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
};

export default Products;
