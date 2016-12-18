var React = require('react');
var ReactDOM = require('react-dom');
var utils = require('../../utils/utils.js');
var ReportBody = require('./ReportBody.jsx');


var ReportHeader = React.createClass({
	/*TODO: Get this using function getHeader()*/
	render: function(){
		var header = utils.dataUtils.getActiveReport().header;
		return (
			<div id="report-header">
				{Object.keys(header).map(function(key, index){
					return(
						<p key={index}>{key} : {header[key]}</p>
					);
				})}
			</div>
		);
	}
});

var ReportSubmit = React.createClass({
	render: function(){
		return <div id="report-submit"></div>;
	}
});
var Report = React.createClass({
	render: function(){
		return (
		    <div className="report-container">
				<ReportHeader/>
				<ReportBody/>
				<ReportSubmit/>
		    </div>
		);
    }
});
var ReportTitle = React.createClass({
	loadReport: function(e){
		e.preventDefault();
		/* TODO:
			Save current report
			Load selected report
			Don't render app? update state?
		*/
		utils.dataUtils.setActiveReport(this.props.report);
		renderApp();
		console.log('here');
	},
	render: function(){
		return (
			<li className="report-list-item">
				<a href="#" onClick={this.loadReport}>
				{this.props.report}
				</a>
			</li>
		);
	}
});
var ReportTitleList = React.createClass({
	render: function(){
		return(
			<div className="report-title-list">
				<h4>Saved Reports</h4>
				<ul id="report-list">
					{Object.keys(utils.dataUtils.getReports()).map(function (item, index) {
					    return(<ReportTitle key={index} report={item}/>);
					})}
				</ul>
		    </div>
		);
	}
});
var NewReport = React.createClass({
	getInitialState: function() {
        return { showForm: false };
    },
    showForm: function(e) {
		e.preventDefault();
        this.setState({ showForm: true });
    },
	handleCancel: function(e){
		e.preventDefault();
		this.setState({ showForm: false });
	},
	handleSubmit: function({formData}){
		utils.formUtils.createNewReport(formData);
	},
	render: function(){
		console.log('creating NewReport');
		return(
			<div className="new-report">
				{ !this.state.showForm ?
					(<button type="button" onClick={this.showForm}>Create New Report</button>)
					:null
				}
				{ this.state.showForm ?
					(<div className="new-report-form">
						<Form schema={utils.formUtils.getNewReportSchema()}
							uiSchema={utils.formUtils.getNewReportUISchema()}
							onSubmit={this.handleSubmit}
							noValidate={true}/>
						<a href="#" onClick={this.handleCancel}>Cancel</a>
					</div>)
					: null
				}
			</div>
		);
	}
});
var ReportApp = React.createClass({
	render: function(){
		return (<div id="report-app"><AppMenu/><AppHeader/><ReportAppBody/><AppFooter/></div>);
    }
});
var ReportAppBody = React.createClass({
	render: function(){
		return (
			<div id="report-body-container">
				{utils.dataUtils.hasActiveReport() ? <Report/> : null}
				<NewReport/>
			</div>
		);
    }
});
var AppMenu = React.createClass({
	render: function(){
		/*TODO: React Hamburger Menu: react-hamburger-menu or react-burger-menu*/
		return (<div className="hamburger"><ReportTitleList/></div>);
    }
});
var AppHeader = React.createClass({
	render: function(){
		return <header></header>;
    }
});
var AppFooter = React.createClass({
	render: function(){
		return <footer></footer>;
    }
});
var renderApp = function(){
	ReactDOM.render(<ReportApp/>, document.getElementById('forms'));
}
utils.dataUtils.init();

module.exports = ReportApp;
