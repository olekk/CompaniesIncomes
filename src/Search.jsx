import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div id="search">
                Search:{" "}
                <input type="text" 
                    value={this.props.searchWord} 
                    onChange={e => this.props.handleSearch(e.target.value)} 
                    placeholder={"Company name"}
                />
                <br/> <br/>
            </div>
        );
    }
}

export default Search;