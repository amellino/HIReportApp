var React = require('react');
var ReactDOM = require('react-dom');
var ReportApp = require('../components/Report/Report.jsx');

var globalUtils = {
	isEmpty: function(v){
		return (v === undefined || v === null || v === "");
	}
};

module.exports = globalUtils;
