import { useState } from "react";
import axios from "axios";

export const EditableModalContent = (props)=>{
    let description = props.entireData[props.WorkListItemIdx].cardItems[props.idx].description;
    description = props.details;
    let [isInput, setInputMode] = useState(false);
    let [extraDetails, setNewDetails] = useState(props.details);

    const editModalContentDescription = async ()=>{
        //let response = await axios.post("http://localhost:5000/api/workspace/modal/editCardDescription"
        let response = await axios.post("/api/workspace/modal/editCardDescription",{
            workspaceTitle:props.wsTitle,
            itemTitle:props.itemTitle,
            cardTitle:props.content,
            newCardDescription:extraDetails
        },{withCredentials:true})
        return response.data;
    }

    return (<div className="EditableModalContent">
        { isInput? <textarea id="editTextArea" value={extraDetails} 
            onBlur={(event)=>{
                setNewDetails(event.target.value);
                setInputMode(false);
                editModalContentDescription();
                props.onChange();
            }} 
            onChange={(event)=>{
            let target = event.target;
            setNewDetails(event.target.value);
            }}> 
            </textarea> : <p onClick={(event)=>{
            // let target = event.target;
            // target.textContent = extraDetails;
            setInputMode(true);
            setTimeout(()=>{
                let textareaInput = document.getElementById("editTextArea");
                textareaInput.select();
            })
            }}> {extraDetails.length > 0 ? extraDetails : "Input whatever extra details this Modal Content" }</p> }
    </div>)
}
