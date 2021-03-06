import React        from "react";
import { Meteor }   from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import  Welcome      from './welcome';
import ReactDOM     from 'react-dom';
import {Link} from 'react-router'

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = { passwordError: '', userError: '', registerSucceeded: false };
    }

    checkStrength() {
        var strength = Accounts.zxcvbn(this.refs.t_password.value);
        var element;

           if(strength.score==0){element =
                <ul>
                    <li className="strengthLevelBar strengthLevelNone"></li>
                    <li className="strengthLevelText">&nbsp;Terrible</li>
                </ul>
            ;}
        else if(strength.score==1){element =
            <ul>
                <li className="strengthLevelBar  strengthLevelLow"></li>
                <li className="strengthLevelText">&nbsp;Bad</li>
            </ul>
        ;}
        else if(strength.score==2){element =
            <ul>
                <li className="strengthLevelBar  strengthLevelMedium"></li>
                <li className="strengthLevelText">&nbsp;Fair</li>
            </ul>
        ;}
        else if(strength.score==3){element =
            <ul>
                <li className="strengthLevelBar strengthLevelStrong"></li>
                <li className="strengthLevelText">&nbsp;Good</li>
            </ul>
        ;}
        else if(strength.score==4){element =
            <ul>
                <li className="strengthLevelBar strengthLevelHigh"></li>
                <li className="strengthLevelText">&nbsp;Great</li>
            </ul>
        ;}
        ReactDOM.render(element, document.getElementById('passBar'));
    }

    handleSubmit(event) {
        event.preventDefault();

        const firstName = this.refs.t_fName.value;
        const lastName = this.refs.t_lName.value;
        const email = this.refs.t_email.value;
        const password = this.refs.t_password.value;
        const conPassword = this.refs.t_conPassword.value;
        const username = this.refs.t_username.value;

        //Checks whether both password entries match
        if(password != conPassword) {
            this.setState({ passwordError: 'Passwords do not match' });
        }
        else {
            this.setState({ passwordError: '' });

            var user = { username:username, email: email, password: password,
                profile: {
                    avatar: '', firstName: firstName, lastName: lastName,
                    groups: [],
                    poll: []
                }

            };

            Accounts.createUser(user, (error) => {
              if (error) {
                this.setState({ userError: error.reason });
              }
              else {
                Meteor.call('sendVerificationEmail');
                this.setState({ userError: '', registerSucceeded: true });
              }
            }); //end Accounts.createUser()
        } // end else
    } //end handleSubmit

    //rendering Sign Up Page
    render () {
      if(!this.state.registerSucceeded) {
        return (
            <div className="form-group">
                <form className="form-horizontal" onSubmit= {this.handleSubmit.bind(this)} >
                    <p>
                        <label>First Name </label>
                        <input ref="t_fName" className="form-control" type="text" required />
                    </p>
                    <p>
                        <label >Last Name </label>
                        <input ref="t_lName" className="form-control" type="text" required />
                    </p>
                    <p>
                        <label >Username </label>
                        <input ref="t_username" className="form-control" type="text" required />
                    </p>
                    <p>
                        <label>E-mail </label>
                        <input ref="t_email" className="form-control" type="email" required />
                    </p>
                    <p>
                        <label>Password </label>
                        <input ref="t_password" className="form-control" type="password" onKeyUp={this.checkStrength.bind(this)} required />
                    </p>
                    <div id="passBar"></div>
                    <p>
                        <label>Confirm your password </label>
                        <input ref="t_conPassword" className="form-control" type="password" required />
                    </p>

                    <div className="text-danger">{ this.state.passwordError }</div>
                    <p>
                        <input type="submit" value="Submit"/>
                    </p>
                    <div className="text-danger">{ this.state.userError }</div>
                </form>
            </div>
        ); //end return()
      }//end if
      else {
        return (
          <div>
             <Welcome/>
          </div>
        );
      }
    }; //end render()
} // end of class
