import React from 'react';
import Pagination from './Pagination.jsx'
import Details from './Details.jsx'

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            details: 0,
            start: null,
            end: null
        }
    }

    visibleSortedCos() {
        let incomes = this.props.companiesIncomes
        .map(inc => ({id: inc.id, total: inc.incomes
            .map(o=>Number(o.value))
            .reduce((acc, cur)=>acc+cur)}))
        .sort((a, b) => (a.total < b.total)?1:-1);

        let rows = [];
        incomes.forEach((el)=> {
            let companyData = this.props.companies.filter(e=>e.id===el.id)
            if(companyData.length>0) 
                rows.push({...companyData[0], ...el});
        }, this);

        rows=rows.filter(el=>el.name.search(this.props.searchWord)!==-1);
        this.avaliableRows = rows.length;

        rows=rows.slice(this.props.page*10, this.props.page*10+10);

        let trs = [];
        rows.forEach((el, i) => {
            trs.push(
                <tr key={i+1} onClick={()=>this.details(el.id)}>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.city}</td>
                    <td>{el.total.toFixed(2)}</td>
                </tr>
            )
        });
        return trs;
    }

    details(_id) {
        let companyIncomes = [];
        if(_id) {
            companyIncomes = this.props.companiesIncomes.filter(x => x.id===_id)[0].incomes.sort((a, b)=>a.date - b.date);
        }

        this.setState({
            details: _id,
            start: _id ? companyIncomes[0].date : null,
            end: _id ? companyIncomes[companyIncomes.length-1].date : null
        });
    }

    handleRangeChange(isStart, date) {
        if(isStart)
            this.setState({start: new Date(date)});
        else
            this.setState({end: new Date(date)});
    }

    render() {
        return(
            <div className="table">
                {this.state.details!==0 &&
                    <Details 
                        companyData={this.props.companies.filter(x => x.id===this.state.details)[0]}
                        companyIncomes={this.props.companiesIncomes.filter(x => x.id===this.state.details)[0].incomes}
                        id={this.state.details}
                        start={this.state.start}
                        end={this.state.end}
                        handleRangeChange={(isStart, date) => this.handleRangeChange(isStart, date)}
                        close={()=>this.details(0)}
                    />
                }
                <table>
                    <thead>
                        <tr key={0}>
                            <th>Id</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Total Income</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.visibleSortedCos()
                    }
                    </tbody>
                </table>
                
                <Pagination 
                page={this.props.page}
                pageQty={this.avaliableRows/10}
                handlePageChange={(page)=>this.props.handlePageChange(page)}
                />
            </div>
        );
    }
}
export default Table;