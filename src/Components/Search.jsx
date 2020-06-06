import React from 'react';

function Search (props) {
    return (
        <div id="search">
            Search:{" "}
            <input type="text" 
                value={props.searchWord} 
                onChange={e => props.handleSearch(e.target.value)} 
                placeholder={"Company name"}
            />
            <br/> <br/>
        </div>
    );
}

export default Search;