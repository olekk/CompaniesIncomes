import React from 'react';

class Pagination extends React.Component {

    makeButtons() {
        let butts = [];
        for(let i=0; i<this.props.pageQty; i++) {
            butts.push(
                <button key={i} 
                    onClick={()=>this.props.handlePageChange(i)} 
                    className={this.props.page===i ?"currPage":"" }
                >{i+1}</button>
            );
        }
        return butts;
    }
    
    render() {
        return (
            <div>
                {this.makeButtons()}
            </div>
        );
    }
}

export default Pagination;