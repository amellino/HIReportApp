var React = require('react');
var ReactDOM = require('react-dom');
var Form = require('react-jsonschema-form');
var utils = require('../../utils/utils.js');

var ReportProp = React.createClass({
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
var ReportFeat = React.createClass({
	render: function(){
		var feat = this.props.feat;
		return (
			<div className="report-feat">
				<ReportProp
					schema={feat.schema}
					uiSchema={feat.uiSchema}
					formData={feat.formData}/>
			</div>
		);
	}
});
var NewReportFeatButton = React.createClass({
	render: function(){
		return (<button type="button">New Feature</button>);
	}
});
var NewReportFeat = React.createClass({
	/*TODO: New Feature Form */
	render: function(){
		return null;
	}
});
var ReportZone = React.createClass({
	render: function(){
		var feats = this.props.zone.feats;
		if(feats === undefined || feats === null || Object.keys(feats).length > 0){
			return(<NewReportFeatButton/>);
		} else {
			return(
				<div className="report-zone">
					{Object.keys(feats).map(function(key, index){
						return(
							<div className="report-feat">
								{feats[key].empty ?
									<NewReportFeat/>
									: <ReportFeat key={index} name={key} feat={feats[key]}/>
								}
								<NewReportFeatButton key={index} name={key}/>
							</div>
						);
					})}
				</div>
			);
		}
	}
});
var NewReportZoneButton = React.createClass({
	render: function(){
		/*TODO: Add Zone immediately after this one, show it*/
		return (<button type="button">Add Zone</button>);
	}
});
var NewReportZone = React.createClass({
	/*TODO: New Zone Form */
	render: function(){
		return null;
	}
});
var ReportBody = React.createClass({
	render: function(){
		var zones = utils.dataUtils.getActiveReport().zones;
		/*TODO: Add Carousel code here (may need to integrate React component) */
		if(zones === undefined || zones === null || Object.keys(zones).length > 0){
			return(<NewReportZoneButton key={0} name={null}/>);
		}
		return (
			<div id="report-body" className="slider">
				{Object.keys(zones).map(function(key, index){
					return(
						<div className="slide">
							{zones[key].empty ?
								<NewReportZone/>
								: <ReportZone key={index} name={key} zone={zones[key]}/>
							}
							<NewReportZoneButton key={index} name={key}/>
						</div>);
				})}
			</div>
		);
	}
});

module.exports = ReportBody;
