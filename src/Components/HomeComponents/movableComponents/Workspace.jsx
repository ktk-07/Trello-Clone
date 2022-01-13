import { useNavigate } from "react-router-dom";


export const Workspace = (props)=>{
    const navigate = useNavigate();


    return <div className="workSpaceBtn contentSwitchTwo hoverSwitch" onClick={(event)=>{
        localStorage.setItem("currentWorkspace",`${props.title}`)
        let pageName = "/projectpage/"+ props.title
        navigate(pageName);
    }}>{props.title}</div>
}