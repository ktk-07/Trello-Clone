export const ItemContent = (props)=>{
    return<div style={{textAlign:"left"}} className="ListItemContent" data-insidemodal={props.modal}>{props.content}</div>
}