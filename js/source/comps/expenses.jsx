var React = require('react'),
	reactDOM = require('react-dom'),
	LineItem = require('./line-item.jsx');

//The expenses component. Acts as the controller for the application
var Expenses = React.createClass({
	getInitialState: function() {
		//All values are stored in parallel arrays associated with their respective line item
		return {
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

		reactDOM.render(<LineItem itemNo={liNo} itemId={newLI.id} callback={this.updateTotal} remove={this.removeLineItem} lastDate={lastDate[lastDate.length-1]} />, newLI);
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
		var vat = (rate == 'true') ? gross / 6 : 0,
			net = gross - vat;
		this.statePush(gross, liNo, 'gross');
		this.statePush(net, liNo, 'net');
		this.statePush(vat, liNo, 'vat');

	},

	//Remove the triggered line item from the DOM and passes 0 to all totals from that line item
	removeLineItem: function(liId, liNo) {
		var li = document.getElementById(liId);
		this.statePush(0, liNo, 'gross');
		this.statePush(0, liNo, 'net');
		this.statePush(0, liNo, 'vat');
		li.remove();
	},

	//Takes the state arrays, totals them and produces a formatted string for the total value
	//This was done to control the foramtting as exact display values can't be controlled on integers (eg: 11.50 would display as 11.5 as an integer)
	cleanFigure: function(tArray) {
		//Sub-function for rounding and combining array values
		function getTotal(a, b) {
			a = Math.round(a * 100) / 100;
			b = Math.round(b * 100) / 100;
			return a + b;
		}
		var total = String(tArray.reduce(getTotal)),
			decimal, totalInt, dVal;
		//Clean up the base total value to catch stray inputs like .x or 00x
		if(total.length > 1) {
			while(total.substring(0, 1) == '0') total = total.substring(1);
		}
		if(total == '') total = '0';
		//Get the decimal point and return just x.00 if it can't be found
		decimal = total.indexOf('.');
		if(decimal == 0) {
			total = '0' + total;
			decimal = 1;
		}
		if(decimal == -1) return total + '.00';
		else {
			//Process decimal values into clean, 2 unit outputs
			totalInt = total.substring(0, decimal);
			dVal = total.substring(decimal);
			if(dVal == '.' || dVal == '') dVal = '.00';
			else if(dVal.length > 3) dVal = dVal.substring(0, 3);
			else if(dVal.length < 3) dVal = dVal + '0';
			//Return the rounded back total with the cleaned decimals
			return totalInt + dVal;
		}
	},

	render: function() {
		//Renders the project skelleton and an initial new line item button
		return (
			<div>
			<div id='totals'>
			<span className='total'>Net: <span id='net'>£{this.cleanFigure(this.state.net)}</span></span>
			<span className='total'>VAT: <span id='vat'>£{this.cleanFigure(this.state.vat)}</span></span>
			<span className='total'>Gross: <span id='gross'>£{this.cleanFigure(this.state.gross)}</span></span>
			</div>
			<div id='lineItems'></div>
			<button onClick={this.newLineItem}>Add new expense</button>
			</div>
		);
	}
});

module.exports = Expenses;