import { Routes, Route } from "react-router-dom"
import { CreationScreen } from "../puzzle-creation/CreationScreen"

export const MemberViews = () => {

    return (
        <Routes>
            <Route path="/" element={<h1>feed</h1>} />
            <Route path="/createPuzzle" element={<CreationScreen />} />
            <Route path="/yourPuzzles" element={<h1>Your Puzzles</h1>} />
        </Routes>
    )
}