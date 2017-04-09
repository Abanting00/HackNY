import React      from 'react';
import Dashboard from '../components/dashboard';
import Registration from '../components/registration'
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Home extends React.Component {
    showSignup() {
        var element = <Registration/>;
        ReactDOM.render(element, document.getElementById('signup'));
    }

    checkLogin() {
        if (Meteor.loggingIn() || Meteor.user()) {
            return (<Dashboard/>)
        }
        else {
            return (
                <div className="row">
                    <div className="row" id="home-page">
                        <div className="col-6">
                            <img id="home-image" src="/camping.png"/>
                        </div>
                        <div id="button">
                            <input type="button" value="Sign Up" onClick={this.showSignup.bind(this)}/>
                        </div>
                        <div id="signup">
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="row">
                {this.checkLogin()}
            </div>
        );
    }
} // end class
