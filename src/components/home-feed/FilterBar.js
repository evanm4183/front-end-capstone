export const FilterBar = ({setUserSearch, setTitleSearch, setShowLiked}) => {

    return (
        <div className="filter-bar-container">
            <div className="filter-group-left">
                <label className="filter-labels">Search by Author</label>
                <input type="text"></input>
            </div>
            <div className="filter-group">
                <label className="filter-labels">Search by Title</label>
                <input type="text"></input>
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