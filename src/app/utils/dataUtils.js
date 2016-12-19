var constants = require('./constants.js');
var formUtils = require('./formUtils.js');
var reportUtils = require('./reportUtils.js');
var globalUtils = require('./globalUtils.js');

var dataUtils = {
	getZoneByName: function(zones, name){
		for(var i=0;i<zones.length(); i++){
		    if(zones[i].name === name){
				return zones[i];
			}
		};
	},
	getFeatByName: function(feats, name){
		for(var i=0;i<feats.length(); i++){
		    if(feats[i].name === name){
				return feats[i];
			}
		};
	},
	pushReportData: function(report){
		var db = this.getReportDatabase();
		var reports = db.reports;
		reports[this.getActiveReportKey()] = report;
		db.reports = reports;
		this.setReportDatabase(db);
	},
	getReports: function(){
		return this.getReportDatabase().reports;
	},
	getReportDatabase: function(){
		return this.getStorageJSON(constants.REPORT_DATABASE);
	},
	setReportDatabase: function(reports){
		this.setStorageJSON(constants.REPORT_DATABASE,reports);
	},
	hasActiveReport: function(){
		return (!globalUtils.isEmpty(this.getActiveReportKey()));
	},
	setActiveReport: function(reportId){
		this.setStorageJSON(constants.ACTIVE_REPORT, reportId);
	},
	getActiveReport:function(){
		var key = this.getActiveReportKey();
		var database = this.getReportDatabase();
		return database.reports[key];
	},
	getActiveReportKey: function(){
		return this.getStorageJSON(constants.ACTIVE_REPORT);
	},
	setStorageJSON: function(key, val){
		localStorage.setItem(key,JSON.stringify(val));
	},
	getStorageJSON: function(key){
		return JSON.parse(localStorage.getItem(key));
	},
	initReportDatabase: function(){
		this.setReportDatabase({client:{},reports:{}});
	},
	init: function(){
		if(!localStorage.getItem(constants.ACTIVE_REPORT)){
			this.setActiveReport('');
		}
		if(!localStorage.getItem(constants.REPORT_DATABASE)){
			this.initReportDatabase();
		}
	}
};

module.exports = dataUtils;
