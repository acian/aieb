import React, { Component, PropTypes } from 'react';
import { slide as Menu } from 'react-burger-menu';
import PersonIcon from '@material-ui/icons/Person';

import stylesBM from './BurgerMenuStyles.js';

export class BurgerMenu extends Component {
	showSettings (event) {
	    event.preventDefault();
  }

	render () {
	    return (
	      <Menu styles={stylesBM}>
	        <a id="Students" href="/">
						<PersonIcon/><span>Personas</span>
					</a>
          <a id="Course" href="/courses">
            <PersonIcon/><span>Cursos</span>
          </a>
	        <a id="about" className="menu-item" href="/">About</a>
	        <a id="contact" className="menu-item" href="/">Contact</a>
	        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
	      </Menu>
	    );
  }
};

export default BurgerMenu;
