import { useState, useEffect } from "react"
import { PuzzleCard } from "./PuzzleCard"
import { FilterBar } from "./FilterBar"
import "./Feed.css"

const filterByLiked = (userId, likes, puzzles) => {
    const userLikes = likes.filter(like => like.userId === userId)
    const likedPuzzles = []
    
    for (const like of userLikes) {
        for (const puzzle of puzzles) {
            if (like.completePuzzleId === puzzle.id) {
                likedPuzzles.push(puzzle)
            }
        }
    }

    return likedPuzzles
}

const filterByAuthor = (searchTerm, puzzleArr) => {
    const filteredPuzzles = puzzleArr.filter(puzzle => 
        puzzle.user.username.toLowerCase().startsWith(searchTerm)
    )

    return filteredPuzzles
}

const filterByTitle = (searchTerm, puzzleArr) => { 
    const filteredPuzzles = puzzleArr.filter(puzzle => 
        puzzle.title.toLowerCase().startsWith(searchTerm)
    )

    return filteredPuzzles
}

export const HomeFeed = () => {
    const [puzzles, setPuzzles] = useState([])
    const [filteredPuzzles, setFiltered] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [userSearch, setUserSearch] = useState("")
    const [titleSearch, setTitleSearch] = useState("")
    const [showLiked, setShowLiked] = useState(false)

    const userId = JSON.parse(localStorage.getItem("localUser")).id

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles?_expand=user&_expand=difficulty&_sort=timestamp&_order=desc`)
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
        if (!showLiked && !titleSearch && !userSearch) { //showLiked: 0, titleSearch: 0, userSearch: 0
            setFiltered(puzzles)
        } 
        else if (!showLiked && !titleSearch) { //showLiked: 0, titleSearch: 0, userSearch: 1
            setFiltered(filterByAuthor(userSearch, puzzles))
        } 
        else if (!showLiked && titleSearch && !userSearch) { //showLiked: 0, titleSearch: 1, userSearch: 0
            setFiltered(filterByTitle(titleSearch, puzzles))
        } 
        else if (!showLiked && titleSearch) { //showLiked: 0, titleSearch: 1, userSearch: 1
            const titleMatches = filterByTitle(titleSearch, puzzles)
            setFiltered(filterByAuthor(userSearch, titleMatches))
        } 
        else if (showLiked && !titleSearch && !userSearch) {
            const likedPuzzles = filterByLiked(userId, likes, puzzles)
            setFiltered(likedPuzzles)
        } 
        else if (showLiked && !titleSearch) {
            const likedPuzzles = filterByLiked(userId, likes, puzzles)
            setFiltered(filterByAuthor(userSearch, likedPuzzles))
        } 
        else if (showLiked && titleSearch && !userSearch) {
            const likedPuzzles = filterByLiked(userId, likes, puzzles)
            setFiltered(filterByTitle(titleSearch, likedPuzzles))
        } 
        else if (showLiked && titleSearch) {
            const likedPuzzles = filterByLiked(userId, likes, puzzles)
            const titleMatches = filterByTitle(titleSearch, likedPuzzles)
            setFiltered(filterByAuthor(userSearch, titleMatches))
        }
    }, [userSearch, titleSearch])

    useEffect(() => {
        if (showLiked) {
            setFiltered(filterByLiked(userId, likes, puzzles))
        } else {
            setFiltered(puzzles)
        }
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