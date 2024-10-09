import { GoogleLogin, googleLogout } from 'react-google-login';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css';


const clientId = "913528233277-erdag2nqhs9l5mnmn2lh7nae6lnblefp.apps.googleusercontent.com";

function Login() {
    const navigate = useNavigate();
    const mySuccess = async (tokenResponse) => {
        console.log("<<<<<<<<<<<decodedToken>>>>>>>>>>>", tokenResponse)
        const access_token = tokenResponse.access_token;
        console.log(access_token)

        const profileResponse = await fetch(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
        const profileData = await profileResponse.json();
        console.log('User Profile:', profileData);

        // Store the token in local storage or a cooke
        localStorage.setItem('googleToken', tokenResponse.access_token);
        // Redirect to a protected route
        navigate('/'); // Example route
    }

    const myError = (error) => {
        console.log('Login Failed: ', error)
    }

    const login = useGoogleLogin({
        onSuccess: mySuccess,
        onError: myError,
    });

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('googleToken');
        navigate('/');
    };

    return (
        <div >
            <button className={classes.googleButton} onClick={() => login()}>
            <span className={classes.googleIcon}> </span> 
            <span className={classes.buttonText}>Sign in with Google</span>
        </button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}


export default Login;

