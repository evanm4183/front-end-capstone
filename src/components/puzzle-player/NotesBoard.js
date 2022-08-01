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
    if (value === "_" || value === 0) {
        return ""
    }
    
    return value 
}

export const NotesBoard = ({puzzle}) => {
    return (
        <div className="notes-grid-container">
            {
                puzzle?.display?.map((cell, index) => {
                    return (
                        <div 
                            className={determineClass(index)} 
                            key={index}
                            onClick = {e => {
                                console.log("a")
                            }}
                        >
                            <div className="sub-cell-notes">1</div>
                            <div className="sub-cell-notes">2</div>
                            <div className="sub-cell-notes">3</div>
                            <div className="sub-cell-notes">4</div>
                            <div className="sub-cell-notes">5</div>
                            <div className="sub-cell-notes">6</div>
                            <div className="sub-cell-notes">7</div>
                            <div className="sub-cell-notes">8</div>
                            <div className="sub-cell-notes">9</div>
                        </div>
                    )
                })
            }
        </div>
    )
}