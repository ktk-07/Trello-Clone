

export const WorkProjectBar = (props)=>{
    return(<div id="WorkProjectBar" >
        <div className="projectBarSection projectBar1"  >
            <div>Board</div>
            <h2>{props.wsTitle.length> 0? props.wsTitle: "NewWorkspace"}</h2>
            <div><span>Star</span></div>
            <div>Private WorkSpace</div>
            <div>Workspace Visible</div>
            <div>
                {/* Probably another place to fetch data and see how many users there are in the project */}
                <div></div>
                <div><span>Invite btn</span></div>
            </div>
            
        </div>

        <div className="projectBarSection projectBar2"  >
            <div>Filter</div>
            <div>Another accordion sidebar</div>
        </div>
    </div>)
}