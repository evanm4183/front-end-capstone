export const FilterBar = ({setUserSearch, setTitleSearch, setShowLiked}) => {

    return (
        <div className="filter-bar-container">
            <div className="filter-group-left">
                <label className="filter-labels">Search by Author</label>
                <input 
                    type="text"
                    placeholder="Enter a Username..."
                    onChange={(e) => {
                        setUserSearch(e.target.value.toLowerCase())
                    }}
                ></input>
            </div>
            <div className="filter-group">
                <label className="filter-labels">Search by Title</label>
                <input 
                    type="text"
                    placeholder="Enter a Title..."
                    onChange={(e) => {
                        setTitleSearch(e.target.value.toLowerCase())
                    }}
                ></input>
            </div>
            <div className="filter-group-right">
                <label className="filter-labels">Show Only Liked Puzzles</label>
                <input 
                    type="checkbox"
                    onChange={(e) => {
                        setShowLiked(e.target.checked)
                    }}
                ></input>
            </div>
        </div>
    )
}