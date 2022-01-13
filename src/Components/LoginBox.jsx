import { OauthBox } from "./OauthBox";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginBox = ()=>{
    let [emailInput,setEmail] = useState("");
    let [passwordInput,setPassword] = useState("");
    let navigate = useNavigate();

    // okay one problem is that i can use my api server to redirect my client app because or CORS issues so idk how to solve that.
    const loginUser = async (url,user)=>{
        let response = await axios.post(url,user,{withCredentials:true});
        return response.data;
    }

    useEffect(()=>{
        
    },[]);


    return (<div className="loginBox">
    <h1 className="logoLogin">Logo</h1>
    <div className="signupBox">
        <h2>Input Credentials to Log in</h2>
        <div className="formBox">
            <form className="formContentBox" action="http://localhost:5000/api/login" method="post" onSubmit={(event)=>{
                event.preventDefault();
                // so apparently passport will automatically look for username and password in the post request.
                let responseData;
                const getReponse = async (url,user)=>{
                    let data = await loginUser(url,user);
                    responseData = data;
                    setEmail("");
                    setPassword("");
                    if(data.userAuth){
                        console.log("Authenticated");
                        navigate("/home")
                    }else{
                        console.log("Fake user or Wrong password")
                        navigate("/login");
                    }
                }



                getReponse("http://localhost:5000/api/login",{
                    username:emailInput,
                    password:passwordInput 
                })


            }}>
                <input type="email" placeholder="  Enter Email" name="userEmail" value={emailInput} onChange={(event)=>{
                    let target = event.target;
                    setEmail(target.value);
                }} />
                <input type="password" placeholder="  Password" name="userPassword" value={passwordInput} onChange={(event)=>{
                    let target = event.target;
                    setPassword(target.value);
                }} />
                <p>Terms & Conditions</p>
                <button className="continueBtn" >Log in</button>
            </form>
        </div>
        <OauthBox />
        {/* <div className="textLogin">
            <a href="/login">Already have an account? Log in</a>
        </div> */}
    </div>

    <div className="languagesBox" >
        Languages
    </div>

    </div>)
}