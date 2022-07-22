import { useState, useEffect } from "react"
import { PuzzleForm } from "./PuzzleForm"
import "./PuzzleCreation.css"
import { PuzzleAttributesForm } from "./PuzzleAttributesForm"

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
                        <PuzzleForm boardArr={solution} updateArr={updateSolution} idName={"solution"} isSolution={true} updateEditedIndex={updateEditedIndex}/>
                    </section>
                    <section className="puzzle-form-container">
                        <h3 className="grid-title">Solver's View</h3>
                        <PuzzleForm boardArr={display} updateArr={updateDisplay} idName={"display"} />
                    </section>
                </div>
                <PuzzleAttributesForm />
            </article>
        </>
    )
}