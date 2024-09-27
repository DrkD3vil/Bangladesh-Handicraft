import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
    return (
        <section id="bannerBG" className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="w-full text-center mx-auto">
                    <h1 className="block font-semibold lg:font-bold text-white text-xl lg:text-4xl lg:uppercase">
                        Welcome to<span className="text-xl font-bold lg:text-4xl text-orange-500"> Bangladeshi Handicrafts</span><br />
                        
                    </h1>
                    <div className="flex gap-2 justify-center mt-5 lg:hidden">
                        <p className="dark:text-white text-sm px-2 py-1 rounded text-white bg-orange-500 hover:text-orange-500 transition-all ease-in-out"><Link to='/signup'>Register</Link></p>
                        <p className="dark:text-orange-600 text-sm px-2 py-1 rounded text-orange-600 bg-white hover:text-orange-500 transition-all ease-in-out"><Link to='/login'>Login</Link></p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;