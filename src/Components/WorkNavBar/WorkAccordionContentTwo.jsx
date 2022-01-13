import axios from "axios"
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';
import { useGoogleLogout } from 'react-google-login'


export const WorkAccordionContentTwo = (props)=>{
    let navigate = useNavigate();
    
    // do some database calling to change the information inside the content i guess.
    const logOut = async ()=>{
        let response = await axios.get("http://localhost:5000/api/logout",{withCredentials:true})
        console.log(response.data);
        return response.data;
    }
    {/* For content inside here was can fetch from database and do cleanup using UseEffect */}
    {/* I mean obviously you can use Class and extend and use mounting and demounting to do sideEffects and cleanup */}

    return(             
        <div className="toggleContent toggle barTwo" >
        <h1 className="toggleContentHeader">{props.name}</h1>
            <div>Extra Information</div>
            <button className="logOutBtn" onClick={(event)=>{
                logOut();
                navigate("/");
            }}>LogOut</button>
    {/* <GoogleLogout
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={false}
    >
    </GoogleLogout> */}
</div>)
}