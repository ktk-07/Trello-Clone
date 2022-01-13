import react from "react";
import reactDom from "react-dom";
import {SelectHome} from "./movableComponents/SelectHome";
import { SelectTemplate } from "./movableComponents/SelectTemplate";
import {SelectBoard} from "./movableComponents/SelectBoard";

export const HomeMovableSection = (props)=>{

    function renderSelectBtn(value){
        switch(value){
            case "Home":
                return <SelectHome />
                break;
            case "Template":
                return <SelectTemplate />
                break;
            case "Boards":
                return <SelectBoard />
                break;
            default:
                return <SelectHome />
                break;
        }
    }

    return(<div>
        {renderSelectBtn(props.selectVal)}
    </div>)
}