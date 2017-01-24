var React = require('react');

var Error = Reacte.createClass({
	render: function(){
		if(code == 404){
			return(
				<div id="error">
					<h1>Welcome to Atlanta</h1>
					<p>Where the playas play</p>
				</div>
			);
		} else {
			return(
				<div id="error">
					<h3>We're Sorry, but there was an error with your request</h3>
				</div>
			);
		}
	}
});

module.exports = Error;
