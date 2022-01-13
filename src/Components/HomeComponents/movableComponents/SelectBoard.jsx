import React from "react";
import reactDOM from "react-dom";

function SelectBoard(){
    return(<div className="HomeMovableSection" >
        <div>
            <div>Most Popular Template</div>
        </div>

        <div>
            <div>Starred Boards</div>
        </div>

        <div>
            <div>Recently Viewed</div>
        </div>

        <div>
            <div>Your own Workspaces</div>
        </div>

        <div>
            <div>Guest Workspaces</div>
        </div>
    </div>)
}


export {SelectBoard};