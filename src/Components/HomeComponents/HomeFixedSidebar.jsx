import { useState } from "react";
import axios from "axios";
import { Workspace } from "./movableComponents/Workspace";

export const HomeFixedSidebar = (props)=>{
    function divCheck(event){
        let target = event.target.dataset.info
        props.onChangeSelect(target)
    }

    function spanCheck(event){
        event.stopPropagation();
        let target = event.target.innerText;
        props.onChangeSelect(target)
    }

    const [showAcc, setAccState] = useState(false);
    const [modalState, setModalState] = useState(false);
    const [workspaceInput, setWSinput] = useState("");
    const [workspaces, setWorkSpaces] = useState([]);

    const getWorkSpaces = async ()=>{
        let resData = await axios.get("http://localhost:5000/api/workspaces",{withCredentials:true});
        // basically get data of workspaces and set it 
        setWorkSpaces(resData.data);
    }

    const returnWorkspaces = (arr)=>{
        return arr.map((workspace,idx,arr)=>{
            return <Workspace key={idx} title={workspace.workSpaceTitle} />
        })
    }

    const addWorkSpaces = async (data)=>{
        let resData = await axios.post("/api/addWorkspaces",data,{withCredentials:true});
    }

    return(<div id="homeFixedSidebar">

        <div className="contentSwitchBox">
                <div className="contentSwitch hoverSwitch" data-info="Boards"  onClick={(event)=>{
                        divCheck(event);
                    }}>
                    <span className="contentSwitchLogo" >Lo</span> <span
                    // onClick={(event)=>{
                    //     spanCheck(event)
                    // }}
                     >Boards</span>
                </div>

                <div className="contentSwitch hoverSwitch" data-info="Template" onClick={(event)=>{
                        divCheck(event);
                    }}>
                    <span className="contentSwitchLogo" >Lo</span> <span
                    // onClick={(event)=>{
                    //     spanCheck(event)
                    // }}
                    >Template</span>
                </div>
        
                <div className="contentSwitch hoverSwitch" data-info="Home" onClick={(event)=>{
                        divCheck(event);
                    }} >
                    <span className="contentSwitchLogo" >Lo</span> <span
                    // onClick={(event)=>{
                    //     spanCheck(event)
                    // }}
                    >Home</span>
                </div>
        </div>

        <div className="contentSwitchBox" >
            <div >
                <div className="contentSwitchTwo ">
                    <span>WorkSpace</span> 
                    <span onClick={(event)=>{
                        setModalState(true);
                    }}><button>+</button></span>

                </div>
                {
                        modalState ?   <div id="modalContentBoxHome">
                        <div id="modalContentHome">
                            <input type="text" value={workspaceInput} onChange={(event)=>{
                                let target = event.target;
                                setWSinput(target.value);
                            }} />
                            <button onClick={(event)=>{
                                addWorkSpaces({
                                    workspace:workspaceInput
                                });
                                setModalState(false);
                            }}>Add</button>
                            <button onClick={(event)=>{
                                setModalState(false);
                            }}>Close</button>
                        </div>
                    </div> : ""
                    }
            </div>

            {/* This is an accordion */}
            <div className="contentSwitchTwo hoverSwitch">
                <span>My own Work space</span>
                <span><button className="modalBtn" onClick={(event)=>{
                    setAccState(!showAcc);
                    getWorkSpaces();
                    }
                } >Arrowdown</button></span>
            </div>
            {/* <div> */}
                {
                    !showAcc ? "":  workspaces.length < 1 ? <span>WorkSpaces</span> : returnWorkspaces(workspaces)
                }
            {/* </div> */}
        </div>



    </div>)
}