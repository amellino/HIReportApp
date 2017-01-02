var constants = require('./constants.js');
var dataUtils = require('./dataUtils.js');
var reportUtils = require('./reportUtils.js');
var globalUtils = require('./globalUtils.js');

var formUtils = {
	saveFeatureData: function(zoneName,index,formData){
		var ar = dataUtils.getActiveReport();
		for(var i=0; i<ar.zones.length; i++){
			if(ar.zones[i].name === zoneName){
				ar.zones[i].feats[index].formData=formData;
			}
		}
		dataUtils.pushReportData(ar);
	},
	deleteFeature: function(zoneIndex, index){
		var ar = dataUtils.getActiveReport();
		ar.zones[zoneIndex].feats.splice(index, 1);
		dataUtils.pushReportData(ar);
	},
	deleteZone: function(index){
		var ar = dataUtils.getActiveReport();
		ar.zones.splice(index, 1);
		dataUtils.pushReportData(ar);
	},
	createProp: function(id, type, title, defaultValue, values){
		var json = {};
		json[id] = this.templateProp(type, title, defaultValue, values);
		return json;
	},
	createFeature: function(id, name, title){
		return this.templateFeature(id, name, title);
	},
	createZone: function(id, name, title) {
		return this.templateZone(id, name, title);
	},
	createReport: function(data) {
		var json = {header:{},zones:[]};
		Object.keys(data).map(function(key){
			json.header[key] = data[key];
		})
		return json;
	},
	addPropToFeature: function(feature, id, uiProp, data){
		feature.schema.properties[prop.keys()[0]] = prop[prop.keys()[0]];
		feature.uiSchema[uiProp.keys()[0]] = uiProp[uiProp.keys()[0]];
		feature.formData[data.keys()[0]] = data[data.keys()[0]];
	},
	addFeatureToZone: function(zone, feature, index){
		zone.feats.splice(index, 0, feature);
	},
	createNewReport: function(data){
		var db = dataUtils.getReportDatabase();
		db.reports[data.title] = this.createReport(data);
		dataUtils.setActiveReport(data.title);
		dataUtils.setReportDatabase(db);
	},
	createNewZone: function(index, id, name, title){
		var ar = dataUtils.getActiveReport();
		var zone = this.createZone(id, name, title);
		ar.zones.splice(index+1, 0, zone);
		dataUtils.pushReportData(ar);
	},
	createNewFeat: function(zoneName, index, id, name, title){
		var ar = dataUtils.getActiveReport();
		var feature = this.createFeature(id, name, title);
		for(var i=0; i<ar.zones.length; i++){
			if(ar.zones[i].name === zoneName){
				ar.zones[i].feats.splice(index+1, 0, feature);
			}
		}
		dataUtils.pushReportData(ar);
	},
	templateZone: function(id, name, title){
		var json = {id: id, name: name, title: title, feats: []};
		return json;
	},
	templateFeature: function(id, name, title) {
		var json = {
			id: id,
			name: name,
			title: title,
			default: true,
			schema : {
				title: name,
				type: "object",
				required: [],
				properties: {
				    type: {type: "string", title: "Name"},
				    condition: {type: "string", title: "Condition", default: "",
						enum: ["","Excellent","Good","Acceptable","Poor"]},
				    image: {type: "string", title: "image",default: "Image URL"},
				    description: {type: "string", title: "Description"},
				    other:{
						type: "array",
						title: "Other",
						items: {
						    type: "object",
						    properties :{
							item: {type: "string", title:"Item"},
							details: {type: "string", title:"Details"}
						    }
						}
				    }
				}
		    },
		    uiSchema : {
				description: {"ui:widget": "textarea"},
				details: {"ui:widget": "textarea"}
		    },
		    formData : {}
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
		if (globalUtils.isEmpty(defaultValue)){
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
	templateNewReportSchema: function(){
		return {type:"object",properties:{title:{type:"string",title:"Report Title"},address:{type:"string",title:"Address"},propetyType:{type:"string",title:"Property Type"},subType:{type:"string",title:"Sub Type"}}};
	},
	templateNewReportUISchema: function(){
		return {};
	},
	templateNewZoneSchema: function(){
		return {type:"object",properties:{title:{type:"string",title:"Zone Title"}}};
	},
	templateNewZoneUISchema: function(){
		return {};
	},
	templateNewFeatSchema: function(){
		return {type:"object",properties:{title:{type:"string",title:"Feature Title"}}};
	},
	templateNewFeatUISchema: function(){
		return {};
	},
	getNewReportSchema: function(){
		return this.templateNewReportSchema();
	},
	getNewReportUISchema: function(){
		return this.templateNewReportUISchema();
	},
	getNewZoneSchema: function(){
		return this.templateNewZoneSchema();
	},
	getNewZoneUISchema: function(){
		return this.templateNewZoneUISchema();
	},
	getNewFeatSchema: function(){
		return this.templateNewFeatSchema();
	},
	getNewFeatUISchema: function(){
		return this.templateNewFeatUISchema();
	}
};

module.exports = formUtils;
