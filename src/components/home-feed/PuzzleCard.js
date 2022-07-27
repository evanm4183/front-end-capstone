import { MiniBoard } from "./MiniBoard"
import { Link } from "react-router-dom"

export const PuzzleCard = ({puzzle}) => {

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
                        <div><em>{puzzle.difficulty.name}</em></div>
                    </div>
                </div>
                <div className="likes-container"> {/*Need to implement once Likes system gets made*/}
                    <div><strong>Likes:</strong> 500</div>
                    <div><strong>Dislikes:</strong> 500</div>
                </div>
            </div>
        </article>
    )
}