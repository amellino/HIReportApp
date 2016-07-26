var React = require('react');
var ReactDOM = require('react-dom');
var Form = require('react-jsonschema-form');
var idIndex = 0;

//REST Call here
var formJSON = {
    header:{
	address: "6969 Andys Mouth, Lakewood, OH 44107",
	propetyType: "Residential",
	subType: "Single Family"
    },
    zones: {
	Kitchen: {
	    //title : "Kitchen",
	    schema : {
		//title: "Appliances",
		type: "object",
		properties: {
		    appliances: {
			type: "array",
			title: "Appliances",
			items: {
			    title: "Appliance",
			    type: "object",
			    required: ["name"],
			    properties: {
				name: {type: "string", title: "Name"},
				condition: {type: "string", title: "Condition", default: "", 
					    enum: ["","Excellent","Good","Acceptable","Poor"]},
				image: {type: "string", title: "image",default: "Image URL"},
				description: {type: "string", title: "Description"}
			    }
			}
		    }
		}
	    },
	    uiSchema : {
		description: {"ui:widget": "textarea"}
	    },
	    formData : {
		name: ""
	    }
	}
    }
};

getReportData = function (){
    return formJSON;
}

var getZoneData = function(zoneName){
    return getReportData().zones[zoneName];
};

var getFeatureData = function(zoneName,featName){
    return getReportData().zones[zoneName][featName];
};

var newZone = function(name,zoneId) {
    //get the zone data for the requested zone
    zoneData = getZoneData(name);
    idIndex++;
    ReactDOM.render(<Zone data={zoneData} dataName={name}/>, document.getElementById(zoneId));
};

var newFeature = function(zone, name){
    //ReactDOM.render(<Feature data={featureData}/>, document.getElementById('forms'));
};

var newItem = function(zone,feature,name){
    //not possible to implement this function yet
    //ReactDOM.render(<Item data={itemData}/>, document.getElementById('forms'));
};

var log = function(type){
    console.log.bind(console, type);
};

var Zone = React.createClass({
    handleClick: function(e){
	e.preventDefault();
	newZone(this.props.dataName,idIndex);
    },
    render: function(){
	var zone = this.props.data;
	return(
		<div className="report-body-zone">
		    <Form schema={zone.schema}
			formData={zone.formData}
			onChange={log("changed")}
			uiSchema={zone.uiSchema}
			onSubmit={log("submitted")}
			onError={log("errors")} />
		    <a href="#" onClick={this.handleClick}>AddZone</a>
		    <div id={idIndex}></div>
		</div>
	);
    }
});

var Feature = React.createClass({
    render: function(){
	var feats = this.props.zone.features;
	return (
	    <div className="feature-elements-container">
		{feats.map(function(f, i){
		    return(<Feature feat={feats[i]}/>);
		})}
	    </div>
	);
    }
});

var ReportBody = React.createClass({
    render: function(){
	var zones = this.props.reportData.zones;
	return (
	    <div className="report-zones-container">
		{Object.keys(zones).map(function (key){
		    return(<Zone data={zones[key]} dataName={key}/>);
		})}
	    </div>
	);
    }
});

var ReportHeader = React.createClass({
    render: function(){
	var header = this.props.reportData.header;
	return (
	    <div className="report-header-container">
		{Object.keys(header).map(function (key){
		    return(<div>{key}: {header[key]}</div>);
		})}
	    </div>
	);
    }
});

var Report = React.createClass({
    render: function(){
	return (
	    <div className="report-container">
		<ReportHeader reportData={this.props.reportData}/>
		<ReportBody reportData={this.props.reportData}/>
	    </div>
	);
    }
});

ReactDOM.render(<Report reportData={getReportData()}/>, document.getElementById('forms'));
