# CompaniesIncomes
App created in React using create-react-app tool.
It shows informations about companies from database.
All data is downloaded from external server.

## What does it do?

Companies data are shown in tables, sorted by total income in descending order. You can search companies by name. 
By clicking on a row you can open details view, containing more informations about company, dropdown menus to set time scope for total and average income. All company monthly incomes are shown in a graph.

App is responsive and clear.

Whole data are downloaded at first, to show properly sorted tables. It is stored in array of objects. Each object is one company and contains array with company incomes. Each incomes array is downloaded from separate file and pushed into its corresponding company object.

## How it does it?

* "App" component is rendering "Search" and "Table" components. 

* "Table" recieves all data, filters them and displays a 
table of 10 companies.

* "Table" component, beside table, renders "Details" if they're trigerred and "Pagination" component.

* "Details" is recieving data from one chosen company, executes calculations, renders them and "Graph" component. 

* "Graph" component recieves just incomes from chosen company and renders HTML canvas element with drawn graph. 

* "Pagination" renders maximum of 10 buttons changing page and 2 buttons scrolling them.

* "Search" renders text input that changes Apps state on every text modification.

## How to run app?

You can run it locally on your computer.

[Download project](https://github.com/olekk/CompaniesIncomes/archive/master.zip)

You have to have node.js installed.

[Download node.js](https://nodejs.org/en/download/)

If it is installed (try command: `npm -v` in terminal to check), you can run 'setProject.bat' (for Windows) or 'setProject.sh' (for Linux), it installs neccesary node modules and opens a project in development build.

To use optimized production build, type: `npm run build` and `serve -s build`
