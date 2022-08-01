const determineClass = (index) => {
    if ((index % 9 === 2 || index % 9 === 5) && ((index >= 18 && index <= 26) || (index >= 45 && index <= 53))) {
        return "corner-cell-uneditable"
    } else if (index % 9 === 2 || index % 9 === 5) {
        return "side-border-cell-uneditable"
    } else if ((index >= 18 && index <= 26) || (index >= 45 && index <= 53)) {
        return "bottom-border-cell-uneditable"
    }
    
    return "regular-cell-uneditable"
}
    
const showCell = (value) => {
    if (value === "_" || value === 0) {
        return ""
    }
    
    return value 
}
    
export const PlayableBoard = ({puzzle}) => {

    return (
        <div className="full-grid-container">
            {
                puzzle?.display?.map((cell, index) => {
                    return (
                        <div 
                            className={determineClass(index)} 
                            key={index}
                            contentEditable="true"
                            onClick = {e => {
                                console.log(e.target.innerHTML)
                            }}
                            >{showCell(cell)}</div>
                    )
                })
            }
        </div>
    )
}