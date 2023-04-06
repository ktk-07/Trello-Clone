import React, { useState } from "react";
import axios from "axios";


export const WorkListAddItem = (props)=>{
    let [editBtn,setEditBtn] = useState(false);
    const [inputVal , setInputVal] = useState("");

    const addItem = async ()=>{
        if(inputVal.length> 0){
            let response = await axios.post("/api/workspaces/additem",{workspaceTitle:props.wsTitle,itemTitle:inputVal,cardItems:[]},{withCredentials:true});
            console.log(response);
            setInputVal("");
            setEditBtn(false);
        }
        props.onChange();
    }

    return (<div id="addListBtn" onClick={(event)=>{
        if(!editBtn){
            setEditBtn(true);
        }
    }}> 
    {!editBtn ? "+Add Another Item" : <div className="editBox"> <textarea type="text" value={inputVal} onChange={(event)=>{
        let target = event.target
        setInputVal(target.value);
    }}> </textarea> 

    <div>
        <button className="closeBtn" onClick={(event)=>{setEditBtn(false)}} ></button> 
        <button className="addBtn" onClick={(events)=>{

            //Theres a delay here whenever i add an item .
            //It is either a delay or that my page did not rerender
            //Okay so my page did not re-render because 
            addItem();
        }}>Add List</button>
    </div>
    </div>}


    </div>)
}