
const LoadingCard = () => {
    return (
        <div className="flex flex-row m-8 rounded-md shadow-lg mx-auto w-80 animate-pulse">
            <div className="w-48 h-48 rounded-l bg-gray-400">
            </div>
            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8 bg-gray-200">
                <div className="w-full h-6 rounded bg-gray-300"></div>
                <div className="w-full h-4 rounded bg-gray-400"></div>
                <div className="w-3/4 h-4 rounded bg-gray-400"></div>
            </div>
        </div>
    );
};

export default LoadingCard;
