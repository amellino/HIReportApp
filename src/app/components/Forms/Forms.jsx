var React = require('react');
var ReactDOM = require('react-dom');
var Form = require('react-jsonschema-form');
//var bootstrap = require('bootstrap');

var reportState = {};

//Test Report State Data (updated as user updates information)
var initState = function(){
    reportState = {
		header:{},
		zones:{},
		selects:{
		    zone: "",
		    feat: ""
		}
    };
}
initState();
//if(!localStorage.getItem('reportState')){
    localStorage.setItem('reportState',reportState);
//}

//TODO: Bug where previous zone features getting overwritten
var updateReportState = function(zoneName, featName, data){
    if(typeof reportState.zones[zoneName] !== 'undefined'){
	reportState.zones[zoneName].feats[featName] = data;
    } else {
	console.log('zone does not exist');
	reportState.zones[zoneName] = {};
	reportState.zones[zoneName].feats = {};
	reportState.zones[zoneName].feats[featName] = data;
    }
    console.log(reportState);
    resetReportStateSelects();
    renderReport();
};
var removeReportStateFeat = function(zoneName, featName){
    //zoneName='Kitchen';
    //featName='stove';
    if(typeof reportState.zones[zoneName] !== 'undefined'){
		if(typeof reportState.zones[zoneName].feats[featName] !== 'undefined'){
		    delete reportState.zones[zoneName].feats[featName];
		    renderReport();
		}
    }
}
var updateReportSelectZone = function(zoneName){
    setReportStateSelectZone(zoneName);
    localStorage.setItem('reportState',reportState);
    renderReport();
}
var updateReportSelectFeat = function(featName){
    setReportStateSelectFeat(featName);
    var featData = getFeature(reportState.selects.zone,reportState.selects.feat);
    localStorage.setItem('reportState',reportState);
    updateReportState(reportState.selects.zone,reportState.selects.feat,featData);
}
var resetReportStateSelects = function(){
    setReportStateSelectZone("");
    setReportStateSelectFeat("");
}
var getReportStateSelectZone = function(){
    return reportState.selects.zone;
}
var setReportStateSelectZone = function(zone){
    reportState.selects.zone = zone;
}
var getReportStateSelectFeat = function(){
    return reportState.selects.feat;
}
var setReportStateSelectFeat = function(feat){
    reportState.selects.feat = feat;
}
//Test Report Skeleton Data
var formJSON = {header:{schema:{type:"object",properties:{address:{type:"string",title:"Address"},propetyType:{type:"string",title:"Property Type"},subType:{type:"string",title:"Sub Type"}}},uiSchema:{description:{"ui:widget":"textarea"}},formData:{}},zones:{Kitchen:{feats:{stove:{schema:{type:"object",properties:{stove:{title:"Stove",type:"object",required:["type"],properties:{type:{type:"string",title:"Name"},condition:{type:"string",title:"Condition",default:"",enum:["","Excellent","Good","Acceptable","Poor"]},image:{type:"string",title:"image",default:"Image URL"},description:{type:"string",title:"Description"},other:{type:"array",title:"Other",items:{type:"object",properties:{item:{type:"string",title:"Item"},details:{type:"string",title:"Details"}}}}}}}},uiSchema:{description:{"ui:widget":"textarea"},details:{"ui:widget":"textarea"}},formData:{}},counters:{schema:{type:"object",properties:{counters:{title:"Counter",type:"object",required:["type"],properties:{type:{type:"string",title:"Name"},condition:{type:"string",title:"Condition",default:"",enum:["","Excellent","Good","Acceptable","Poor"]},image:{type:"string",title:"image",default:"Image URL"},description:{type:"string",title:"Description"},other:{type:"array",title:"Other",items:{type:"object",properties:{item:{type:"string",title:"Item"},details:{type:"string",title:"Details"}}}}}}}},uiSchema:{description:{"ui:widget":"textarea"}},formData:{}}}},Garage:{feats:{floor:{schema:{type:"object",properties:{stove:{title:"Floor",type:"object",required:["type"],properties:{type:{type:"string",title:"Name"},condition:{type:"string",title:"Condition",default:"",enum:["","Excellent","Good","Acceptable","Poor"]},image:{type:"string",title:"image",default:"Image URL"},description:{type:"string",title:"Description"},other:{type:"array",title:"Other",items:{type:"object",properties:{item:{type:"string",title:"Item"},details:{type:"string",title:"Details"}}}}}}}},uiSchema:{description:{"ui:widget":"textarea"},details:{"ui:widget":"textarea"}},formData:{}},roof:{schema:{type:"object",properties:{counters:{title:"Roof",type:"object",required:["type"],properties:{type:{type:"string",title:"Name"},condition:{type:"string",title:"Condition",default:"",enum:["","Excellent","Good","Acceptable","Poor"]},image:{type:"string",title:"image",default:"Image URL"},description:{type:"string",title:"Description"},other:{type:"array",title:"Other",items:{type:"object",properties:{item:{type:"string",title:"Item"},details:{type:"string",title:"Details"}}}}}}}},uiSchema:{description:{"ui:widget":"textarea"}},formData:{}}}}    }};

