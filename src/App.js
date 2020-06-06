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
    let getCompanies = async () => {
      return fetch('https://recruitment.hal.skygate.io/companies')
        .then(res => {if(!res.ok) {throw Error(res.statusText);} return res.json()})
        .catch(error => alert(error));
    }
    
    let getIncomes = async (_id) => {
      return fetch('https://recruitment.hal.skygate.io/incomes/'+_id)
        .then(res => {if(!res.ok) {throw Error(res.statusText);} return res.json()})
        .catch(error => alert(error));
    }
    
    let makeState = async () => {
      let companies = await getCompanies();
      for(let i=0; i<companies.length; i++) { //companies.length
        let incomes = await getIncomes(companies[i].id);
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
    // console.log(this.state);
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
