import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { PuzzleGridForm } from "../puzzle-creation/PuzzleGridForm"
import { PuzzleAttributesFormEdit } from "./PuzzleAttributesFormEdit"
import { generateSolution } from "../../solution-generator/solutionGenerator"
import "../puzzle-creation/PuzzleCreation.css"

export const EditScreen = () => {
    const {resource, puzzleId} = useParams()
    const [puzzle, setPuzzle] = useState({})
    const [solution, updateSolution] = useState([])
    const [display, updateDisplay] = useState([])
    const [editedIndex, updateEditedIndex] = useState()

    useEffect(() => {
        fetch(`http://localhost:8088/${resource}/${puzzleId}`)
        .then(response => response.json())
        .then(data => {
            setPuzzle(data)
            updateSolution(data.solution)
            updateDisplay(data.display)
        })
    }, [])

    useEffect(() => {
        const copy = [...display]
        copy[editedIndex] = solution[editedIndex]
        updateDisplay(copy)
    }, [solution])

    return (
        <>
            <article className="puzzle-screen-container">
                <div className="puzzle-grids-container">
                    <section className="puzzle-form-container">
                        <h3 className="grid-title">Solution</h3>
                        <PuzzleGridForm boardArr={solution} updateArr={updateSolution} idName={"solution"} isSolution={true} updateEditedIndex={updateEditedIndex}/>
                        <button 
                            className="template-button" 
                            onClick={() => {
                                const template = generateSolution()
                                updateSolution(template)
                                updateDisplay(template)
                            }}
                        >Generate Template</button>
                    </section>
                    <section className="puzzle-form-container">
                        <h3 className="grid-title">Solver's View</h3>
                        <PuzzleGridForm boardArr={display} updateArr={updateDisplay} idName={"display"} />
                        <footer className="board-footer"><em>Input underscores to represent hidden squares</em></footer>
                    </section>
                </div>
                {
                    JSON.stringify(puzzle) !== "{}"
                        ? <PuzzleAttributesFormEdit 
                            solution={solution} 
                            display={display} 
                            fetchedPuzzle={puzzle}
                            resource={resource}/>
                        : "" 
                }
            </article>
        </>
    )
    
}