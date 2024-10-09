import { GoogleLogin, googleLogout } from 'react-google-login';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
import {jwtDecode} from 'jwt-decode'; 
import classes from './Login.module.css';

// ... rest of your Login.jsx code



const clientId = "913528233277-erdag2nqhs9l5mnmn2lh7nae6lnblefp.apps.googleusercontent.com";

function Login() {
    const navigate = useNavigate();
    const mySuccess = async (tokenResponse) => {
        console.log("<<<<<<<<<<<decodedToken>>>>>>>>>>>", tokenResponse)
        // console.log(tokenResponse);
        // const decodedToken = await jwtDecode(tokenResponse.access_token);
        const access_token = tokenResponse.access_token;
        console.log(access_token)


        //////////////////////////////////////////
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
        //////////////////////////////////////////
        
        // Store the token in local storage or a cooke
        localStorage.setItem('googleToken', tokenResponse.access_token);
        // Redirect to a protected route
        navigate('/'); // Example route
    }

    const myError = (error) => {
        console.log('Login Failed: ', error)
    }

    const login = useGoogleLogin({
        onSuccess: mySuccess
        // async (tokenResponse) => {
        //     console.log("<<<<<<<<<<<decodedToken>>>>>>>>>>>", tokenResponse)
        //     // console.log(tokenResponse);
        //     // const decodedToken = await jwtDecode(tokenResponse.access_token);
        //     const access_token = tokenResponse.access_token;
        //     console.log(access_token)


        //     //////////////////////////////////////////
        //     const profileResponse = await fetch(
        //         'https://www.googleapis.com/oauth2/v3/userinfo',
        //         {
        //           headers: {
        //             Authorization: `Bearer ${access_token}`,
        //           },
        //         }
        //       );
        //     const profileData = await profileResponse.json();
        //     console.log('User Profile:', profileData);
        //     //////////////////////////////////////////
            
        //     // Store the token in local storage or a cooke
        //     localStorage.setItem('googleToken', tokenResponse.access_token);
        //     // Redirect to a protected route
        //     navigate('/'); // Example route
        // }
        ,
        onError: myError
        ,
    });

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('googleToken');
        // Redirect to login or home page
        navigate('/');
    };

    return (
        <div >
            {/* <button onClick={() => login()}>Sign in with Google 🚀</button> */}
            <button className={classes.googleButton} onClick={() => login()}>
            <span className={classes.googleIcon}> </span> 
            <span className={classes.buttonText}>Sign in with Google</span>
        </button>

            <button onClick={handleLogout}>Logout</button>
            {/* <GoogleLogin 
              clientId={clientId}
              buttonText="Sign in with Google"
              onSuccess={() => mySuccess()}
              onFailure={myError}
              cookiePolicy={'single_host_origin'}
              className={classes.googleLoginButton}
            /> */}
        </div>
    );
}


export default Login;

