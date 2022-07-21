import { Routes, Route } from "react-router-dom"

export const MemberViews = () => {

    return (
        <Routes>
            <Route path="/" element={<h1>feed</h1>} />
            <Route path="/createPuzzle" element={<h1>Puzzle creation</h1>} />
            <Route path="yourPuzzles" element={<h1>Your Puzzles</h1>} />
        </Routes>
    )
}