import { useState, useEffect } from "react"
import { PuzzleCard } from "./PuzzleCard"
import "./HomeFeed.css"


export const HomeFeed = () => {
    const [puzzles, setPuzzles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles`)
        .then(response => response.json())
        .then(data => {setPuzzles(data)})
    }, [])

    return (
        <div className="feed-container">
            <h1>home feed</h1>
            <PuzzleCard puzzle={puzzles[0]} />
        </div>
    )
}