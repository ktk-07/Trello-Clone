import { ItemContent } from "./ItemContent";
import { EditableModalContent } from "./EditableModalContent";
import { useState } from "react";
import axios from "axios";

export const ItemModalContent = (props)=>{
    let [isHeaderInput, setHeaderInput] = useState(false);
    let [headerVal,setHeaderVal] = useState(props.content);

    const editModalContentHeader = async ()=>{
        let response = await axios.post("http://localhost:5000/api/workspace/modal/editCardTitle",{
            workspaceTitle:props.wsTitle,
            itemTitle:props.itemTitle,
            cardTitle:props.content,
            newCardTitle:headerVal,
            cardDescription:props.description
        },{withCredentials:true})
    }


    return(<div className="itemModalContentBox">
    <div className="ItemModalDetails">
        <div className="itemModalHeader">

            {isHeaderInput ? <textarea className="editModalInput" value={headerVal} onBlur={(event)=>{
                setHeaderInput(false);
                editModalContentHeader();
                props.onChange();
                }} 
                
                onChange={(event)=>{
                let target = event.target;
                setHeaderVal(target.value);

            }}></textarea>: <p onClick={(event)=>{
                setHeaderInput(true);
                setTimeout(()=>{
                    let modalInput = document.getElementsByClassName("editModalInput");
                    //modalInput.setSelectionRange(textareaInput.value-1,textareaInput.value-1);
                    for(let i = 0 ; i< modalInput.length ; i++){
                        modalInput[i].select();
                    }
                })
                }}>{headerVal}</p> }


            <button className="closeBtn" onClick={(event)=>{
                props.onChangeModalState(false);
                props.onChange();
            }}></button>
        </div>
        
        {/* I can basically use useEffect to get the content from the database, basically when mounting/unmounting the component */}
        <EditableModalContent WorkListItemIdx={props.WorkListItemIdx} idx={props.idx} wsTitle={props.wsTitle} itemTitle={props.itemTitle} onChange={props.onChange} details={props.description} entireData={props.entireData} content={props.content} onChangeModalState={props.onChangeModalState} />
        
    </div>
</div>)
}