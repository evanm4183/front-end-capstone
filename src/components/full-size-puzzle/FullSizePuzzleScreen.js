import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import "./FullSizePuzzle.css"
import { FullSizeBoard } from "./FullSizeBoard"

export const FullSizePuzzleScreen = () => {
    const {puzzleId} = useParams()
    const [puzzle, setPuzzle] = useState({})
    
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles/${puzzleId}`)
        .then(response => response.json())
        .then((data) => {
            setPuzzle(data)
        })
    }, [])

    return (
        <section className="puzzle-container">
            
            <FullSizeBoard puzzle={puzzle} />
            <div className="buttons">
                <button>Like</button>
                <button onClick={() => {navigate(`/print/${puzzleId}`)}}>Show Only Puzzle</button>
                <button>Dislike</button>
            </div>
            <div className="description-container-full">
                <h3 className="description-title-full">Description</h3>
                <div className="description-body-full">{puzzle.description}</div>
            </div>
           
        </section>
    )
}