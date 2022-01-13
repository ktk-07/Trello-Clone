import react from "react";
import reactDOM from "react-dom";

export const WorkAccordionContent = ()=>{
    // do some database calling to change the information inside the content i guess.

    return(             
        <div className="toggleContent toggle" >

        {/* For content inside here was can fetch from database and do cleanup using UseEffect */}
        {/* I mean obviously you can use Class and extend and use mounting and demounting to do sideEffects and cleanup */}
            <div>Extra Information</div>
            <div>Extra Information</div>
</div>)
}