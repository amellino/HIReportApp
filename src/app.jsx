/*TODO:
	* Add support for Pictures (upgrade form JSON? Write own forms JSON?)
	* Think about making Zones and Features the same and using depth as a trigger
	* Convert to React ES6/7
		* Update Browserify / babelify / watchify to support it
	*
*/
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;

var App = require('./app/modules/App.jsx');
var AppHome = require('./app/modules/AppHome.jsx');
var InspectorHome = require('./app/components/home/InspectorHome.jsx');
var Template = require('./app/components/inspector/Template.jsx');
var Inspection = require('./app/components/inspector/Inspection.jsx');
var CustomerHome = require('./app/components/home/CustomerHome.jsx');
var SiteHome = require('./app/components/home/SiteHome.jsx');
var NoMatch = require('./app/modules/App.jsx');

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={AppHome}/>
			<Route path="/inspector" component={InspectorHome}/>
			<Route path="/inspector/template" component={Template}/>
			<Route path="/inspector/inspection" component={Inspection}/>
			<Route path="/customer" component={CustomerHome}/>
			<Route path="/site" component={SiteHome}/>
			<Route path="*" component={NoMatch}/>
		</Route>
	</Router>
), document.getElementById('root'));
