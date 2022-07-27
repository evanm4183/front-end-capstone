import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { FullSizeBoard } from "./FullSizeBoard"
import { LikeButton } from "./LikeButton"
import { DislikeButton } from "./DislikeButton"
import "./FullSizePuzzle.css"

export const FullSizePuzzleScreen = () => {
    const {puzzleId} = useParams()
    const [puzzle, setPuzzle] = useState({})
    const [like, setLike] = useState([])
    const [dislike, setDislike] = useState([])

    const userId = JSON.parse(localStorage.getItem("localUser")).id
    const likeObj = {completePuzzleId: parseInt(puzzleId), userId: userId}
  
    const navigate = useNavigate()

    const getLikeStatus = () => {
        fetch(`http://localhost:8088/likes?userId=${userId}&completePuzzleId=${puzzleId}`)
        .then(response => response.json())
        .then(data => {
            setLike(data)
            return fetch(`http://localhost:8088/dislikes?userId=${userId}&completePuzzleId=${puzzleId}`)
        })
        .then(response => response.json())
        .then(data => {
            setDislike(data)
        })
    }

    useEffect(() => {
        fetch(`http://localhost:8088/completePuzzles/${puzzleId}`)
        .then(response => response.json())
        .then((data) => {
            setPuzzle(data)
        })

        getLikeStatus()
    }, [])

    return (
        <section className="puzzle-container">
            
            <FullSizeBoard puzzle={puzzle} />
            <div className="buttons">
                <LikeButton like={like} dislike={dislike} getLikeStatus={getLikeStatus} likeObj={likeObj}/>
                <button onClick={() => {navigate(`/print/${puzzleId}`)}}>Show Only Puzzle</button>
                <DislikeButton like={like} dislike={dislike} getLikeStatus={getLikeStatus} likeObj={likeObj}/>
            </div>
            <div className="description-container-full">
                <h3 className="description-title-full">Description</h3>
                <div className="description-body-full">{puzzle.description}</div>
            </div>
           
        </section>
    )
}