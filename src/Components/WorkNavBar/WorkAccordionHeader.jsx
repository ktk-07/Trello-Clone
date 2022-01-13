import react, { useState } from "react";
import reactDOM from "react-dom";

function WorkAccordionHeader(props){

    return(<span>

    {props.name} {props.bar === "2" ? "" : props.name !== "Create" ? " ^" : ""}

    </span>);
}

export default WorkAccordionHeader;