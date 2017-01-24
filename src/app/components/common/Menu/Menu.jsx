var React = require('react');

var Menu = React.createClass({
	render: function(){
		var settings={}
		return (
			<div className="hamburger">
				<BurgerMenu {...settings}>
					<div className="logo">
						<img src="http://placehold.it/30x30" style={{float:'left'}} alt="logo" class="img-circle"/>
						<h3>Logo</h3>
					</div>
					<ReportTitleList updateApp={this.props.updateApp}/>
					<NewReport updateApp={this.props.updateApp}/>
				</BurgerMenu>
			</div>);
    }
});

module.exports = Menu;
