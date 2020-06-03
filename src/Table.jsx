import React from 'react';
import Pagination from './Pagination.jsx'

class Table extends React.Component {

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
                <tr key={i+1}>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.city}</td>
                    <td>{el.total.toFixed(2)}</td>
                </tr>
            )
        });
        return trs;
    }

    render() {
        return(
            <>
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
            </>
        );
    }
}
export default Table;