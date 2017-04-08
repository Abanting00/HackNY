import React, { Component } from 'react';
import { Meteor }   from 'meteor/meteor';
import { Link }             from 'react-router';
import { createContainer }  from 'meteor/react-meteor-data';

class Header extends Component {
    render() {
        return (
            <div className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
            <Link to="/home" ><img id="logo" src="" /></Link>
            </div>
            <ul className="nav navbar-nav">
            <li>
            <Link to="" >HOME</Link>
            </li>
            <li>
            <Link to="">ABOUT US</Link>
            </li>
        </ul>
        </div>
    ); //end return()
    } // end render()
} // end class Header

export default createContainer(() => {
    Meteor.subscribe('users');
}, Header);
