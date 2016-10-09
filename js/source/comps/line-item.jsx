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
			},
			intDate: {
				'day': '',
				'month': '',
				'year': ''
			}
		};
	},

	componentWillMount: function() {
		if(this.props.lastDate) {
			this.setState({
				intDate: {
					day: this.props.lastDate.getElementsByClassName('day')[0].value,
					month: this.props.lastDate.getElementsByClassName('month')[0].value,
					year: this.props.lastDate.getElementsByClassName('year')[0].value
				}
			});
		} else {
			var d = new Date();
			this.setState({
				intDate: {
					day: d.getDate(),
					month: d.getMonth() + 1,
					year: d.getFullYear()
				}
			});
		}
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
			date: <span className='date'>
			<input type='text' className='day' defaultValue={this.state.intDate.day} /> / 
			<input type='text' className='month' defaultValue={this.state.intDate.month} /> / 
			<input type='text' className='year' defaultValue={this.state.intDate.year} />
			</span>
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