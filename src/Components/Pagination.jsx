import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            range: 0,
            pageQty: this.props.pageQty
        }
    }
    // don't use it like this. and don't try to mutate state this way
    static getDerivedStateFromProps(props, currState) {
        if (currState.pageQty !== props.pageQty) {
          return {
            pageQty: props.pageQty,
            range: 0,
          }
        }
        return null
      }

    // Array.prototype.map.
    // btw poor indentation. use eslint and prettier
    // line 32 i+1 ? don't do this
    makeButtons() {
        let butts = [];
        for(let i=this.state.range; i<this.state.range+(this.state.pageQty>10 ? 10 : this.state.pageQty); i++) {
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
        if(this.state.range+dir>=0 && this.state.range+dir+(this.state.pageQty>10 ? 10 : this.state.pageQty)<=this.state.pageQty)
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
