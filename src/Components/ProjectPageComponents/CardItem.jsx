import React, { useState } from "react";
import reactDom from "react-dom";
import { ItemContent } from "./ItemContent";
import { ItemModalContent } from "./ItemModalContent";

function CardItem(props){
    const [modalState, SetModalState] = useState(false);

    return (<div className="cardItem cardItemModal" onClick={(events)=>{
        // need to refactor this code such that even if it touches the things inside the content it will not close the modal
        if(!modalState){
            SetModalState(true);
        }
        // }else if(modalState && !events.target.classList.contains("ItemModalDetails") ){
        //     SetModalState(false);
        // }
    }}>
        <ItemContent  content={props.card.title} wsTitle={props.wsTitle} itemTitle={props.itemTitle} onChange={props.onChange} />

        {modalState ? <ItemModalContent WorkListItemIdx={props.WorkListItemIdx} idx={props.idx} wsTitle={props.wsTitle} itemTitle={props.itemTitle} onChange={props.onChange} description={props.card.description} entireData={props.entireData} content={props.card.title} onChangeModalState={SetModalState} /> : "" }

    </div>)
}

export {CardItem}