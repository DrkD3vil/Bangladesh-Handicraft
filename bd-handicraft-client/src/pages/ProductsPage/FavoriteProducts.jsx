import { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CardGrid from "../../components/Loading/CardGrid";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider"; // Assuming you have AuthContext to get user info

const FavoriteProducts = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user
    const axiosPublic = useAxiosPublic();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                // Get the favorite product IDs from local storage for the specific user
                const savedFavorites = localStorage.getItem(`favoriteProducts_${user?.email}`);
                const favoriteProductIds = savedFavorites ? JSON.parse(savedFavorites) : [];

                // If there are no favorites, don't make any API calls
                if (favoriteProductIds.length === 0) {
                    setFavoriteProducts([]);
                    setIsLoading(false);
                    return;
                }

                // Fetch details of all favorite products based on their IDs
                const promises = favoriteProductIds.map((id) => axiosPublic.get(`/products/${id}`));
                const responses = await Promise.all(promises);
                const productsData = responses.map((res) => res.data);

                // Update state with the fetched favorite products
                setFavoriteProducts(productsData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching favorite products:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, [axiosPublic, user?.email]);

    if (isLoading) {
        return (
            <div className="pt-10">
                <CardGrid></CardGrid>
            </div>
        );
    }

    if (isError) {
        return (
            <section className="w-full h-[500px] flex flex-col justify-center items-center mx-auto">
                <h2 className="mt-2 text-lg font-medium text-center text-gray-800">Error fetching favorite products.</h2>
            </section>
        );
    }

    if (favoriteProducts.length === 0) {
        return (
            <section className="w-full h-[500px] flex flex-col justify-center items-center mx-auto">
                <h2 className="mt-2 text-lg font-medium text-center dark:text-white text-gray-800">No favorite products found.</h2>
            </section>
        );
    }

    return (
        <div className="min-h-screen py-20 max-w-7xl mx-auto">
            <h3 className="z-10 text-2xl lg:text-3xl inter-600 mb-5 mx-auto max-w-3xl dark:text-white text-black text-center">
                Your <span className="text-orange-500">Favorite</span> Products
            </h3>
            <div className="lg:max-w-4xl xl:max-w-7xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5 mx-auto justify-center gap-5 xl:gap-10">
                {favoriteProducts.map((product, index) => (
                    <Link
                        to={`/products/${product?._id}`}
                        key={index}
                        className="flex mx-auto bg-white dark:bg-gray-900 rounded-xl border dark:border-1 dark:border-gray-800 hover:dark:border-orange-500 hover:shadow-lg overflow-hidden transition hover:cursor-pointer"
                    >
                        <div className="relative">
                            <article className="lg:w-[220px] h-full rounded-l-lg">
                                <img
                                    alt={product?.business_name}
                                    src={product?.business_logo}
                                    className="h-full w-full object-cover"
                                />
                            </article>
                            <div className="absolute top-3 left-3 flex gap-2 items-center">
                                <FaHeart className="text-red-500 text-xl" />
                                <p className="text-white inter-500">{product?.likes}</p>
                            </div>
                            <div className="absolute bottom-3 left-3 flex gap-2 items-center">
                                <p className="px-2 py-[2px] text-white text-xs bg-orange-500 border border-orange-500 rounded-lg">
                                    Qty: {product?.number_of_products}
                                </p>
                            </div>
                        </div>

                        <div className="px-4 py-3 w-[180px]">
                            <div className="h-[200px]">
                                <p className="uppercase tracking-wide text-lg text-orange-500 font-semibold">
                                    {product.business_name}
                                </p>
                                <p className="mt-1 text-sm leading-tight dark:text-white text-black">
                                    Operating for {product?.years_of_operation} Years
                                </p>
                                <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm line-clamp-4 lg:line-clamp-6">
                                    {product?.description}
                                </p>
                                <div className="mt-4"></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FavoriteProducts;
