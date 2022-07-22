import { useEffect, useState } from "react"

export const PuzzleAttributesForm = () => {
    const [difficulties, setDifficulties] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/difficulties`)
        .then(response => response.json())
        .then(data => {setDifficulties(data)})
    }, [])

    return (
        <article className="form-container">
            <div className="form-group">
                <label>Puzzle Title</label>
                <input type="text"></input>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea></textarea>
            </div>
            <div className="form-group">
                <label>Mark a Difficulty</label>
                <select>
                    <option value="0">Select a Difficulty...</option>
                    {
                        difficulties.map(difficulty => 
                            <option value={difficulty.id}>{difficulty.name}</option>
                        )
                    }
                </select>
            </div>
            <button>Save Puzzle</button>
        </article>
    )
}