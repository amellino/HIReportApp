import React from 'react';

class View extends React.Component{
	render(){
		return(<div className="">{this.props.component}</div>);
	}
};

module.exports = View;
