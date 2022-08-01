import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { PlayableBoard } from "./PlayableBoard"
import { NotesBoard } from "./NotesBoard"
import { LikeButton } from "../full-size-puzzle/LikeButton"
import { DislikeButton } from "../full-size-puzzle/DislikeButton"
import "../full-size-puzzle/FullSizePuzzle.css"
import "./PuzzlePlayer.css"


export const PuzzlePlayer = () => {
    const {puzzleId} = useParams()
    const [puzzle, setPuzzle] = useState({})
    const [like, setLike] = useState([])
    const [dislike, setDislike] = useState([])
    const [notesToggled, setToggle] = useState(false)

    const userId = JSON.parse(localStorage.getItem("localUser")).id
    const likeObj = {completePuzzleId: parseInt(puzzleId), userId: userId}

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
            <NotesBoard puzzle={puzzle}/>
            <PlayableBoard puzzle={puzzle}/>
            <div className="buttons">
                <LikeButton like={like} dislike={dislike} getLikeStatus={getLikeStatus} likeObj={likeObj}/>
                <DislikeButton like={like} dislike={dislike} getLikeStatus={getLikeStatus} likeObj={likeObj}/>
                <button onClick={e => {
                    notesToggled ? setToggle(false) : setToggle(true)
                }}>{notesToggled ? "Toggle Notes (On)" : "Toggle Notes (Off)"} </button>
            </div>
            <div className="description-container-full">
                <h3 className="description-title-full">Currently Playing...</h3>
            </div>
           <div className="big-box">
            
                <div className="a" >1</div>
                <div className="b" >2</div>
                
           </div>
        </section>
    )
}