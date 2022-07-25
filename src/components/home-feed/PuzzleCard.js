import { MiniBoard } from "./MiniBoard"

export const PuzzleCard = ({puzzle}) => {
    
    return (
        <article>
            <div className="card-container">
                <MiniBoard puzzle={puzzle} />
                <div className="description-container">
                    <div className="puzzle-title-container">
                        <h4 className="puzzle-header">Title:</h4>
                        <div><em>Title Name</em></div>
                    </div>
                    <div className="author-container">
                        <h4 className="puzzle-header">Author:</h4>
                        <div><em>Author Name</em></div>
                    </div>
                    <div className="difficulty">
                        <h4 className="puzzle-header">Difficulty:</h4>
                        <div><em>Difficulty</em></div>
                    </div>
                </div>
                <div className="likes-container">
                    <div><strong>Likes:</strong> 500</div>
                    <div><strong>Dislikes:</strong> 500</div>
                </div>
            </div>
        </article>
    )
}