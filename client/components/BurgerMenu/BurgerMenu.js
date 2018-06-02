import React, { Component, PropTypes } from 'react';
import { slide as Menu } from 'react-burger-menu';

import stylesBM from './BurgerMenuStyles.js';

export class BurgerMenu extends Component {
	showSettings (event) {
	    event.preventDefault();
  }

	render () {

	    return (
	      <Menu styles={stylesBM}>
	        <a id="Students" className="menu-item" href="/">Home</a>
	        <a id="about" className="menu-item" href="/">About</a>
	        <a id="contact" className="menu-item" href="/">Contact</a>
	        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
	      </Menu>
	    );
  }
};

export default BurgerMenu;