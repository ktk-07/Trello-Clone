import { LoginBox } from "../Components/LoginBox";
import Footer from "../Components/Footer";


export const LoginPage = ()=>{
    // im left with making the middle section move and fixing the first and last section


    return (<div id="loginPage">

    <div  className="fixedSection">
        <img href="" />
    </div>

    <div  className="moveSection">
        <LoginBox />
        <Footer />
    </div>

    <div  className="fixedSection">
        <img href="" />
    </div>


    </div>);
}