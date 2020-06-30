import React from 'react';
import Graph from './Graph.jsx'

class Details extends React.Component {
    // redundant, use handleRangeChange bellow
    setStartDate(event) {
        this.props.handleRangeChange(true, event.target.value);
    }

    setEndDate(event) {
        this.props.handleRangeChange(false, event.target.value);
    }

    makeDetails() {
        // you are mutating data
        let details = [];
        let companyData = this.props.companyData;
        let companyIncomes = companyData.incomes.sort((a, b)=>a.date - b.date);

        let makeOptions = (isStart) => {
            // months in conant
            // every function you wrote is not optimal and do necessary operations.
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            // what means o ?
            return companyIncomes.filter(o=>isStart? o.date<this.props.end : o.date>this.props.start )
            .map((o, i)=>{
                return (
                    <option key={i} value={o.date}>{o.date.getDate()+" "+months[o.date.getMonth()]+" "+o.date.getFullYear()}</option>
                )
            })
        }
        // this is absolutely unreadable code. You are mutating data, every render you calculate state.
        // you should learn how to write clean and simple code!
        // this component should just display data instead of doing everything
        details.push(
            <>
                Details of "{companyData.name}" <br/>
                Id: {companyData.id} <br/>
                City: {companyData.city} <br/>
                Last month income: {
                    companyIncomes.filter(o=>o.date.getMonth() === companyIncomes[companyIncomes.length-1].date.getMonth() && o.date.getFullYear() === companyIncomes[companyIncomes.length-1].date.getFullYear())
                    .map(o=>Number(o.value)).reduce((acc, cur)=>acc+cur).toFixed(2)
                } <br/>
                <span>Set time range for data below:</span>  <br/>
                From:{` `}
                <select name="startDate" id="startDate" onChange={e=>this.setStartDate(e)} value={this.props.start}>
                    {makeOptions(true)}
                </select>
                {` To: `}
                <select name="endDate" id="endDate" onChange={e=>this.setEndDate(e)} value={this.props.end}>
                    {makeOptions(false)}
                </select> <br/>
            </>
        );

        companyIncomes = companyIncomes.filter(income=>income.date >= this.props.start && income.date <= this.props.end);

        details.push(
            <>
                Total income: {companyIncomes.map(o=>Number(o.value)).reduce((acc, cur)=>acc+cur).toFixed(2)} <br/>
                Average income: {(companyIncomes.map(o=>Number(o.value)).reduce((acc, cur)=>acc+cur)/companyIncomes.length).toFixed(2)} <br/>
            </>
        );

        return details
    }

    render() {
        return (
                <div id="details">
                        <button onClick={()=>this.props.close()}> <span role="img" aria-label="close">&#x2716;</span></button>
                    <main>
                        {this.makeDetails()}
                    </main>
                    <Graph
                        incomesData={this.props.companyData.incomes}
                        width={500}
                        height={500}
                    />
                </div>
        );
    }
}

export default Details;
