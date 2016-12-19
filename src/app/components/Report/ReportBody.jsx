var React = require('react');
var ReactDOM = require('react-dom');
var ReactJSONForm = require('react-jsonschema-form');
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
			<ReactJSONForm schema={this.props.schema}
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
			<ReactJSONForm schema={this.props.schema}
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
				<h5>{feat.name}</h5>
				<ReportProp
					schema={feat.schema}
					uiSchema={feat.uiSchema}
					formData={feat.formData}/>
			</div>
		);
	}
});
var NewReportFeatButton = React.createClass({
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
		utils.formUtils.createNewFeat(this.props.zoneName, this.props.index, formData.title, formData.title, formData.title);
		this.setState({ showForm: false });
		this.props.pushUpdate();
	},
	render: function(){
		return(
			<div className="new-report">
				{ !this.state.showForm ?
					(<button type="button" onClick={this.showForm}>Create New Feat</button>)
					:null
				}
				{ this.state.showForm ?
					(<div className="new-report-form">
						<ReactJSONForm schema={utils.formUtils.getNewZoneSchema()}
							uiSchema={utils.formUtils.getNewZoneUISchema()}
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
var NewReportFeat = React.createClass({
	/*TODO: New Feature Form */
	render: function(){
		return null;
	}
});
var ReportZone = React.createClass({
	render: function(){
		var _this = this;
		var feats = this.props.zone.feats;
		if(feats === undefined || feats === null || Object.keys(feats).length == 0){
			return(<div><h5>{this.props.zone.name}</h5>
					<NewReportFeatButton index={0}
						pushUpdate={_this.props.pushUpdate}
						zoneName={_this.props.zone.name}/>
					</div>);
		} else {
			return(
				<div className="report-zone">
					<h5>{this.props.zone.name}</h5>
					{feats.map(function(feat, index){
						return(
							<div key={'feat-div-'+index} className="report-feat">
								<ReportFeat key={'feat-' + index}
									index={index}
									feat={feat}
									pushUpdate={_this.props.pushUpdate}
									zoneName={_this.props.zone.name}/>
								<NewReportFeatButton key={'feat-button-'+index}
									index={index}
									pushUpdate={_this.props.pushUpdate}
									zoneName={_this.props.zone.name}/>
							</div>
						);
					})}
				</div>
			);
		}
	}
});
var NewReportZoneButton = React.createClass({
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
		utils.formUtils.createNewZone(this.props.index, formData.title, formData.title, formData.title);
		this.setState({ showForm: false });
		this.props.pushUpdate();
	},
	render: function(){
		return(
			<div className="new-report">
				{ !this.state.showForm ?
					(<button type="button" onClick={this.showForm}>Create New Zone</button>)
					:null
				}
				{ this.state.showForm ?
					(<div className="new-report-form">
						<ReactJSONForm schema={utils.formUtils.getNewZoneSchema()}
							uiSchema={utils.formUtils.getNewZoneUISchema()}
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
var ReportBody = React.createClass({
	getInitialState: function(){
		return {zones: utils.dataUtils.getActiveReport().zones};
	},
	pushUpdate: function(){
		this.setState({zones: utils.dataUtils.getActiveReport().zones});
	},
	render: function(){
		var _this = this;

		/*TODO: Add Carousel code here (may need to integrate React component) */
		if(this.state.zones === undefined || this.state.zones === null || this.state.zones.length == 0){
			return(<NewReportZoneButton key={0} pushUpdate={_this.pushUpdate}/>);
		}
		return (
			<div id="report-body" className="slider">
				{this.state.zones.map(function(zone, index){
					return(
						<div key={'zone-div-'+index} className="slide">
							<ReportZone key={'zone-' + index} index={index} zone={zone} pushUpdate={_this.pushUpdate}/>
							<NewReportZoneButton key={'zoneButton-' + index} index={index} pushUpdate={_this.pushUpdate}/>
						</div>);
				})}
			</div>
		);
	}
});

module.exports = ReportBody;
