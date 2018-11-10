import React, { Component, PropTypes } from 'react';
import { slide as Menu } from 'react-burger-menu';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Settings from '@material-ui/icons/Settings';
import ContactMail from '@material-ui/icons/ContactMail';
import UserIcon from '@material-ui/icons/HowToReg'

import stylesBM from './BurgerMenuStyles.js';
import styles from './BurgerMenu.css';

export class BurgerMenu extends Component {

	render () {
	    return (
	      <Menu styles={stylesBM}>
          <a id="Students" href="/">
            <PersonIcon /> <div className={styles['detail-item']}><span>Personas</span></div>
          </a>
          <a id="Users" href="/users">
            <UserIcon/><span>Usuarios</span>
          </a>
          <a id="about" href="/">
            <AssignmentIcon /> <div className={styles['detail-item']}><span>About</span></div>
          </a>
          <a id="AssignmentIcon" href="/">
            <ContactMail/> <div className={styles['detail-item']}><span>Contact</span></div>
          </a>
          <a id="settings" href="/">
            <Settings /> <div className={styles['detail-item']}><span>Settings</span></div>
          </a>
	      </Menu>
	    );
  }
};

export default BurgerMenu;
