import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {

    const { googleSignIn, githubSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }

    const handleGitHubSignIn = () => {
        githubSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    });
            })
            .catch(error => console.log(error));
    };
    return (
        <div className="flex flex-col gap-2">
            <button onClick={handleGoogleSignIn} className="btn btn-primary border-0 hover:bg-red-600 bg-red-500 w-full text-white font-semibold">Google</button>
            <button onClick={handleGitHubSignIn} className="btn btn-primary border-0 hover:bg-slate-900 bg-slate-800 dark:bg-gray-300 hover:dark:bg-white w-full text-white dark:text-black font-semibold">Github</button>
        </div>
    );
};

export default SocialLogin;