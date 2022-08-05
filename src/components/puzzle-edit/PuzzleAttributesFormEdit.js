import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const PuzzleAttributesFormEdit = ({solution, display, fetchedPuzzle, resource}) => {
    const user = JSON.parse(localStorage.getItem("localUser"))

    const [difficulties, setDifficulties] = useState([])
    const [puzzle, updatePuzzle] = useState({
        solution: solution,
        display: display, 
        userId: user.id,
        title: fetchedPuzzle.title, 
        description: fetchedPuzzle.description, 
        difficultyId: fetchedPuzzle.difficultyId, 
        timestamp: fetchedPuzzle.timestamp
    })

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/difficulties`)
        .then(response => response.json())
        .then(data => {setDifficulties(data)})
    }, [])
    
    useEffect(() => {
        const copy = {...puzzle}
        copy.solution = solution
        copy.display = display
        updatePuzzle(copy)
    }, [solution, display])
    
    const handleTextChange = (e) => {
        const property = e.target.id

        const copy = {...puzzle}
        copy[property] = e.target.value
        updatePuzzle(copy)
    }

    const handleSave = (e) => {
        let copy = {...puzzle}
        copy.timestamp = Date.now()

        if (resource === e.target.id) {
            return fetch(`http://localhost:8088/${resource}/${fetchedPuzzle.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(copy)
            })
            .then(() => {navigate("/yourPuzzles")})
        } else {
            return fetch(`http://localhost:8088/${e.target.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(copy)
            })
            .then(() => {
                return fetch(`http://localhost:8088/${resource}/${fetchedPuzzle.id}`, {
                    method: "DELETE"
                })
            })
            .then(() => {navigate("/yourPuzzles")})
        }
    }

    return (
        <article className="form-container">
            <div className="form-group"> 
                <label>Puzzle Title</label>
                <input type="text" id="title" defaultValue={fetchedPuzzle.title} onChange={e => {handleTextChange(e)}}></input>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea id="description" defaultValue={fetchedPuzzle.description} onChange={e => {handleTextChange(e)}}></textarea>
            </div>
            <div className="form-group">
                <label>Mark a Difficulty</label>
                <select onChange={
                    e => {
                        const copy = {...puzzle}
                        copy.difficultyId = parseInt(e.target.value)
                        updatePuzzle(copy)
                    }
                }>
                    <option value="0">Select a Difficulty...</option>
                    {
                        difficulties.map((difficulty, index) => 
                            index + 1 === fetchedPuzzle.difficultyId
                                ? <option value={difficulty.id} key={difficulty.id} selected>{difficulty.name}</option>
                                : <option value={difficulty.id} key={difficulty.id}>{difficulty.name}</option>
                        )
                    }
                </select>
            </div>
            <div className="save-buttons">
                <button id="completePuzzles" onClick={e => {handleSave(e)}}>Save as Complete</button>
                <button id="incompletePuzzles" onClick={e => {handleSave(e)}}>Save as Incomplete</button>
            </div>
        </article>
    )
}