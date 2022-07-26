import { useState, useEffect } from "react"
import { PuzzleCard } from "./PuzzleCard"
import "./Feed.css"


export const HomeFeed = () => {
    const [puzzles, setPuzzles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty`)
        .then(response => response.json())
        .then(data => {
            setPuzzles(data)
        })
    }, [])

    return (
        <div className="feed-container">
            <h1>Home Feed</h1>
            <div className="cards-container">
                {
                    puzzles.map(puzzle => {
                        return <PuzzleCard 
                            puzzle={puzzle} 
                            key={puzzle.id}
                        />
                    })
                }
            </div>
        </div>
    )
}