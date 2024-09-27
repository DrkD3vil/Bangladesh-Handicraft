import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaAngleLeft } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                toast.success('Login successful!');
                navigate(from, { replace: true });
                console.log(user);
            })
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="card shrink-0 w-[300px] lg:w-full lg:max-w-lg">
                <div className='flex gap-1 text-orange-400 my-5 items-center w-full hover:cursor-pointer'>
                    <FaAngleLeft />
                    <a href="/" className='hover:underline'>Back to Home</a>
                </div>
                <h1 className="text-2xl font-bold text-center dark:text-white text-gray-900">Login now!</h1>
                <form onSubmit={handleLogin} className="lg:space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-gray-900">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered bg-white dark:bg-gray-900" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-gray-900">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered bg-white dark:bg-gray-900" required />
                    </div>

                    <div className="flex w-full flex-col border-opacity-50">
                        <div className="form-control mt-6">
                            <input className="btn btn-primary text-white bg-orange-500 hover:bg-orange-600 border-0" type="submit" value="Login" />
                        </div>
                        <div className="divider text-sm normal-case">Or Login with</div>
                        <SocialLogin></SocialLogin>
                    </div>

                    <p className='mt-6 mx-auto text-sm dark:text-white text-gray-900'>Don&apos;t have an account? <Link to="/signup" className='hover:underline'>Create an account</Link></p>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default Login;