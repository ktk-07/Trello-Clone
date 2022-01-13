import react ,{useState} from "react";
import reactDOM from "react-dom";
import WorkAccordionHeader from "./WorkAccordionHeader";
import { WorkAccordionContent } from "./WorkAccordionContent";
import { WorkAccordionContentTwo } from "./WorkAccordionContentTwo";

export const WorkAccordion = (props) =>{
    function toggleAddContent(target){
        target.classList.toggle("toggle");
    }


    return(<div className="workAccordion"  onClick={(event)=>{
        //console.log(event);
        let target = event.target;
        console.log(target);
        let sibling = target.nextElementSibling;
        if(!props.targetItem.toggleState && sibling.classList.contains("toggleContent" && props.targetItem.accdName !== props.name)){
            toggleAddContent(sibling);
            props.setToggle({
                accdName:props.name,
                toggleState:true
            });
        }else{
            // suppose to useRef from react but i stil dk how to do that so imm a just implement another way.
            let toggleElements = document.getElementsByClassName("toggleContent");
            try{
                // toggleElements.forEach((value)=>{
                //     value.classList.remove("toggleContent");
                // })
                for(let item of toggleElements){
                    item.classList.add("toggle");
                }
                console.log(props.targetItem.accdName, props.name);
                if(props.targetItem.accdName !== props.name){
                    console.log("hello");
                    toggleAddContent(sibling);
                    props.setToggle({
                        accdName:props.name,
                        toggleState:false
                    });
                }else{
                    props.setToggle({
                        accdName:"",
                        toggleState:false
                    });
                }

            }catch(err){
                console.log(err);
            }
        }

    }}>
        <WorkAccordionHeader bar={props.bar} name={props.name} show={true} />
        {props.bar === "1"? <WorkAccordionContent name={props.name} /> : <WorkAccordionContentTwo name={props.name}  />}
    </div>)
}