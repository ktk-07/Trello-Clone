import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
// import { useState } from "react/cjs/react.development";

function Navbar(){
    // getting position of the navbar oncce its not zero the background should be compeltely white
    // try to transition the background
    let [ scrollYPos, setScrollYPos ] = useState(window.scrollY);
    // how much the window has been scrolled from the top position;


    useEffect(()=>{
        function toggleNavBar(){
            setScrollYPos(window.scrollY);
            let fpNavBar = document.getElementById("firstPageNavBar");
            if(scrollYPos < 50){
                fpNavBar.classList.remove("barColor");
            }else if(!fpNavBar.classList.contains("barColor") && scrollYPos>= 50){
                fpNavBar.classList.add("barColor");
            }
        }

        window.addEventListener("scroll",toggleNavBar);

        return ()=>{
            window.removeEventListener("scroll",toggleNavBar);
        }
    },[scrollYPos])

    return(<div id="firstPageNavBar" className="navbar">
        <h1 id="logo">Logo</h1>
        <div>
            <Link to="/login" className="norBtn" > Log In </Link>
            <Link to="/signup" className="blueBtn" > Sign Up </Link>
        </div>
    </div>)
}

export default Navbar;