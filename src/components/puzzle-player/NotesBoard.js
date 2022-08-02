const determineClass = (index) => {
    if ((index % 9 === 2 || index % 9 === 5) && ((index >= 18 && index <= 26) || (index >= 45 && index <= 53))) {
        return "corner-cell-notes"
    } else if (index % 9 === 2 || index % 9 === 5) {
        return "side-border-cell-notes"
    } else if ((index >= 18 && index <= 26) || (index >= 45 && index <= 53)) {
        return "bottom-border-cell-notes"
    }
    
    return "regular-cell-notes"
}
    
const showCell = (value) => {
    if (value === "_") {
        return ""
    }
    
    return value 
}

export const NotesBoard = ({notes}) => {
    return (
        <div className="notes-grid-container">
            {
                notes.map((cell, cellIndex) => {
                    return (
                        <div 
                            className={determineClass(cellIndex)} 
                            key={cellIndex}
                        >
                            {
                                cell.map((subCell, subCellIndex) => {
                                    return (
                                        <div
                                            className="sub-cell-notes"
                                            key={`${cellIndex}--${subCellIndex}`}
                                        >{showCell(subCell)}</div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}