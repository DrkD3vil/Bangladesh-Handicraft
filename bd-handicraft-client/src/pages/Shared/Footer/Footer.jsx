import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="px-4 py-12 mx-auto max-w-7xl">
            <div className="flex lg:flex-row flex-col justify-between gap-10 mb-3 lg:gap-20">
                <div className="lg:w-1/3 space-y-5">
                    <div className="flex flex-col-reverse gap-5">
                        <a href="/" className="uppercase text-xl dark:text-white text-black">Bengali<span className="font-bold text-orange-500">Handcrafts</span></a>
                        <a href="/" title="" className="flex items-center">
                            <img className="w-20" src="/button.png" alt="" />
                        </a>
                    </div>

                    <p className="my-4 text-sm text-justify leading-normal dark:text-white text-gray-600">
                        Discover the exquisite beauty of Bangladesh&apos;s rich heritage through its handcrafted treasures. Our shop offers a curated collection of authentic Bangladeshi handicrafts, each piece a testament to the skill and creativity of local artisans.
                    </p>
                </div>

                <nav className="col-span-1 md:col-span-1 lg:col-span-2 dark:text-white text-gray-800">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Contact Details</p>
                    <a className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-orange-500" href="#">Bengali Handicrafts</a>
                    <a className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-orange-500" href="#"> bangladeshicrafts@gmail.com</a>
                    <a className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-orange-500" href="#">+880 1630294562</a>
                    <a className="flex mb-3 text-sm font-medium transition md:mb-2 hover:text-orange-500" href="#">Chittagong, Bangladesh</a>
                </nav>
                <nav className="col-span-1 md:col-span-1 lg:col-span-2">
                    <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">Social Links</p>

                    <div className="flex gap-5 dark:text-white text-gray-800">
                        <a className="flex mb-3 text-3xl transition md:mb-2 hover:text-orange-500" href="https://www.facebook.com/"><FaSquareFacebook /></a>
                        <a className="flex mb-3 text-3xl transition md:mb-2 hover:text-orange-500" href="https://www.instagram.com/"><FaInstagram /></a>
                        <a className="flex mb-3 text-3xl transition md:mb-2 hover:text-orange-500" href="https://www.linkedin.com/"><FaLinkedin />
                        </a>
                    </div>

                </nav>
            </div>
            <div className="pt-10 mt-10 border-t border-gray-100">
                <p className="mb-0 text-xs text-center dark:text-white text-gray-800">Copyright &copy; 2024 Bengali Handicrafts</p>
            </div>
        </footer>

    );
};

export default Footer;