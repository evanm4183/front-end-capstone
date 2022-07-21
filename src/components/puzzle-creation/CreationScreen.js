import { useState, useEffect } from "react"
import { PuzzleForm } from "./PuzzleForm"
import "./PuzzleCreation.css"

export const CreationScreen = () => {
    const [solution, updateSolution] = useState(Array(81).fill(0))
    const [display, updateDisplay] = useState(Array(81).fill(0))

    return (
        <>
            <h1>Creation Screen</h1>
            <PuzzleForm boardArr={solution} updateArr={updateSolution} idName={"sol"}/>
        </>
    )
}