var React = require('react');
var ReactDOM = require('react-dom');
var ReactJSONForm = require('react-jsonschema-form');
var utils = require('../../utils/utils.js');
var ReportBody = require('./ReportBody.jsx');
var ReportTitleList = require('./ReportTitleList.jsx');


var ReportHeader = React.createClass({
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
				<ReportBody updateApp={this.props.updateApp}/>
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
			reports: utils.dataUtils.getReports()
		});
	},
	updateApp: function(){
		this.setState({
			activeReport: utils.dataUtils.getActiveReportKey(),
			reports: utils.dataUtils.getReports()
		});
	},
	render: function(){
		return (<div id="report-app"><AppMenu updateApp={this.updateApp}/><AppHeader/><ReportAppBody updateApp={this.updateApp}/><AppFooter/></div>);
    }
});
var ReportAppBody = React.createClass({
	render: function(){
		return (
			<div id="report-body-container">
				{utils.dataUtils.hasActiveReport() ? <Report updateApp={this.props.updateApp}/> : null}
				<NewReport updateApp={this.props.updateApp}/>
			</div>
		);
    }
});
var AppMenu = React.createClass({
	render: function(){
		/*TODO: React Hamburger Menu: react-hamburger-menu or react-burger-menu*/
		return (<div className="hamburger"><ReportTitleList updateApp={this.props.updateApp}/></div>);
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
