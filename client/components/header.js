import React, { Component } from 'react';
import { Link }             from 'react-router';
import { Meteor }           from 'meteor/meteor'
import { createContainer }  from 'meteor/react-meteor-data';
import SearchResults        from './search_results';

class Header extends Component {
    userLogout() {
        Meteor.logout();
    }

    checkSignup() {
        if (!this.props.user) {
            return <Link to="/registration" >SIGN UP</Link>
        }
        else {
            const username = this.props.user.username;
            return <Link to={"/profile/"+username}>PROFILE</Link>
        }
    }

    setLoginLogout() {
        if (!this.props.user) {
            return <Link to="/login" >LOGIN</Link>
        }
        else  {
            return <Link to="/login" onClick={this.userLogout.bind(this)}>LOGOUT</Link>
        }
    }

    closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    render() {
        return (
            <div className="navbar navbar-default" role="navigation">
                <div id="mySidenav" className="sidenav">
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav.bind(this)}>&times;</a>
                    <a href="#">About</a>
                    <a href="#">Login</a>
                    <a href="#">Sign Up</a>
                    <a href="#">FAQ</a>
                </div>
                <span id="makeLarger" onClick={this.openNav.bind(this)}>&#9776; </span>
            </div>
        ); //end return()
    } // end render()
} // end class Header

export default createContainer(() => {
    Meteor.subscribe('users');
    return { user: Meteor.user() };
}, Header);
