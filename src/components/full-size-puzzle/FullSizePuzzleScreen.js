import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import "./FullSizePuzzle.css"
import { FullSizeBoard } from "./FullSizeBoard"

export const FullSizePuzzleScreen = () => {
    const {puzzleId} = useParams()
    const [puzzle, setPuzzle] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles/${puzzleId}?_expand=user`)
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
                <button>Dislike</button>
            </div>
            <div className="description-container">
                <div>Description</div>
                <div className="puzzle-description">{puzzle.description}</div>
            </div>
        </section>
    )
}

/*
<div className="puzzle-info">
    <h2 className="puzzle-title">{puzzle.title}</h2>
    <div className="by">by</div>
    <h3 className="puzzle-author">{puzzle?.user?.username}</h3>
</div>
*/