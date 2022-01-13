import react from "react";
import reactDOM from "react-dom";
import Navbar from "../Components/NavBar";
import FirstpageContent from "../Components/FirstpageContent";
import Footer from "../Components/Footer";

function FirstPage(){
    return(<div id="firstpage">
     <Navbar />
     <FirstpageContent />
     <Footer />
    </div>);
}

export default FirstPage;