const determineClass = (index) => {
    if ((index % 9 === 2 || index % 9 === 5) && ((index >= 18 && index <= 26) || (index >= 45 && index <= 53))) {
        return "corner-cell-full"
    } else if (index % 9 === 2 || index % 9 === 5) {
        return "side-border-cell-full"
    } else if ((index >= 18 && index <= 26) || (index >= 45 && index <= 53)) {
        return "bottom-border-cell-full"
    }
    
    return "regular-cell-full"
}
    
const showCell = (value) => {
    if (value === "_" || value === 0) {
        return ""
    }
    
    return value 
}
    
export const FullSizeBoard = ({puzzle}) => {

    return (
        <div className="full-grid-container">
            {
                puzzle?.display?.map((cell, index) => {
                    return (
                        <div className={determineClass(index)} key={index}>{showCell(cell)}</div>
                    )
                })
            }
        </div>
    )
}