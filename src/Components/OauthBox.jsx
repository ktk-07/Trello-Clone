import axios from "axios";

import GoogleLogin from "react-google-login";

export const OauthBox = ()=>{
    const googleAuth = async()=>{
        let response = await axios.get("http://localhost:5000/auth/google",{withCredentials:true});
    }


    const responseGoogle = (response) => {
        console.log(response);
      }

    return(
    <div id="OauthBox">
            <a className="btn btn-block btn-social btn-google oAuthBtn" href="http://localhost:5000/auth/google" onClick={(event)=>{
                 console.log(process.env.GOOGLE_CLIENT_ID);
                event.preventDefault();
                // googleAuth();
            }} >
                <i className="fab fa-google">  </i> Sign in with Google
            </a>

            <GoogleLogin
          clientId="316844975065-3tncufo7ef1cpt3lh5scimf57t96cmhh.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          onClick={(event)=>{
              localStorage("googleSignIn","true")
          }}
        />

            <a className="btn btn-block btn-social btn-facebook oAuthBtnF" href="" >
                <i className="fab fa-facebook"></i> Sign in with Facebook
            </a>

            <a className="btn btn-block btn-social btn-twitter oAuthBtn" href="" >
                <i className="fab fa-twitter"></i>
                Sign in with Twitter
            </a>
    </div>);
}
