import { useState, useEffect } from "react"
import { YourPuzzlesCard } from "./YourPuzzlesCard"
import "../home-feed/Feed.css"


export const YourPuzzlesFeed = () => {
    const [puzzles, setPuzzles] = useState([])
    const localUserId = JSON.parse(localStorage.getItem("localUser")).id

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty&userId=${localUserId}`)
        .then(response => response.json())
        .then(data => {
            setPuzzles(data)
        })
    }, [])

    return (
        <div className="feed-container">
            <h1>Your Puzzles</h1>
            <div className="cards-container">
                {
                    puzzles.map(puzzle => {
                        return <YourPuzzlesCard 
                            puzzle={puzzle} 
                            key={puzzle.id}
                        />
                    })
                }
            </div>
        </div>
    )
}