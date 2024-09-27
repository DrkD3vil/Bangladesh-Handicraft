import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';

const Profile = () => {
    const { user, setUser, updateUserProfile, logOut } = useContext(AuthContext);
    const { register, handleSubmit, setValue } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            // Set default values to the form fields
            setValue('displayName', user.displayName || '');
            setValue('photoURL', user.photoURL || '');
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const updatedData = {
                displayName: data.displayName,
                photoURL: data.photoURL || user.photoURL,
            };

            // Update the user profile in Firebase first
            await updateUserProfile(data.displayName, data.photoURL);

            // Update user profile in the backend
            const response = await axiosSecure.patch(`/users/${user.email}`, updatedData);

            if (response.data.success || response.status === 200) {
                // Refetch updated user profile data from the backend
                const updatedUser = await axiosSecure.get(`/users/${user.email}`);
                setUser(updatedUser.data); // Update the user in AuthContext
                toast.success('profile updated successfully!');
            } else {
                console.error('Backend reported failure:', response.data);
                throw new Error('Backend reported failure');
            }
        } catch (error) {
            console.error("Error while updating:", error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="min-h-screen max-w-3xl flex flex-col justify-center mx-auto">
            <Helmet>
                <title>Bangladeshi Handcrafts | Profile</title>
            </Helmet>
            <div className='bg-white dark:bg-gray-900 border dark:border-gray-800 p-5 rounded-lg'>
                <h2 className="text-2xl font-bold mb-5 text-black dark:text-white">Profile Information</h2>
                <div>
                    <div className='flex items-center gap-5 mb-5 border dark:border-gray-800 rounded-lg p-5'>
                        <figure className='w-1/3'>
                            <img
                                className='rounded-full w-[150px] h-[150px] object-cover'
                                src={user?.photoURL || "/avatar.jpg"}
                                alt="Profile"
                            />
                        </figure>
                        <div className='justify-between w-full space-y-5'>
                            <p className='text-lg dark:text-white text-gray-700'>{user?.displayName || 'N/A'}</p>
                            <button onClick={handleLogOut} className="btn btn-sm bg-red-500 text-white hover:bg-red-600 border-0 text-xs font-bold">Log Out</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Display Name Input */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-black dark:text-white">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Display Name"
                                {...register("displayName", { required: true })}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white bg-white dark:bg-gray-900"
                            />
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text text-black dark:text-white">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Photo URL"
                                {...register("photoURL")}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white bg-white dark:bg-gray-900"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md dark:text-black text-white bg-orange-400 shadow-sm hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </div>
    );
};

export default Profile;
