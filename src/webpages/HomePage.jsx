import { useEffect, useState } from "react";
import { WorkNavBar } from "../Components/WorkNavBar/WorkNavBar";
import { HomeFixedSidebar } from "../Components/HomeComponents/HomeFixedSidebar";
import { HomeMovableSection } from "../Components/HomeComponents/HomeMovableSection";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const HomePage = ()=>{
    const [moveableSection , setMoveableSection] = useState("default");
    const [loading,setLoadingPage] = useState(false);
    const navigate = useNavigate();

    const userAuthenticated = async ()=>{
        let responseData = await axios.get("http://localhost:5000/api/auth",{withCredentials:true});
        console.log(responseData);
        return responseData.data;
    }

    useEffect(()=>{
        const loadPage = async ()=>{
            let response = await userAuthenticated();
            if(response.userAuth){
                setLoadingPage(response.userAuth);
            }else{
                navigate("/login");
                localStorage.setItem("authenticated","false");
                // setTimeout(()=>{
                //     if(!response.userAuth){
                //         navigate("/login");
                //     }
                // },10000)
            }
            // response.then((data)=>{
            //     console.log(data);
            //     setLoadingPage(data.userAuth);
            // });

            // Basically if page is loading for 10seconds or more it likely to be user not being authenticated thus redirecting you to login page

        }
        loadPage();
    },[]);

    return( loading ? <div id="homePage">
        <WorkNavBar />  
        <HomeFixedSidebar onChangeSelect={setMoveableSection} />
        <HomeMovableSection selectVal={moveableSection}/>
    </div> : <div id="loadingPage"> <h1>PAGE LOADING !!!</h1></div>
    )
}

