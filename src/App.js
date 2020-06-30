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
    // functions should be implemented above and bound in constructor or assigned to const
    let getCompanies = async () => {
      // redundant async
      return fetch('https://recruitment.hal.skygate.io/companies')
          .then(res => {if(!res.ok) {throw Error(res.statusText);} return res.json()})
          .catch(error => alert(error));
    }

    let getIncomes = async (_id) => {
      // redundant async
      return fetch('https://recruitment.hal.skygate.io/incomes/'+_id)
          .then(res => {if(!res.ok) {throw Error(res.statusText);} return res.json()})
          .catch(error => alert(error));
    }

    let makeState = async () => {
      let companies = await getCompanies();
      for(let i=0; i<companies.length; i++) { //companies.length
        // you should use Promise.all, now you are fetching data sequentially
        // don't use let
        let incomes = await getIncomes(companies[i].id);
        incomes.incomes.forEach(income=>{
          income.date = new Date(income.date)
        })
        // don't mutate data
        companies[i].incomes = incomes.incomes;
      }

      return {companies: companies};
    }

    // you are setting state twice, and you don't understand how react works and it's methods
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

    // you'd better learn devtools and don't leave comments
    // console.log(this.state);
    // check content od companies and then return something or loader.
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
