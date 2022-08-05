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
    const [completePuzzles, setCompletePuzzles] = useState([])
    const [incompletePuzzles, setIncompletePuzzles] = useState([])
    const [filteredPuzzles, setFiltered] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [titleSearch, setTitleSearch] = useState("")
    const [showComplete, setShowComplete] = useState(true)

    const localUserId = JSON.parse(localStorage.getItem("localUser")).id

    const getYourPuzzles = () => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty&userId=${localUserId}`)
        .then(response => response.json())
        .then(data => {
            setCompletePuzzles(data)
            setFiltered(data)
        })

        fetch(`http://localhost:8088/incompletePuzzles?_expand=user&_expand=difficulty&userId=${localUserId}`)
        .then(response => response.json())
        .then(data => {
            setIncompletePuzzles(data)
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
            setFiltered(completePuzzles)
        } else {
            setFiltered(filterByTitle(titleSearch, completePuzzles))
        }

    }, [titleSearch])

    useEffect(() => {
        if (showComplete) {
            setFiltered(completePuzzles)
        } else {
            setFiltered(incompletePuzzles)
        }
    }, [showComplete])

    return (
        <div className="feed-container">
            <SearchBar setTitleSearch={setTitleSearch} setShowComplete={setShowComplete}/>
            <div className="cards-container">
                {
                    filteredPuzzles.length > 0
                        ? filteredPuzzles.map(puzzle => {
                            return <YourPuzzlesCard 
                                puzzle={puzzle} 
                                getYourPuzzles={getYourPuzzles}
                                likes={likes}
                                dislikes={dislikes}
                                showComplete={showComplete}
                                key={puzzle.id}
                            />
                        })
                        : <h1>No Puzzles Found...</h1>
                }
            </div>
        </div>
    )
}