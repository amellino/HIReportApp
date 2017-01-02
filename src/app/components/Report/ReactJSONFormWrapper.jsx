var ReactJSONFormWrapper = React.createClass({
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
			<ReactJSONForm
					schema={this.props.schema}
					uiSchema={this.props.uiSchema}
					formData={this.props.formData}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
					noValidate={true}/>
			</div>
		);
	}
});
