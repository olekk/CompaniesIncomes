import React from 'react';

class Graph extends React.Component {
    constructor(props) {
       super(props);
       this.canvas = React.createRef();
    }


    // because you use life cycle methods like below in multiple places it's obvious you don't understand how it works
    // you should learn react from scratch and before that, learn basics of js
    // this should be extracted to the separate methods!
    // stop using let and mutate data
    // using if/else is in most cases anti pattern
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

        ctx.strokeStyle="black";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(50, 0);
        ctx.lineTo(50, this.props.height-20);
        ctx.lineTo(this.props.width, this.props.height-20);
        ctx.stroke();
        ctx.closePath();

        ctx.font = "14px Sans-serif";
        ctx.fillText("$ / T", 10, this.props.height-5)

        let maxIncome = Math.max(...monthlyIncome.map(x=>x.total));
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let i=1;
        while(i>=0) {
            ctx.beginPath();
            let axis=(Math.abs(i-1)+.03)*(this.props.height-40);
            ctx.moveTo(50, axis);
            ctx.lineTo(this.props.width, axis);
            ctx.stroke();
            ctx.closePath();
            ctx.fillText(Math.floor(i*maxIncome), 5, (Math.abs(i-1)+.03)*(this.props.height-40));
            i-=0.1;
        }



        i=0;
        while(i<monthlyIncome.length) {
            monthlyIncome[i].x = (i/(monthlyIncome.length+1))*this.props.width+50;

            ctx.beginPath();
            ctx.moveTo(monthlyIncome[i].x, 0);
            ctx.lineTo(monthlyIncome[i].x, this.props.height-20);
            ctx.stroke();
            ctx.closePath();
            i++;
        }

        ctx.strokeStyle="#FF0000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(50, Math.abs((this.props.height*(monthlyIncome[0].total/maxIncome))-this.props.height+20));


        i=0;
        while(i<monthlyIncome.length) {
            ctx.fillText(months[monthlyIncome[i].month], monthlyIncome[i].x, this.props.height-5);

            ctx.lineTo(monthlyIncome[i].x, Math.abs((this.props.height*(monthlyIncome[i].total/maxIncome))-this.props.height+20))

            i++;
        }
        ctx.lineTo(this.props.width, Math.abs((this.props.height*(monthlyIncome[monthlyIncome.length-1].total/maxIncome))-this.props.height+20))
        ctx.stroke();
        ctx.closePath();
      }

    render() {
        return(
            <canvas ref={this.canvas} width={this.props.width} height={this.props.height} />
        )
      }
}
export default Graph;
