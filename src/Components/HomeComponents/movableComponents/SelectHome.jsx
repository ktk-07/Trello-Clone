import react from "react";
import reactDOM from "react-dom";

function SelectHome(){
    return(<div className="HomeMovableSection" >
        <div>
        HELLOO
        </div>

        <div>
            <ul>
                Starred
            </ul>

            <ul>
                Recently Viewed

            </ul>

            <ul>
                Link
                <li><a><span>+</span><span>Create a board</span></a></li>
            </ul>
        </div>
    </div>)

}

export {SelectHome};