import { WorkListItem } from "./WorkListItem";
import { WorkListAddItem } from "./WorkListAddItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { get } from "mongoose";

export const WorkListSection = (props)=>{
    let workspaceTitle = props.wsTitle;
    // let [arrOfItems, setItems] = useState([{
    //     itemTitle:"Edit your First Box",
    //     cardItems:[{
    //         title:"",
    //         description:""
    //     }]
    // }]);
    let [arrOfItems, setItems] = useState([]);
    let [itemTitle, setItemTitle] = useState("");

    const getWorkSpaceItems = async ()=>{
        let workSpaceItemArr = await axios.post("/api/workspaces/items",{workspaceTitle:workspaceTitle},{withCredentials:true});
        console.log(workSpaceItemArr);
        setItems((prevVal)=>{
            return [...workSpaceItemArr.data]
        });
        setItemTitle(workSpaceItemArr.data.itemTitle);
        return workSpaceItemArr.data;
    }

    useEffect(()=>{
        getWorkSpaceItems();
    },[])
    
    // i added the first box become i could not figure a way to not render anythingin the arrOfItems.
    // probably not a good idea to pass the entire data but since Im not integrating the backend yet to get the data from the NOSQL database i will just pass the entire data
    return(
    <div id="WorkListSection">
        {arrOfItems.map((val,index)=>{
            return <WorkListItem key={index} WorkListItemIdx={index} wsTitle={props.wsTitle} itemTitle={val.itemTitle} cards={val.cardItems} onChange={getWorkSpaceItems} entireData={arrOfItems} />
        })}
        <WorkListAddItem wsTitle={props.wsTitle} onChange={()=>{
            getWorkSpaceItems();
            }} />
    </div>
    )
}