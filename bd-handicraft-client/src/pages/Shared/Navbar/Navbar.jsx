import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { ThemeContext } from "../../../providers/ThemeProvider";

const Navbar = () => {

    const { user } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navOptions = <>
        <li>
            <NavLink
                to='/'
                className={({ isActive }) => isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500 text-base font-semibold"}>
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to='/products'
                className={({ isActive }) => isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500 text-base font-semibold"}>
                Products
            </NavLink>
        </li>
        <li>
            <NavLink
                to='/favorites'
                className={({ isActive }) => isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500 text-base font-semibold"}>
                Favorite Products
            </NavLink>
        </li>
        <li>
            <NavLink
                to='/blogs'
                className={({ isActive }) => isActive ? "text-orange-500 font-semibold" : "hover:text-orange-500 text-base font-semibold"}>
                Blog
            </NavLink>
        </li>
    </>

    return (
        <>
            <div className={`navbar fixed z-10 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} w-full lg:max-w-screen mx-auto lg:px-10`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <button tabIndex={0} className="btn btn-ghost dark:text-white text-black lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </button>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow dark:bg-gray-900 bg-white rounded w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a href="/" className="hidden lg:block uppercase lg:text-xl dark:text-white text-black">Bengali<span className="font-bold text-orange-500">Handcrafts</span></a>
                    <a href="/" className="block lg:hidden uppercase lg:text-xl dark:text-white text-black">Bengali<span className="font-bold text-orange-500">Handcrafts</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex gap-10 px-1 dark:text-white text-black transition-all ease-in-out">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end flex lg:gap-4">
                    {
                        user ?
                            <a href="/profile" className="flex gap-3 items-center">
                                <figure><img className="w-10 h-10 rounded-full object-cover" src={user?.photoURL || "/avatar.jpg"} alt="" /></figure>
                            </a> :
                            <div className="lg:flex gap-2 hidden">
                                <p className="dark:text-white text-black hover:text-orange-500 transition-all ease-in-out"><NavLink to='/signup'>Register</NavLink></p>
                                <div>|</div>
                                <p className="dark:text-white text-black hover:text-orange-500 transition-all ease-in-out"><NavLink to='/login'>Login</NavLink></p>
                            </div>
                    }

                    <input
                        onClick={toggleTheme} id="theme-toggle" type="checkbox"
                        className={`rounded-full toggle toggle-sm ${theme === 'dark' ? 'bg-orange-500' : 'bg-orange-500'}`} defaultChecked
                    />
                </div>
            </div>
        </>
    );
};

export default Navbar;
