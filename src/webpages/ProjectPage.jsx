import { WorkNavBar } from "../Components/WorkNavBar/WorkNavBar";
import { ProjectSidebar } from "../Components/ProjectPageComponents/ProjectSidebar";
import { WorkProjectBar } from "../Components/ProjectPageComponents/WorkProjectBar";
import { WorkListSection } from "../Components/ProjectPageComponents/WorkListSection";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const ProjectPage = ()=>{
    let navigate = useNavigate();
    const {wsTitle} = useParams();
    const userAuthenticated = async ()=>{
        const response = await axios.get("http://localhost:5000/api/auth",{withCredentials:true});
        return response.data;
    }

    useEffect(()=>{
        const loadpage = async ()=>{
            const response = await userAuthenticated();
            if(response.userAuth){
                console.log("authenticated");
                localStorage.setItem("authenticated","true");
            }else{
                navigate("/login");
                localStorage.setItem("authenticated","false");
            }
        }
        loadpage();
    },[])

    return(
    <div id="projectPage">
        <WorkNavBar />
        <WorkProjectBar wsTitle={wsTitle}/>
        <WorkListSection wsTitle={wsTitle} />
        {/* <ProjectSidebar /> */}
    </div>);
}