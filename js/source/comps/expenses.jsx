var React = require('react'),
	reactDOM = require('react-dom'),
	LineItem = require('./line-item.jsx');

//The expenses component. Acts as the controller for the application
var Expenses = React.createClass({
	getInitialState: function() {
		//All values are stored in parallel arrays associated with their respective line item
		return {
			liIDs: [],
			gross: [0],
			net: [0],
			vat: [0]
		};
	},

	newLineItem: function(event) {
		//Retrieve the lineItems container and append it with a new lineItem divwhich will contain the newly rendered lineItem component
		var liContainer = document.getElementById('lineItems'),
			newLI = document.createElement('div'),
			liNo = document.getElementsByClassName('lineItem').length,
			lastDate = document.getElementsByClassName('date');
		newLI.id = 'li_' + liNo;
		newLI.className = 'lineItem';
		liContainer.appendChild(newLI);
		//Add this new container's id to the liIDs state array
		this.statePush(newLI.id, liNo, 'liIDs');

		reactDOM.render(<LineItem itemNo={liNo} itemId={newLI.id} callback={this.updateTotal} lastDate={lastDate[lastDate.length-1]} />, newLI);
	},

	//A function for pushing new values to the different state arrays dynamically
	statePush: function(val, index, stateName) {
		var update = {}, stateArr = this.state[stateName];
		stateArr[index] = val;
		update[stateName] = stateArr;
		this.setState(update);
	},

	//Updates the totals based on changes to the gross field on line items
	updateTotal: function(gross, liNo, rate) {
		console.log(rate);
		var vat = (rate == 'true') ? Math.round((gross / 6) * 100) / 100 : 0,
			net = Math.round((gross - vat) * 100) / 100;
			console.log(vat);
		this.statePush(gross, liNo, 'gross');
		this.statePush(net, liNo, 'net');
		this.statePush(vat, liNo, 'vat');

	},

	render: function() {
		function getTotal(a, b) {
			a = Math.round(a * 100) / 100;
			b = Math.round(b * 100) / 100;
			return a + b;
		}
		//Renders the project skelleton and an initial new line item button
		return (
			<div id='expenseInner'>
			<div id='totals'>
			Net: <span id='net'>£{this.state.net.reduce(getTotal)}</span>
			VAT: <span id='vat'>£{this.state.vat.reduce(getTotal)}</span>
			Gross: <span id='gross'>£{this.state.gross.reduce(getTotal)}</span>
			</div>
			<button onClick={this.newLineItem}>Add new expense</button>
			<div id='lineItems'></div>
			</div>
		);
	}
});

module.exports = Expenses;