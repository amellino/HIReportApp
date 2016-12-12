var React = require('react');
var ReactDOM = require('react-dom');
var Form = require('react-jsonschema-form');

const REPORT_DATABASE = 'reportDatabase';
const ACTIVE_REPORT = 'activeReport';

var utils = {
	isEmpty: function(v){
		return (v === undefined || v === null || v === "");
	}
}
var formUtils = {
	templateZone: function(id, title){
		var json = {id: id, title: title, feats: {}};
		return json;
	},
	templateFeature: function(title) {
		var json = {
		    schema: {
				type: "object",
				properties: {}
			}, uiSchema: {},formData: {}
		};
		return json;
	},
	templateArrayProp: function(title) {
		var json = {
			type: "array",
			title: title,
			items: {type: "object", properties :{}}
		};
		return json;
	},
	templateProp: function(type, title, defaultValue, selectValues) {
		var json = {type: type, title: title};
		if (utils.isEmpty(defaultValue)){
			json.defaultValue = defaultValue;
		}
		if (selectValues !== undefined && selectValues.length > 0){
			json.enum = selectValues;
		}
		return json;
	},
	templatePropUISchema: function(widgetType){
		var json = {"ui:widget": widgetType};
		return json;
	},
	createProp: function(id, type, title, defaultValue, values){
		var json = {};
		json[id] = templateProp(type, title, defaultValue, values);
		return json;
	},
	createFeature: function(id, title){
		var json = {};
		json[id] = templateFeature(title);
		return json;
	},
	createZone: function(id, zoneId, tile) {
		var json = {};
		json[id] = templateZone(zoneId, title);
		return json;
	},
	createReport: function(data) {
		var json = {header:{},zones:{}};
		Object.keys(data).map(function(key){
			json.header[key] = data[key];
		})
		return json;
	},
	addPropToFeature: function(feature, id, uiProp, data){
		feat = feature.keys()[0];
		feat.schema.properties[prop.keys()[0]] = prop[prop.keys()[0]];
		feat.uiSchema[uiProp.keys()[0]] = uiProp[uiProp.keys()[0]];
		feat.formData[data.keys()[0]] = data[data.keys()[0]];
	},
	addFeatureToZone: function(zone, feature){
		zone.keys()[0].feats[feature.keys()[0]] = feature[feature.keys()[0]];
	},
	getNewReportSchema: function(){
		/*TODO: get this using helpers*/
		return {type:"object",properties:{title:{type:"string",title:"Report Title"},address:{type:"string",title:"Address"},propetyType:{type:"string",title:"Property Type"},subType:{type:"string",title:"Sub Type"}}};
	},
	getNewReportUISchema: function(){
		/*TODO: get this using helpers*/
		return {};
	},
	createNewReport: function(data){
		var db = dataUtils.getReportDatabase();
		db.reports[data.title] = this.createReport(data);
		dataUtils.setActiveReport(data.title);
		dataUtils.setReportDatabae(db);
		renderApp();
	}
};
var dataUtils = {
	getReports: function(){
		return this.getReportDatabase().reports;
	},
	getReportDatabase: function(){
		return this.getStorageJSON(REPORT_DATABASE);
	},
	setReportDatabae: function(reports){
		this.setStorageJSON(REPORT_DATABASE,reports);
	},
	hasActiveReport: function(){
		return (!utils.isEmpty(this.getActiveReportKey()));
	},
	setActiveReport: function(reportId){
		this.setStorageJSON(ACTIVE_REPORT, reportId);
	},
	getActiveReport:function(){
		var key = this.getActiveReportKey();
		var database = this.getReportDatabase();
		return database.reports[key];
	},
	getActiveReportKey: function(){
		return this.getStorageJSON(ACTIVE_REPORT);
	},
	setStorageJSON: function(key, val){
		localStorage.setItem(key,JSON.stringify(val));
	},
	getStorageJSON: function(key){
		return JSON.parse(localStorage.getItem(key));
	},
	initReportDatabase: function(){
		this.setReportDatabae({client:{},reports:{}});
	},
	init: function(){
		if(!localStorage.getItem(ACTIVE_REPORT)){
			this.setActiveReport('');
		}
		if(!localStorage.getItem(REPORT_DATABASE)){
			this.initReportDatabase();
		}
	}
};
var reportUtils = {
	saveReport: function(reportId, data){

	}
};

var FeatureProperties = React.createClass({
	/*getInitialState: function() {
        return {};
    },
	updateState:function(state) {
		this.setState(state);
	},*/
	handleDeleteFeat: function(e){
		e.preventDefault();
		removeReportStateFeat(this.props.zoneName,this.props.featName);
	},
	handleChange: function({formData}){
		updateReportStateFormData(this.props.zoneName,this.props.featName,formData);
	},
	handleSubmit: function({formData}){
	},
	render: function(){
		return(
			<div className="hide-submit">
			<Form schema={this.props.schema}
					uiSchema={this.props.uiSchema}
					formData={this.props.formData}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
					noValidate={true}/>
			{this.props.deleteButton ? <a href="#" onClick={this.handleDeleteFeat}>Delete</a> : null}
			</div>
		);
	}
});
var FormWrapper = React.createClass({
	/*getInitialState: function({formData}) {
        return formData;
    },
	updateState:function({formData}) {
		this.setState(formData);
	},*/
	handleDeleteFeat: function(e){
		e.preventDefault();
		removeReportStateFeat(this.props.zoneName,this.props.featName);
	},
	handleChange: function({formData}){
		//updateReportStateFormData(this.props.zoneName,this.props.featName,formData);
	},
	handleSubmit: function({formData}){
		console.log(formData);
	},
	render: function(){
		return(
			<div className="form-wrapper">
			<Form schema={this.props.schema}
					uiSchema={this.props.uiSchema}
					formData={this.props.formData}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
					noValidate={true}/>
			</div>
		);
	}
});
var ReportHeader = React.createClass({
	/*TODO: Get this using function getHeader()*/
	render: function(){
		var header = dataUtils.getActiveReport().header;
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
var ReportBody = React.createClass({
	render: function(){
		return <div id="report-body"></div>;
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
			Don't render app?
		*/
		dataUtils.setActiveReport(this.props.report);
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
					{Object.keys(dataUtils.getReports()).map(function (item, index) {
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
		formUtils.createNewReport(formData);
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
						<Form schema={formUtils.getNewReportSchema()}
							uiSchema={formUtils.getNewReportUISchema()}
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
				{dataUtils.hasActiveReport() ? <Report/> : null}
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
if (typeof(Storage) !== "undefined"){
    dataUtils.init();
	renderApp();
} else {
   ReactDOM.render(<h2>Your Browser does not support Local Storage</h2>, document.getElementById('forms'));
}
