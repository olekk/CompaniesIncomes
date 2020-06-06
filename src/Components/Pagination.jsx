import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            range: 0,
        }
    }
    makeButtons() {
        let butts = [];
        for(let i=this.state.range; i<this.state.range+(this.props.pageQty>10 ? 10 : this.props.pageQty); i++) {
            butts.push(
                <button key={i} 
                    onClick={()=>this.props.handlePageChange(i)} 
                    className={this.props.page===i ?"currPage":"" }
                >{i+1}</button>
            );
        }
        return butts;
    }

    scroll(dir) {
        if(this.state.range+dir>=0 && this.state.range+dir+10<=this.props.pageQty) 
            this.setState({range: this.state.range+dir});
    }
    
    render() {
        return (
            <div className="pagination">
                <button onClick={()=>this.scroll(-1)}>{"<"}</button>
                {this.makeButtons()}
                <button onClick={()=>this.scroll(1)}>{">"}</button>
            </div>
        );
    }
}

export default Pagination;