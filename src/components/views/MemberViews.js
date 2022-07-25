import { Routes, Route } from "react-router-dom"
import { CreationScreen } from "../puzzle-creation/CreationScreen"
import { HomeFeed } from "../home-feed/HomeFeed"
import { YourPuzzlesFeed } from "../your-puzzles/YourPuzzlesFeed"

export const MemberViews = () => {

    return (
        <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/createPuzzle" element={<CreationScreen />} />
            <Route path="/yourPuzzles" element={<YourPuzzlesFeed />} />
        </Routes>
    )
}