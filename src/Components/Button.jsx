export default function Button({content, style,  onClick}){
    return(
        <div>
            <div className={`btn csetliColor`} onClick={onClick} style={style}>{content} </div>
        </div>
    )
}