var getReportData = function (){
    //TODO: get Report data from REST Service based on input
    //return sample form data
    return formJSON;
};

var getZone = function(zoneName){
    return getReportData().zones[zoneName];
};

var getFeature = function(zoneName,featName){
    return getReportData().zones[zoneName].feats[featName];
};

var newFeat = function(zoneName, featName){
    featData = getFeature(zoneName, featName);
    updateReportState(zoneName, featName, featData);
};
var deleteFeature = function(featId) {
    document.getElementById(featId).remove();
};

var log = function(type){
    console.log.bind(console, type);
};

var DeleteFeat = React.createClass({
	handleDeleteFeat: function(e){
		e.preventDefault();
		removeReportStateFeat(this.props.zoneName,this.props.data);
	},
	render: function(){
		return (<a href="#" onClick={this.handleDeleteFeat}>Delete Feat</a>);
	}
});

var Feat = React.createClass({
	render: function(){
		var feats = this.props.data
		var zoneName = this.props.zoneName;
		return(
		    <div className="report-body-zone-feat">
			{Object.keys(feats).map(function (key){
			    return(
				<div>
				    <Form schema={feats[key].schema}
					uiSchema={feats[key].uiSchema}
					formData={feats[key].formData}/>
					<DeleteFeat data={key} zoneName={zoneName}/>
				</div>);
			})}
		    </div>
		);
    }
});

var SelectFeat = React.createClass({
    handleNewFeat: function(e){
		e.preventDefault();
		updateReportSelectFeat(this.refs.selectZone.value);
    },

    render: function(){
		var selectableFeats = {};
		if(getReportStateSelectZone() != ""){
		    selectableFeats = this.props.data[getReportStateSelectZone()].feats;
		}

		//populate each feature option
		return(
		    <div className="select-feat">
				<select onChange={this.handleNewFeat} ref="selectZone">
				    <option value="">Select Feature</option>
				    {Object.keys(selectableFeats).map(function(key){
					return(
					    <option value={key}>
						{key}
					    </option>);
				    })}
				</select>
				<div id={this.props.dataName}></div>
		    </div>
		);
    }
});

var SelectZone = React.createClass({
    handleNewZone: function(e, select){
		e.preventDefault();
		updateReportSelectZone(this.refs.selectZone.value);
    },
    handleDeleteZone: function(e){
		e.preventDefault();
		removeReportStateFeat();
    },
    render: function(){
		var selectableZones = this.props.data;
		return(
			<div id="report-select-container">
			    <div className="select-zone" ref="selectZoneDiv">
				<select value={getReportStateSelectZone()} onChange={this.handleNewZone} ref="selectZone">
				    <option value="">Select Zone</option>
				    {Object.keys(this.props.data).map(function(key){
					return(
					    <option value={key}>
						{key}
					    </option>);
				    })}
				</select>
				<a href="#" onClick={this.handleDeleteZone}>Delete Zone</a>
			    </div>
			    <SelectFeat data={selectableZones}/>
			</div>
		);
    }
});

var Zone = React.createClass({
    render: function(){
	feats = this.props.data;
	zoneName = this.props.dataName;
	return(
	    <div className="report-body-zone">
		{Object.keys(feats).map(function (key){
		    return(<Feat data={feats[key]} dataName={key} zoneName={zoneName}/>);
		})}
	    </div>
	);
    }
});

var ReportBody = React.createClass({
    render: function(){
	var selectableZones = this.props.data;
	return (
	    <div className="report-containers">
		<div id="report-zones-container">
		    {Object.keys(reportState.zones).map(function (key){
			return(<Zone data={reportState.zones[key]} dataName={key}/>);
		    })}
		</div>
		<SelectZone data={selectableZones}/>
	    </div>);
    }
});

var ReportHeader = React.createClass({
    render: function(){
	var header = this.props.data;
	return (
	    <div className="report-header-container">
		<Form schema={header.schema}
		    uiSchema={header.uiSchema}
		    formData={header.formData}/>
	    </div>
	);
    }
});

var Report = React.createClass({
	render: function(){

	//display report header and footer classes
	return (
	    <div className="report-container">
			<ReportHeader data={this.props.reportData.header}/>
			<ReportBody data={this.props.reportData.zones}/>
	    </div>
	);
    }
});

var renderReport = function(){
    ReactDOM.render(<Report reportData={getReportData()}/>, document.getElementById('forms'));
}
if (typeof(Storage) !== "undefined"){
    initState();
    renderReport();
} else {
   ReactDOM.render(<h2>Your Browser does not support Local Storage</h2>, document.getElementById('forms'));
}

/*
onChange={log("changed")}
onSubmit={log("submitted")}
onError={log("errors")}
*/
