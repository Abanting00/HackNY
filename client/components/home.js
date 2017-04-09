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
            return (<p>you are log in</p>)
        }
        else {
            return (
                <div>
                    <div>
                        <h4>Picture goes here</h4>
                    </div>
                    <div>
                        <div id="button">
                            <input type="button" value="signup" onClick={this.showSignup.bind(this)}/>
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
