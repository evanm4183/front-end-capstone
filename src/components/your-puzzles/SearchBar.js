export const SearchBar = ({setTitleSearch}) => {

    return (
        <div className="search-bar-container">
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
        </div>
    )
}