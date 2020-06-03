import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <>
                Search by name:{" "}
                <input type="text" 
                    value={this.props.searchWord} 
                    onChange={e => this.props.handleSearch(e.target.value)} 
                />
                <br/> <br/>
            </>
        );
    }
}

export default Search;