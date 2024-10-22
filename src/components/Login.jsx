import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const mySuccess = async (googleResponse) => {
        console.log(googleResponse);
        const googleToken = googleResponse.access_token;
        console.log(googleToken);
        const profileResponse = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${googleToken}`,
                }
            }
        );
        const profileData = await profileResponse.json();
        console.log(profileData);
        localStorage.setItem('google_token', googleToken);
        navigate('/');
    };
    const myError = (error) => {
        console.log(`Login Failed: ${error}`);
    }
    const login = useGoogleLogin({
            onSuccess: mySuccess,
            onError: myError
        });
    return (
        <div>
            <button className={classes.googleButton} onClick={login}>
                <span className={classes.googleIcon}></span>
                <span>Sign in with Google</span>
            </button>
        </div>
    )
}
export default Login;