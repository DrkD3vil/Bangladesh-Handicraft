import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { FaAngleLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const SignUp = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');


    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.displayName, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            displayName: data.displayName,
                            email: data.email,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log("user added to the database");
                                    toast.success('Signup successful!');
                                    reset();
                                    navigate("/");
                                }
                            })

                    }).catch(error => console.log(error))
            })
            .catch(error => {
                // Check if the error is due to email already being registered
                if (error.code === "auth/email-already-in-use") {
                    setEmailError("This email is already registered. Please use a different email.");
                } else {
                    console.log(error.message);
                }
            });
    };

    return (
        <div className="lg:w-full h-screen flex flex-col justify-center items-center">
            <div className="card shrink-0 w-[300px] lg:w-full lg:max-w-lg">
                <div className='flex gap-1 text-orange-400 my-5 items-center w-full hover:cursor-pointer'>
                    <FaAngleLeft />
                    <a href="/" className='hover:underline'>Back to Home</a>
                </div>
                <h1 className="text-2xl font-bold text-center dark:text-white text-gray-900">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-gray-900">Name</span>
                        </label>
                        <input type="text" name="displayName" {...register("displayName", { required: true })} placeholder="Name" className="input input-bordered text-black dark:text-white bg-white dark:bg-gray-900" />
                        {errors.displayName && <span className="text-red-600 mt-1 text-xs">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-gray-900">Photo URL</span>
                        </label>
                        <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered text-black dark:text-white bg-white dark:bg-gray-900" />
                        {errors.photoURL && <span className="text-red-600 mt-1 text-xs">Photo URL is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-gray-900">Email</span>
                        </label>
                        <input type="email"  {...register("email", { required: true })} placeholder="email" className="input input-bordered text-black dark:text-white bg-white dark:bg-gray-900" />
                        {errors.email && <span className="text-red-600 mt-1 text-xs">Email is required</span>}
                        {/* Display email error message */}
                        {emailError && <span className="text-red-600 mt-1 text-xs">{emailError}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text dark:text-white text-gray-900">Password</span>
                        </label>
                        <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20 })} placeholder="password" className="input input-bordered text-black dark:text-white bg-white dark:bg-gray-900" required />
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary text-white bg-orange-500 hover:bg-orange-600 border-0" type="submit" value="Sign up" />
                    </div>
                    <div className="divider text-sm normal-case">Or Login with</div>
                    <SocialLogin></SocialLogin>
                    <p className='mt-6 mx-auto text-sm dark:text-white text-gray-900'><Link to="/login" className='hover:underline'>Already have an account? </Link></p>
                </form>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default SignUp;
