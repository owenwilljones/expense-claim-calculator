var React = require('react'),
	reactDOM = require('react-dom');

//The line items component. Renders a new line item sub-form which feeds back to the expenses component
var LineItem = React.createClass({
	getInitialState: function() {
		return {
			type: '',
			desc: '',
			vat: {
				'Telephone': true,
				'Public Transport & Taxis': false,
				'Computer Consumables': true,
				'Subsistence': true,
				'Overseas Travel': false
			},
			day: '',
			month: '',
			year: ''
		};
	},

	//Sets the values for the date fields pre-render. Either the values from the previous line item or today's date
	componentWillMount: function() {
		if(this.props.lastDate) {
			this.setState({
				day: this.props.lastDate.getElementsByClassName('day')[0].value,
				month: this.props.lastDate.getElementsByClassName('month')[0].value,
				year: this.props.lastDate.getElementsByClassName('year')[0].value
			});
		} else {
			var d = new Date();
			this.setState({
				day: d.getDate(),
				month: d.getMonth() + 1,
				year: d.getFullYear()
			});
		}
	},

	//A single function for validating the dates and passing them to their respective states
	updateDate: function(event) {
		//Get the class of the date field that changed and route validation accordingly. Additionally save other elements for validation later
		var dateClass = event.target.getAttribute('class'),
			val = event.target.value,
			error = document.getElementsByClassName('error')[0],
			shortMonths = [4, 5, 9, 11],
			month, d, dayCheck = false, update = {};
		//If any of the values aren't numbers or are less than 0, stop the function immediately
		if(isNaN(val) || val < 0) {
			event.target.value = val = '';
			error.innerHTML = 'Please enter a number more than 0 in the date fields';

		//Day validation. Checks if the day is more than allowed for the month currently entered for the expense date
		} else if(dateClass == 'day') {
			month = event.target.parentNode.getElementsByClassName('month')[0].value;
			if(month == 2 && val > 29) dayCheck = true;
			else if(shortMonths.indexOf(month) != -1 && val > 30) dayCheck = true;
			else if(val > 31) dayCheck = true;
			if(dayCheck) {
				event.target.value = val = 01;
				error.innerHTML = 'Please enter a valid date within the month of your expense date';
			}

		//Month validation. Checks if the month is more than 12
		} else if(dateClass == 'month') {
			if(val > 12) {
				event.target.value = val = 01;
				error.innerHTML = 'Please enter a valid month from 1 to 12';
			}

		//Year validation. Checks if the year is more than the current year
		} else if(dateClass == 'year') {
			d= new Date();
			if(val > d.getFullYear()) {
				event.target.value = val = d.getFullYear();
				error.innerHTML = 'Please enter an expense from this year or previous years';
			}
		}

		//Pass validation result to relevant state
		update[dateClass] = val;
		this.setState(update, function() {
			this.enableGross();
		});
	},

	//Updates the expense type state variable
	updateType: function(event) {
		this.setState({type: event.target.value}, function() {
			this.enableGross();
		});
	},

	//Updates the expense description state variable
	updateDesc: function(event) {
		this.setState({desc: event.target.value}, function() {
			this.enableGross();
		});
	},

	//Checks all other relevant state variables and, if all others are filled in, allows the user to enter the gross for their expense
	enableGross: function() {
		var container = document.getElementById(this.props.itemId),
			gross = container.getElementsByClassName('gross')[0];
		if(this.state.type !== '' && this.state.desc !== '' && this.state.day !== '' && this.state.month !== '' && this.state.year !== '') {
			gross.disabled = false;
		} else gross.disabled = true;
	},

	//Triggers the callback prop and sends the gross value back to expenses for processing
	triggerCallback: function(event) {
		var error = document.getElementsByClassName('error')[0],
			val = event.target.value;
		//If the gross isn't a number or is less than 0, an error is displayed and the total is updated with a 0 for that line item
		if(isNaN(val) || val < 0) {
			event.target.value = 0;
			error.innerHTML = 'Please enter a number greater than 0';
		} else this.props.callback(val, this.props.itemNo, this.state.type);
	},

	render: function() {
		//Loop over the vat object to create options for the expense type select field
		var types = Object.keys(this.state.vat), opts = [], i;
		for(i = 0; i < types.length; i++) {
			opts.push(<option value={this.state.vat[types[i]]}>{types[i]}</option>)
		}
		//The full line items sub-form plus an error field
		return (
			<div>
			date: <span className='date'>
			<input type='text' className='day' defaultValue={this.state.day} onChange={this.updateDate} /> / 
			<input type='text' className='month' defaultValue={this.state.month} onChange={this.updateDate} /> / 
			<input type='text' className='year' defaultValue={this.state.year} onChange={this.updateDate} />
			</span>
			expense type: <select onChange={this.updateType}>
			<option></option>
			{opts}
			</select>
			description: <input type='text' onChange={this.updateDesc} />
			Gross Expense: £<input type='text' className='gross' onChange={this.triggerCallback} disabled />
			<p className='error'></p>
			</div>
		);
	}
});

module.exports = LineItem;