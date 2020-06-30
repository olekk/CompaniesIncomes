import React from 'react';

function Search (props) {
    // code formatting
    // use template string to put space after search
    // props destructuring
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
