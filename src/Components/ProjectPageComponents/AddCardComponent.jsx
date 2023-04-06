import React,{useState} from "react";
import axios from "axios";

export const AddCardComponent = (props)=>{
    let [editMode,setEditMode] = useState(false);
    let [cardContent,setCardContent] = useState("");

    const addCard = async (cardTitle)=>{
    //const response = await axios.post("http://localhost:5000/api/workspace/addcard"
    const response = await axios.post("/api/workspace/addcard",{
        workspaceTitle:props.wsTitle,
        itemTitle:props.itemTitle,
        cardTitle:cardTitle
    },
    {
        withCredentials:true
    })
    props.onChange();
    }

    return(<div className="AddCardComponent" onClick={(event)=>{
        //only after adding this line of code my state changed.
        if(!editMode){
            setEditMode(true);
        }
        }}>
        {!editMode ? <div className="AddCardContent"> <span>+</span>Add Card</div> : <div id="addCardContentBox" className="editBox"> <textarea type="text" value={cardContent} onChange={(event)=>{
            let target = event.target;
            setCardContent(target.value);
        }}> </textarea>
            <div>
                <button className="closeBtn" onClick={(event)=>{setEditMode(false)}}></button>
                <button className="addBtn" onClick={(event)=>{
                    addCard(cardContent);
                    // props.onChange((prevVal)=>{
                    //     return prevVal.map((val,idx)=>{
                    //         if(idx === props.WorkListItemIdx){
                    //             return {
                    //                     itemTitle:val.itemTitle,
                    //                     cardItems: [
                    //                         ...props.cards,
                    //                         {
                    //                             title:cardContent,
                    //                             description:""
                    //                         }
                    //                     ]
                    //                 }
                    //         }
                    //         return val;
                    //     })
                        // return({
                        //     cardItems:[...props.cards,cardContent]
                        // })

                    //TRYING TO re-render by using this.
                    // The re-render did not work because i did not re-render the entire page
                    // so i had to padd getWorkSpaceItems
                    // setTimeout(()=>{
                    //     setCardContent("");
                    //     setEditMode(false);
                    // });

                    setCardContent("");
                    setEditMode(false);
                }}>Add</button>
            </div>
         </div>}
    </div>)
}

// { 
//     !editMode ? <div> <span>+</span>Add Card</div> : <AddCardComponent state={editMode} onClose={setEditMode} />
// }

                            // return {
                            //     title:val.title,
                            //     cardItems: [
                            //         ...props.cards,
                            //         {
                            //             title:cardContent,
                            //             description:""
                            //         }
                            //     ]
                            // }