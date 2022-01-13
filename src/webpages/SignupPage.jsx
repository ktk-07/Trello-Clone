import { SignupBox } from "../Components/SignupBox";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";


export const SignupPage = ()=>{
    // im left with making the middle section move and fixing the first and last section
    let location = useLocation();
    let email;
    // this returns the location object;
    if(location.state === null){
        email = null;
    }else{
        email  = location.state.email;
    }
    

    return (<div className="structPage">

    <div  className="fixedSection">
        <img href="" alt="randomImg" />
    </div>

    <div  className="moveSection">
        <SignupBox email={email} />
        <Footer />
    </div>

    <div  className="fixedSection">
        <img href="" alt="randomImg" />
    </div>


    </div>);
}