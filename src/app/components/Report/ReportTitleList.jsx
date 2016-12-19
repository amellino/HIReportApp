var React = require('react');
var ReactDOM = require('react-dom');
var utils = require('../../utils/utils.js');

var ReportTitle = React.createClass({
	loadReport: function(e){
		e.preventDefault();
		/* TODO: Save current report */
		utils.dataUtils.setActiveReport(this.props.report);
		this.props.updateApp();
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
		var _this = this;
		return(
			<div className="report-title-list">
				<h4>Saved Reports</h4>
				<ul id="report-list">
					{Object.keys(utils.dataUtils.getReports()).map(function (item, index) {
					    return(<ReportTitle key={index} report={item} updateApp={_this.props.updateApp}/>);
					})}
				</ul>
		    </div>
		);
	}
});

module.exports = ReportTitleList;
