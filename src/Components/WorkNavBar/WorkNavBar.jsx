import react,{useState} from "react";
import reactDOM from "react-dom";
import WorkAccordionHeader from "./WorkAccordionHeader";
import { WorkAccordion } from "./WorkAccordion";


export const WorkNavBar = (props)=>{
    const listOfAccNames = ["Workspaces", "Recent", "Starred", "Template", "Create"];
    const listOfUtilityBtn = ["InfoIcon","Bell","PFP"];

    let [accToggleState,setToggleState] = useState({
        accdName:"",
        toggleState:false
    });

    return(<div id="workNavBar">

        <div id="barOne" className="utilitySection">
            <div>UtilityBtn</div>
            <h1>Logo</h1>
            {/* Toggling a className then adds the before and after pseudo class */}
            {/* Nvm Using pseudo element is a bad idea you need to add clickble content thats why */}
            {/* Should probably change the key too */}

            {listOfAccNames.map((val,index)=>{
                return  <div key={index} className={val === "Create" ? "diffWorkBtn" : "normWorkBtn"}  > <WorkAccordion bar="1" name={val} targetItem={accToggleState} setToggle={setToggleState}/>  </div>
            })}

        </div>

        <div id="barTwo" className="utilitySection">
            <input type="text" placeholder="Search"  />

            {/* Can remove the padding here for the buttons */}
            {listOfUtilityBtn.map((val,index)=>{
                return  <div key={index} className={val === "Create" ? "diffWorkBtn" : "normWorkBtn"}  > <WorkAccordion bar="2" name={val} targetItem={accToggleState} setToggle={setToggleState}/>  </div>
            })}

        </div>


    </div>);
}