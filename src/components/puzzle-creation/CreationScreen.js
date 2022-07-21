import { useState, useEffect } from "react"
import { PuzzleForm } from "./PuzzleForm"
import "./PuzzleCreation.css"

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
                <section className="puzzle-form-container">
                    <h3>Solution</h3>
                    <PuzzleForm boardArr={solution} updateArr={updateSolution} idName={"solution"} isSolution={true} updateEditedIndex={updateEditedIndex}/>
                </section>
                <section className="puzzle-form-container">
                    <h3>Solver's View</h3>
                    <PuzzleForm boardArr={display} updateArr={updateDisplay} idName={"display"} />
                </section>
            </article>
        </>
    )
}