import { useState, useEffect } from "react"
import { YourPuzzlesCard } from "./YourPuzzlesCard"
import "../home-feed/Feed.css"


export const YourPuzzlesFeed = () => {
    const [puzzles, setPuzzles] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])

    const localUserId = JSON.parse(localStorage.getItem("localUser")).id

    const getYourPuzzles = () => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty&userId=${localUserId}`)
        .then(response => response.json())
        .then(data => {
            setPuzzles(data)
        })
    }

    useEffect(() => {
        getYourPuzzles()
        
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
            <h1>Your Puzzles</h1>
            <div className="cards-container">
                {
                    puzzles.map(puzzle => {
                        return <YourPuzzlesCard 
                            puzzle={puzzle} 
                            getYourPuzzles={getYourPuzzles}
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