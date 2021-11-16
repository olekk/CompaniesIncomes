import React from 'react';
import Table from './Components/Table.jsx'
import Search from './Components/Search.jsx'

class App extends React.Component {
  state = {
    companies: [],
    page: 0,
    searchWord: ""
  }

  componentDidMount() {
    let makeState = async () => {
      let companies = await fetch('https://recruitment.hal.skygate.io/companies')
        .then(res => res.json())
        .catch(error => console.log('Error downloading companies file:', error));

      let allIncomes = await Promise.all(companies.map(c => 
          fetch('https://recruitment.hal.skygate.io/incomes/'+c.id)
          .then(res => res.json())))
        .catch(error => console.log('Error downloading incomes files:', error))
         
      
      for(let i=0; i<companies.length; i++) {
        let incomes = allIncomes.filter(x=>x.id===companies[i].id)[0];
        incomes.incomes.forEach(income=>{
          income.date = new Date(income.date)
        })
        companies[i].incomes = incomes.incomes;
      }
      return {companies: companies};
    }

    this.setState({
      companies: []
    }, () => makeState().then((newState) => this.setState(newState)));

  }

  handleSearch(keyword) {
    this.setState({searchWord: keyword, page: 0});
  }

  handlePageChange(page) {
    this.setState({page: page});
  }

  render() {
    return (
      <>
        {
          this.state.companies.length ?
          <>
            <Search 
              handleSearch={(searchWord) => this.handleSearch(searchWord)}
              searchWord={this.state.searchWord}
            />
            <Table
              companies={this.state.companies}
              page={this.state.page}
              searchWord={this.state.searchWord}
              handlePageChange={(page)=>this.handlePageChange(page)}
            />
          </>
          :
          <h1>Loading...</h1>
        }
      </>
      );
    }
  }

export default App;
