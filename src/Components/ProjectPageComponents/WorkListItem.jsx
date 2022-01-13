import React,{useState,useEffect} from "react";
import {CardItem} from "./CardItem";
import { AddCardComponent } from "./AddCardComponent";
import axios from "axios";

function WorkListItem(props){
    let [editItemHeader,setItemHeader] = useState(false);
    let previousItemTitle = props.itemTitle;
    let [inputVal , setInputVal] = useState(props.itemTitle);

    const editItemTitle= async (val)=>{
        const response = await axios.post("http://localhost:5000/api/workspace/editItemTitle",{
            workspaceTitle:props.wsTitle,
            itemTitle:val,
            prevItemTitle:previousItemTitle
            },
            {
                withCredentials:true
            })

            props.onChange();
    }


    return <div className="ListItemBox">
        { editItemHeader? <input id="itemHeaderInput" type="text" value={inputVal} onBlur={(event)=>{
            editItemTitle(inputVal);
            setItemHeader(false);
            }} 
        onFocus={(event)=>{
            event.target.selectionStart = 0;
            event.target.selectionEnd = event.target.value.length;
        }}
        
        onChange={(event)=>{
            let target = event.target;
            setInputVal(target.value);

            // I was thinking of making network request to the database to change the itemheader name but i feel like thats too expensive so i will do it on the onBlur
            // instead of onChange.

            // props.onChange((prevVal)=>{
            //     return prevVal.map((item,itemIdx)=>{
            //         if(itemIdx === props.WorkListItemIdx){
            //             return {
            //                 ...item,
            //                 itemTitle:inputVal
            //             }
            //         }
            //         return item;
            //     })
            // })
        }} /> : <div onClick={(event)=>{
            setItemHeader(true);
            setTimeout(()=>{
                let itemInput = document.getElementById("itemHeaderInput");
                itemInput.select();
            });
        }} className="ListItemTitle">
            <span className="ListItemHeader">{inputVal.length === 0? "Input Item Title" : inputVal}</span>
            <span>...</span>
        </div>}
        {/* Usually people will not use the idx as key but i still use it cause im not about to do extra stuff for now
        I just want to get the general idea of the backend integrating with the frontend.
         */}
        {props.cards.length !== 0 ? props.cards.map((card,idx)=>{
             return(<CardItem key={idx} WorkListItemIdx={props.WorkListItemIdx} wsTitle={props.wsTitle} idx={idx} card={card} itemTitle={props.itemTitle} onChange={props.onChange} entireData={props.entireData} />) }) : ""}
        {/* <div className="addCardBtn">
        </div> */}
        <AddCardComponent WorkListItemIdx={props.WorkListItemIdx} wsTitle={props.wsTitle} itemTitle={props.itemTitle}  onChange={props.onChange} entireData={props.entireData} />
    </div>
}

export {WorkListItem}