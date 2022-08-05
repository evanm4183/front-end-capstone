import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const PuzzleAttributesForm = ({solution, display}) => {
    const user = JSON.parse(localStorage.getItem("localUser"))

    const [difficulties, setDifficulties] = useState([])
    const [puzzle, updatePuzzle] = useState({
        solution: solution,
        display: display, 
        userId: user.id,
        title: "",
        description: "",
        difficultyId: 0,
        timestamp: 0
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

    return (
        <article className="form-container">
            <div className="form-group">
                <label>Puzzle Title</label>
                <input type="text" id="title" onChange={e => {handleTextChange(e)}}></input>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea id="description" onChange={e => {handleTextChange(e)}}></textarea>
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
                        difficulties.map(difficulty => 
                            <option value={difficulty.id} key={difficulty.id}>{difficulty.name}</option>
                        )
                    }
                </select>
            </div>
            <div className="save-buttons">
                <button onClick={
                    e => {
                        const copy = {...puzzle}
                        copy.timestamp = Date.now()

                        return fetch(`http://localhost:8088/completePuzzles`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            }, 
                            body: JSON.stringify(copy)
                        })
                        .then(() => {navigate("/yourPuzzles")})
                    }
                }>Save as Complete</button>
                <button onClick={
                    e => {
                        const copy = {...puzzle}
                        copy.timestamp = Date.now()

                        return fetch(`http://localhost:8088/incompletePuzzles`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            }, 
                            body: JSON.stringify(copy)
                        })
                        .then(() => {navigate("/yourPuzzles")})
                    }
                }>Save as Incomplete</button>
            </div>
        </article>
    )
}