import { useState, useEffect } from "react"
import { PuzzleCard } from "./PuzzleCard"
import "./Feed.css"


export const HomeFeed = () => {
    const [puzzles, setPuzzles] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty`)
        .then(response => response.json())
        .then(data => {
            setPuzzles(data)
        })

        fetch(`http://localhost:8088/likes`)
        .then(response => response.json())
        .then(data => {
            setLikes(data)
        })

        fetch(`http://localhost:8088/dislikes`)
        .then(response => response.json())
        .then(data => {
            setDislikes(data)
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
                            likes={likes}
                            dislikes={dislikes} 
                            key={puzzle.id}
                        />
                    })
                }
            </div>
        </div>
    )
}