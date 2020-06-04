import React from 'react';

class Graph extends React.Component {
    constructor(props) {
       super(props);
       this.canvas = React.createRef();
    }
    componentDidMount() {
        const ctx = this.canvas.current.getContext("2d");

        let monthlyIncome = [];

        let incomes = this.props.incomesData;
        incomes.forEach(day=>{ day.date= new Date(day.date); });

        incomes.sort((a, b)=>a.date<b.date);

        let prevMonth = incomes[0].date.getMonth();
        let monthSum = 0;
        incomes.forEach(dayIncome=>{
            if(dayIncome.date.getMonth()===prevMonth) {
                monthSum+=Number(dayIncome.value);
            } else {
                monthlyIncome.push({month: prevMonth, total: monthSum});
                monthSum=Number(dayIncome.value);
                prevMonth=dayIncome.date.getMonth();
            }
        });
        monthlyIncome.push({month: prevMonth, total: monthSum});
        console.log(monthlyIncome);

        
        ctx.moveTo(20, 0);
        ctx.lineTo(20, this.props.height-20);
        ctx.lineTo(this.props.width, this.props.height-20);
        ctx.stroke();
        
        ctx.font = "14px Sans-serif";
        ctx.fillText("$/T", 1, this.props.height-5)
        
        let maxIncome = Math.max(monthlyIncome.map(x=>x.total));
        
        while(maxIncome>=0) {
            // let s=10;

        }

      }

    render() {
        return(
            <canvas ref={this.canvas} width={this.props.width} height={this.props.height} />
        )
      }
}
export default Graph;