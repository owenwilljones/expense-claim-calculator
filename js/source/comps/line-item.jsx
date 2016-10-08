var React = require('react'),
	reactDOM = require('react-dom');

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
			}
		};
	},

	updateType: function(event) {
		this.setState({type: event.target.value}, function() {
			this.enableGross();
		});
	},

	updateDesc: function(event) {
		this.setState({desc: event.target.value}, function() {
			this.enableGross();
		});
	},

	enableGross: function() {
		var container = document.getElementById(this.props.itemId),
			gross = container.getElementsByClassName('gross')[0];
		if(this.state.type !== '' && this.state.desc !== '') {
			gross.disabled = false;
		} else gross.disabled = true;
	},

	render: function() {
		var types = Object.keys(this.state.vat), opts = [], i;
		for(i = 0; i < types.length; i++) {
			opts.push(<option value={this.state.vat[types[i]]}>{types[i]}</option>)
		}
		return (
			<div>
			expense type: <select onChange={this.updateType}>
			<option></option>
			{opts}
			</select>
			description: <input type='text' onChange={this.updateDesc} />
			Gross Expense: <input type='text' className='gross' disabled />
			</div>
		);
	}
});

module.exports = LineItem;