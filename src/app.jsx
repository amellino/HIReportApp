/*TODO:
	* Add support for Pictures (upgrade form JSON? Write own forms JSON?)
	* Think about making Zones and Features the same and using depth as a trigger
	* Convert to React ES6/7
		* Update Browserify / babelify / watchify to support it
	*
*/
var React = require('react');
var ReactDOM = require('react-dom');
var ReportApp = require('./app/components/Report/Report.jsx');

ReactDOM.render(<ReportApp/>, document.getElementById('forms'));
