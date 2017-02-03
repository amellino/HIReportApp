import React from 'react';
import Menu from '../components/common/Menu.jsx';
import ViewHeader from '../components/common/ViewHeader.jsx';
import View from './View.jsx';
import ViewFooter from '../components/common/ViewFooter.jsx';

class App extends React.Component {
	render() {
		return (
			<div className="">
				<Menu/>
				<ViewHeader/>
				<View component={this.props.children}/>
				<ViewFooter/>
			</div>
		);
	}
};

module.exports = App;
