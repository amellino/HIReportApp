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
var AppHome = require('./app/modules/App.jsx');
var InspectorHome = require('./app/modules/App.jsx');
var TemplateEditor = require('./app/modules/App.jsx');
var InspectionEditor = require('./app/modules/App.jsx');
var CustomerHome = require('./app/modules/App.jsx');
var SiteHome = require('./app/modules/App.jsx');
var NoMatch = require('./app/modules/App.jsx');

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={AppHome}/>
			<Route path="/inspector" component={InspectorHome}>
				<Route path="/templates" component={TemplateEditor}/>
				<Route path="/inspection" component={InspectionEditor}/>
				<Route path="/inspection/:iid" component={InspectionEditor}/>
			</Route>
			<Route path="/customer" component={CustomerHome}/>
			<Route path="/site" component={SiteHome}/>
			<Route path="*" component={Error}/>
		</Route>
	</Router>
), document.getElementById('root'));
