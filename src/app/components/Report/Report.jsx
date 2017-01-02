var React = require('react');
var ReactDOM = require('react-dom');
var ReactJSONForm = require('react-jsonschema-form');
var BurgerMenu = require('react-burger-menu').slide;
var ReportBody = require('./ReportBody.jsx');
var ReportTitleList = require('./ReportTitleList.jsx');

var utils = require('../../utils/utils.js');

var fullUpdateToggle = true;

var ReportHeader = React.createClass({
	getInitialState: function(){
		return {showDetails: false};
	},
	toggleDetails: function(e){
		e.preventDefault();
		this.setState({showDetails: !this.state.showDetails});
	},
	render: function(){
		var header = utils.dataUtils.getActiveReport().header;
		/*TODO: Make detils submenu hover over */
		return (
			<div id="report-header">
				<h2>{header.address}</h2>
				<div className="report-header-details">
					<a href="#" onClick={this.toggleDetails}>
						{(this.state.showDetails) ? "Hide Details" : "Show Details"}
					</a>
					{(this.state.showDetails) ? Object.keys(header).map(function(key, index){
						return(
							<p key={index}>{key} : {header[key]}</p>
						);
					}) : null}
				</div>
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
				<ReportBody key={this.props.fullUpdate} updateApp={this.props.updateApp}/>
				<ReportSubmit/>
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
		this.setState({ showForm: false });
		this.props.updateApp();
	},
	render: function(){
		return(
			<div className="new-report">
				{ !this.state.showForm ?
					(<button type="button" onClick={this.showForm}>Create New Report</button>)
					:null
				}
				{ this.state.showForm ?
					(<div className="new-report-form">
						<ReactJSONForm schema={utils.formUtils.getNewReportSchema()}
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
	getInitialState:function(){
		return ({
			activeReport: utils.dataUtils.getActiveReportKey(),
			reports: utils.dataUtils.getReports(),
			doUpdate: 0
		});
	},
	updateApp: function(full){
		if(full){
			fullUpdateToggle = !fullUpdateToggle;
		}
		this.setState({
			activeReport: utils.dataUtils.getActiveReportKey(),
			reports: utils.dataUtils.getReports(),
			fullUpdate: fullUpdateToggle
		});
	},
	render: function(){
		return (<div id="report-app"><AppMenu updateApp={this.updateApp}/><AppHeader/><ReportAppBody fullUpdate={this.state.fullUpdate} updateApp={this.updateApp}/><AppFooter/></div>);
    }
});
var ReportAppBody = React.createClass({
	render: function(){
		return (
			<div id="report-body-container">
				{utils.dataUtils.hasActiveReport() ? <Report key={this.props.doUfullUpdatepdate} fullUpdate={this.props.fullUpdate} updateApp={this.props.updateApp}/> : null}
				<NewReport updateApp={this.props.updateApp}/>
			</div>
		);
    }
});
var AppMenu = React.createClass({
	render: function(){
		var settings={}
		return (
			<div className="hamburger">
				<BurgerMenu {...settings}>
					<ReportTitleList updateApp={this.props.updateApp}/>
				</BurgerMenu>
			</div>);
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

utils.dataUtils.init();

module.exports = ReportApp;
