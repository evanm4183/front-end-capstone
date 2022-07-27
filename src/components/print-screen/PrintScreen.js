import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./PrintScreen.css"

const determineClass = (index) => {
    if ((index % 9 === 2 || index % 9 === 5) && ((index >= 18 && index <= 26) || (index >= 45 && index <= 53))) {
        return "corner-cell-print"
    } else if (index % 9 === 2 || index % 9 === 5) {
        return "side-border-cell-print"
    } else if ((index >= 18 && index <= 26) || (index >= 45 && index <= 53)) {
        return "bottom-border-cell-print"
    }
    
    return "regular-cell-print"
}
    
const showCell = (value) => {
    if (value === "_" || value === 0) {
        return ""
    }
    
    return value 
}

export const PrintScreen = () => {
    const {puzzleId} = useParams()
    const [puzzle, setPuzzle] = useState()

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles/${puzzleId}`)
        .then(response => response.json())
        .then((data) => {
            setPuzzle(data)
        })
    }, [])

    return (
        <div className="board-container-print">
        <div className="print-grid-container">
            {
                puzzle?.display?.map((cell, index) => {
                    return (
                        <div className={determineClass(index)} key={index}>{showCell(cell)}</div>
                    )
                })
            }
        </div>
        </div>
    )
}