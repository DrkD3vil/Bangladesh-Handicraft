import LoadingCard from './LoadingCard';

const CardGrid = () => {
    const cards = Array(6).fill(null);

    return (
        <div className="w-full lg:max-w-6xl grid grid-cols-1 lg:grid-cols-3 mt-10  place-content-center mx-auto">
            {cards.map((_, index) => (
                <LoadingCard key={index} />
            ))}
        </div>
    );
};

export default CardGrid;
