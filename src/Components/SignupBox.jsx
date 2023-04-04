
import { useState, useEffect} from "react";
import axios from "axios";
import { OauthBox } from "./OauthBox";
import { useNavigate } from "react-router-dom";

export const SignupBox = (props)=>{
    let email = props.email;
    if(email == null){
        email = "";
    }
    let [emailInput,setEmail] = useState(email);
    let [passwordInput, setPassword] = useState("");
    let [dataBackend,setData] = useState([]);
    let [registeredClient , setApproveRedirect] = useState({
        approve:false,
        rejectReason:""
    });

    let navigate = useNavigate();

    const fetchData = async ()=>{
        try{
            //By using cors package i solved the cors issue
            //fetch("http://localhost:5000/api/signup") both fetch and axios give me Cross-origin resource sharing error.
            let response = await axios.get("http://localhost:5000/api/signup");
            // response.then((data)=>{
            //     setData((prevVal)=>{
            //         console.log(response);
            //         return [...prevVal,response];
            //     })
            // })
            return response
        }catch(err){
            console.log(err);
        }
    }

    const postData = async (url,data)=>{
        try{
            let response = await axios.post(url,data,{withCredentials:true});
            return response.data;
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        let user = async ()=>{
            let data = await fetchData();
            setData((prevVal)=>{
                return [...prevVal,data];
            });
        }
        user();
        //the babel compiler says that i need to add a cleanup function after demounting so i should probably do taht


        // is there a need for cleanup here? 
        // if there is multiple items in the array, and one of them is different the useEffect will be called and the data will be re-rendered.
    },[])


    return (<div className="loginBox">
    <h1 className="logoLogin">Logo</h1>
    <div className="signupBox">
        <h2>Sign up for you account</h2>
        <div className="formBox formBoxS">
            <form className="formContentBox" method="post" action="http://localhost:5000/api/signup" onSubmit={(event)=>{
                event.preventDefault();
                let data = postData("http://localhost:5000/api/signup",{
                    username:emailInput,
                    password:passwordInput
                });

                data.then((res)=>{
                    if(res.userRegistered){                
                        navigate("/home");
                        localStorage.setItem("username",res.username);
                        localStorage.setItem("authenticated","true");
                    }else{
                        alert("Fail to register because email exists");
                    }
                    setEmail("");
                    setPassword("");
                }).catch((err)=>{
                    console.log(err);
                    setEmail("");
                    setPassword("");
                })

                // keep the username in sessions/ local storage that way we can check if the user is register or anot 

                    // wow i thought i was suppose to use <Route path="/signup" element={<Navigate to="/login" />} </Route> to redirect to another page thats not the case;
                    // we need to use the useNavigate hook then navigate("to thte page",options);

                // by using app.use(express.json()) 
                //<Route path="/signup" element={<Navigate to="/login" />} ></Route>
                //(data.then((response)=>{console.log(response)}));
            }}>
                <input type="email" placeholder="  Enter Email" value={emailInput} name="newUserEmail" onChange={(event)=>{
                    let target = event.target;
                    setEmail(target.value);
                }} />
                <input type="password" placeholder="  Enter Password" value={passwordInput} name="newUserPassword" onChange={(event)=>{
                    let target = event.target;
                    setPassword(target.value);
                }} />

                <p>Terms & Conditions</p>

                <button className="continueBtn" > Continue </button>
            </form>
        </div>
        <OauthBox />
        <div className="textLogin">
            <a href="/login">Already have an account? Log in</a>
        </div>
    </div>

    <div className="languagesBox" >
        Languages
    </div>

    </div>)
}