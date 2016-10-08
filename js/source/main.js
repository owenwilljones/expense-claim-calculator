var React = require('react'),
	reactDOM = require('react-dom'),
	Expenses = require('./comps/expenses.jsx');

//Renders the initial expenses component. This will act as the main parent and container for the application
reactDOM.render(<Expenses />, document.getElementById('expenses'));