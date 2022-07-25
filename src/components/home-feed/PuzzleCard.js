import { MiniBoard } from "./MiniBoard"

const getAuthorName = (id, users) => {
    if (users.length !== 0) {
        const author = users?.find(user => user.id === id)
        return author.username
    }
}

const getDifficultyName = (id, difficulties) => {
    if (difficulties.length !== 0) {
        const difficulty = difficulties?.find(diff => diff.id === id)
        return difficulty.name
    }
}

export const PuzzleCard = ({puzzle, users, difficulties}) => {

    return (
        <article>
            <div className="card-container">
                <MiniBoard puzzle={puzzle} />
                <div className="description-container">
                    <div className="puzzle-title-container">
                        <h4 className="puzzle-header">Title:</h4>
                        <div><em>{puzzle.title}</em></div>
                    </div>
                    <div className="author-container">
                        <h4 className="puzzle-header">Author:</h4>
                        <div><em>{getAuthorName(puzzle.creatorId, users)}</em></div>
                    </div>
                    <div className="difficulty">
                        <h4 className="puzzle-header">Difficulty:</h4>
                        <div><em>{getDifficultyName(puzzle.difficultyId, difficulties)}</em></div>
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