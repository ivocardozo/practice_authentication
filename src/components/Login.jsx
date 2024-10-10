import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const mySuccess = async (tokenResponse) => {
        console.log(tokenResponse);
        const access_token = tokenResponse.access_token;
        console.log(access_token);

        const profileResponse = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            }
        );
        const profileData = await profileResponse.json();
        console.log('User Profile: ', profileData);

        //Store the token in local storage or a cookie
        localStorage.setItem('googleToken', tokenResponse.access_token);
        //Redirect to a protected route

        navigate('/'); // example route
    }

    const myError = (error) => {
        console.log('Login Failed: ', error)
    }

    const login = useGoogleLogin({
        onSuccess: mySuccess,
        onError: myError
    })

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('googleToken');
        navigate('/');
    };

    return (
        <div>
            <button className={classes.googleButton} onClick={() => login}>
                <span className={classes.googleIcon}></span>
                <span className={classes.buttonText}>Sign in with Google</span>
            </button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Login;