import { useState, useEffect } from "react"
import { YourPuzzlesCard } from "./YourPuzzlesCard"
import { SearchBar } from "./SearchBar"
import "../home-feed/Feed.css"

const filterByTitle = (searchTerm, puzzleArr) => { 
    const filteredPuzzles = puzzleArr.filter(puzzle => 
        puzzle.title.toLowerCase().startsWith(searchTerm)
    )

    return filteredPuzzles
}

export const YourPuzzlesFeed = () => {
    const [puzzles, setPuzzles] = useState([])
    const [filteredPuzzles, setFiltered] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [titleSearch, setTitleSearch] = useState("")

    const localUserId = JSON.parse(localStorage.getItem("localUser")).id

    const getYourPuzzles = () => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty&userId=${localUserId}`)
        .then(response => response.json())
        .then(data => {
            setPuzzles(data)
            setFiltered(data)
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

    useEffect(() => {
        if (!titleSearch) {
            setFiltered(puzzles)
        } else {
            setFiltered(filterByTitle(titleSearch, puzzles))
        }

    }, [titleSearch])

    return (
        <div className="feed-container">
            <SearchBar setTitleSearch={setTitleSearch} />
            <div className="cards-container">
                {
                    filteredPuzzles.length > 0
                        ? filteredPuzzles.map(puzzle => {
                            return <YourPuzzlesCard 
                                puzzle={puzzle} 
                                getYourPuzzles={getYourPuzzles}
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