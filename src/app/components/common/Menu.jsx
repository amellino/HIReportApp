import React from 'react';
import {Link} from 'react-router';
var BurgerMenu = require('react-burger-menu').slide;

class Menu extends React.Component{
	render(){
		//<ReportTitleList updateApp={this.props.updateApp}/>
		//<NewReport updateApp={this.props.updateApp}/>
		var settings={};
		return (
			<div className="hamburger">
				<BurgerMenu {...settings}>
					<div className="logo">
						<img src="http://placehold.it/30x30" style={{float:'left'}} alt="logo" className="img-circle"/>
						<h3>Logo</h3>
					</div>
					<ul role="nav">
						<li><Link to="/inspector/template" activeClassName="active">Template</Link></li>
						<li><Link to="/inspector/inspection" activeClassName="active">Inspection</Link></li>
						<li><Link to="/inspector" activeClassName="active">Inspector Home</Link></li>
					</ul>
				</BurgerMenu>
			</div>
		);
    }
};

module.exports = Menu;
