import { Link } from "react-router-dom";
import { useState } from "react"

function FirstpageContent(){
    let [emailAddress, setEmail] = useState("")

    return(<div id="firstpageContent" >
        <div id="adCopyBox">
            <h1 id="adCopyHeader" >Yo Trustworthy Todo-list! Good Vibes only! Everything is Good when you use this application!</h1>
            <p id="adCopyMsg" >Lorem ipsum dolor sit amet,
             consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
             Eget gravida cum sociis natoque. Hac habitasse platea dictumst vestibulum.</p>
            <div id="emailBox">
                    <input type="email" placeholder="Enter Your Email" size="25" row="3" value={emailAddress} onChange={(event)=>{
                        let target = event.target;
                        setEmail(target.value);
                    }} />

                    <Link to="/signup" state={{email:emailAddress}}> 
                        <button className="blueBtn signUpBtn" >Signup- it's Free</button>
                    </Link>
    
            </div>
        </div>
        <img src="https://i.pinimg.com/736x/63/d0/ef/63d0efdd68e1cc35a5e75d9d1ed869d1.jpg" alt="home page"/>
    </div>);
}

export default FirstpageContent;