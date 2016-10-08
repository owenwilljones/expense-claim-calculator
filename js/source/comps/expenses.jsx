var React = require('react'),
	reactDOM = require('react-dom');

//The expenses component. Acts as a parent to all other elements and the controller for the application
var Expenses = React.createClass({
	getInitialState: function() {
		//All values are stored in parallel arrays associated with their respective line item
		return {
			liIDs: [],
			gross: [],
			net: [],
			vat: []
		};
	},

	newLineItem: function(event) {
		//Retrieve the lineItems container and append it with a new lineItem divwhich will contain the newly rendered lineItem component
		var liContainer = document.getElementById('lineItems'),
			newLI = document.createElement('div'),
			liNo = document.getElementsByClassName('lineItem').length;
		newLI.id = 'li_' + liNo;
		newLI.className = 'lineItem';
		liContainer.appendChild(newLI);
		//Add this new container's id to the liIDs state array
		this.statePush(newLI.id, this.state.liIDs, 'liIDs');
	},

	//A function for pushing new values to the different state arrays dynamically
	statePush: function(val, stateArr, stateName) {
		var update = {};
		stateArr.push(val);
		update[stateName] = stateArr;
		this.setState(update);
	},

	render: function() {
		//Renders the project skelleton and an initial new line item button
		return (
			<div id='expenseInner'>
			<button onClick={this.newLineItem}>Add new expense</button>
			<div id='lineItems'></div>
			</div>
		);
	}
});

module.exports = Expenses;