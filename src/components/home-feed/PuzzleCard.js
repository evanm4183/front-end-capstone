import { MiniBoard } from "./MiniBoard"
import { Link } from "react-router-dom"

const countLikes = (likes, puzzleId) => {
    let count = 0

    for (const like of likes) {
        if (like.completePuzzleId === puzzleId) {
            count++
        }
    }

    return count
}

const countDislikes = (dislikes, puzzleId) => {
    let count = 0

    for (const dislike of dislikes) {
        if (dislike.completePuzzleId === puzzleId) {
            count++
        }
    }

    return count
}

export const PuzzleCard = ({puzzle, likes, dislikes}) => {

    return (
        <article>
            <div className="card-container">
                <MiniBoard puzzle={puzzle} />
                <div className="description-container">
                    <div className="puzzle-title-container">
                        <h4 className="puzzle-header">Title:</h4>
                        <div><Link to={`/puzzles/${puzzle.id}`}>{puzzle.title}</Link></div>
                    </div>
                    <div className="author-container">
                        <h4 className="puzzle-header">Author:</h4>
                        <div><em>{puzzle.user.username}</em></div>
                    </div>
                    <div className="difficulty">
                        <h4 className="puzzle-header">Difficulty:</h4>
                        <div><em>{puzzle?.difficulty?.name}</em></div>
                    </div>
                </div>
                <div className="likes-container"> {/*Need to implement once Likes system gets made*/}
                    <div><strong>Likes: </strong>{countLikes(likes, puzzle.id)}</div>
                    <div><strong>Dislikes: </strong>{countDislikes(dislikes, puzzle.id)}</div>
                </div>
            </div>
        </article>
    )
}