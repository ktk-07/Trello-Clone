import react from "react";
import reactDOM from "react-dom";

export const ProjectSidebar = (props)=>{
    return(<div id="projectSideBar">
        <div id="projectSidebarHeader">
            <h1>My WorkSpace</h1>
        </div>
        <div id="sideBarContentBox">
            <div>Your Boards <span>...</span></div>
            <div>
                {/* This part basically fetches data to see how many boards your have */}
                <div>First Project Workspace</div>
            </div>
        </div>
    </div>)
}