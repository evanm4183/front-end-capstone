import { useState, useEffect } from "react"
import { PuzzleGridForm } from "./PuzzleGridForm"
import "./PuzzleCreation.css"
import { PuzzleAttributesForm } from "./PuzzleAttributesForm"
import { generateSolution } from "../../solution-generator/solutionGenerator"

export const CreationScreen = () => {
    const [solution, updateSolution] = useState(Array(81).fill(0))
    const [display, updateDisplay] = useState(Array(81).fill(0))
    const [editedIndex, updateEditedIndex] = useState()

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
                <PuzzleAttributesForm solution={solution} display={display}/>
            </article>
        </>
    )
}