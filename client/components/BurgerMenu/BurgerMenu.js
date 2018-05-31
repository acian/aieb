import React, { Component, PropTypes } from 'react';
import { slide as Menu } from 'react-burger-menu';

//require('./BurgerMenu.css');
//import stylesBM from './BurgerMenu.css';

export class BurgerMenu extends Component {
	showSettings (event) {
	    event.preventDefault();
  }

	render () {
		var stylesBM = {
		  bmBurgerButton: {
		    position: 'fixed',
		    width: '36px',
		    height: '30px',
		    left: '36px',
		    top: '36px'
		  },
		  bmBurgerBars: {
		    background: '#373a47'
		  },
		  bmCrossButton: {
		    height: '24px',
		    width: '24px'
		  },
		  bmCross: {
		    background: '#bdc3c7'
		  },
		  bmMenu: {
		    background: '#373a47',
		    padding: '2.5em 1.5em 0',
		    fontSize: '1.15em'
		  },
		  bmMorphShape: {
		    fill: '#373a47'
		  },
		  bmItemList: {
		    color: '#b8b7ad',
		    padding: '0.8em'
		  },
		  bmOverlay: {
		    background: 'rgba(0, 0, 0, 0.3)'
		  },
		  option: {
    		display: 'inline-block',
    		margin: '0.75em',
		    padding: '1.35em 1.1em',
		    width: '15em',
		    background: '#fffce1',
		    textTransform: 'uppercase',
		    letterSpacing: '1px',
		    fontWeight: '800',
		    borderTopLeftRadius: '20px 50px',
		    borderTopRightRadius: '20px 50px',
		    borderBottomRightRadius: '20px 50px',
		    borderBottomLeftRadius: '20px 50px',
		    cursor: 'pointer',
		  },
		}

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