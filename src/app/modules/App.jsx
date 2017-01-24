var React = require('react');
var Link = require('react-router').Link;

var App = React.createClass({
	render() {
		return (
			<div class="view-container">
				<h1>Inspector Home</h1>
				<ul role="nav">
					<li><Link to="/inspector/templates">Templates</Link></li>
					<li><Link to="/inspector/reports">Reports</Link></li>
					<li><Link to="/inspector/inspection">Inspection</Link></li>
				</ul>
			</div>
		);
	}
});

module.exports = App;
