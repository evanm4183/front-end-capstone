export const SearchBar = ({setTitleSearch, setShowComplete}) => {

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
            <div className="filter-group">
                <input type="radio" name="completion-status" id="complete" defaultChecked
                    onChange={(e) => {
                        setShowComplete(true)
                    }}
                />
                <label htmlFor="complete">Show Complete</label>
            </div>
            <div className="filter-group">
                <input type="radio" name="completion-status" id="incomplete"
                    onChange={(e) => {
                        setShowComplete(false)
                    }}
                />
                <label htmlFor="incomplete">Show Incomplete</label>
            </div>
        </div>
    )
}