import { useState, useEffect } from "react"
import { PuzzleCard } from "./PuzzleCard"
import { FilterBar } from "./FilterBar"
import "./Feed.css"


export const HomeFeed = () => {
    const [puzzles, setPuzzles] = useState([])
    const [filteredPuzzles, setFiltered] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [userSearch, setUserSearch] = useState("")
    const [titleSearch, setTitleSearch] = useState("")
    const [showLiked, setShowLiked] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty`)
        .then(response => response.json())
        .then(data => {
            setPuzzles(data)
            setFiltered(data)
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

    useEffect(() => {

    }, [userSearch])

    useEffect(() => {

    }, [titleSearch])

    useEffect(() => {
        if (showLiked) {
            const userId = JSON.parse(localStorage.getItem("localUser")).id
            const userLikes = likes.filter(like => like.userId === userId)
            const likedPuzzles = []
            
            for (const like of userLikes) {
                for (const puzzle of puzzles) {
                    if (like.completePuzzleId === puzzle.id) {
                        likedPuzzles.push(puzzle)
                    }
                }
            }

            setFiltered(likedPuzzles)
            return
        }

        setFiltered(puzzles)
    }, [showLiked])

    return (
        <div className="feed-container">
            <FilterBar setUserSearch={setUserSearch} setTitleSearch={setTitleSearch} setShowLiked={setShowLiked}/>
            <div className="cards-container">
                {
                    filteredPuzzles.length > 0
                        ? filteredPuzzles.map(puzzle => {
                            return <PuzzleCard 
                                puzzle={puzzle}
                                likes={likes}
                                dislikes={dislikes} 
                                key={puzzle.id}
                            />
                        })
                        : <h1>No Puzzles Found...</h1>
                }
            </div>
        </div>
    )
}