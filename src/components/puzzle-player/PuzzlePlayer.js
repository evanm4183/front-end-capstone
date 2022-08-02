import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { PlayerBoard } from "./PlayerBoard"
import { NotesBoard } from "./NotesBoard"
import { InputBoard } from "./InputBoard"
import { LikeButton } from "../full-size-puzzle/LikeButton"
import { DislikeButton } from "../full-size-puzzle/DislikeButton"
import "../full-size-puzzle/FullSizePuzzle.css"
import "./PuzzlePlayer.css"

const make2dArray = () => {
    let arr = []

    for (let i = 0; i < 81; i++) {
        let subArr = []

        for (let j = 0; j < 9; j++) {
            subArr.push("_")
        }

        arr.push(subArr)
    }

    return arr
}

export const PuzzlePlayer = () => {
    const {puzzleId} = useParams()
    const [puzzle, setPuzzle] = useState({})
    const [notes, setNotes] = useState(make2dArray())
    const [playerBoard, setPlayerBoard] = useState([])
    const [notesToggled, setToggle] = useState(false)
    const [like, setLike] = useState([])
    const [dislike, setDislike] = useState([])
    const [puzzleSolved, setPuzzleSolved] = useState(false)

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
            setPlayerBoard(data.display)
        })

        getLikeStatus()
    }, [])

    return (
        <section className="puzzle-container">
            <PlayerBoard playerBoard={playerBoard} puzzle={puzzle}/>
            <NotesBoard notes={notes}/>
            <InputBoard 
                puzzle={puzzle}
                notes={notes} 
                notesToggled={notesToggled}
                setNotes={setNotes}
                playerBoard={playerBoard}
                setPlayerBoard={setPlayerBoard}
                setPuzzleSolved={setPuzzleSolved}
            />

            <div className="buttons">
                <LikeButton like={like} dislike={dislike} getLikeStatus={getLikeStatus} likeObj={likeObj}/>
                <DislikeButton like={like} dislike={dislike} getLikeStatus={getLikeStatus} likeObj={likeObj}/>
                <button onClick={e => {
                    notesToggled ? setToggle(false) : setToggle(true)
                }}>{notesToggled ? "Toggle Notes (On)" : "Toggle Notes (Off)"} </button>
            </div>

            <div className="description-container-full">
                {
                    puzzleSolved
                        ? <h3 className="description-title-full" style={{color: "green"}}>Puzzle Successfully Completed!</h3>
                        : <h3 className="description-title-full">Currently Playing...</h3>
                }
            </div>
        </section>
    )
}