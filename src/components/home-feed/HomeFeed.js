import { useState, useEffect } from "react"
import { PuzzleCard } from "./PuzzleCard"
import "./HomeFeed.css"


export const HomeFeed = () => {
    const [puzzles, setPuzzles] = useState([])
    const [users, setUsers] = useState([])
    const [difficulties, setDifficulties] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty`)
        .then(response => response.json())
        .then(data => {
            setPuzzles(data)
        })
    }, [])

    return (
        <div className="feed-container">
            <h1>home feed</h1>
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