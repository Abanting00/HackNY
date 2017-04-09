import React, { Component } from 'react';
import { Meteor }           from 'meteor/meteor'
import { createContainer }  from 'meteor/react-meteor-data';
import { Group}             from '../../server/publications'
import {Poll}               from '../../server/publications'

class Dashboard extends Component {
    constructor(props){
        super(props)
    };

    getName() {
        return this.props.user.profile.firstName + ' ' + this.props.user.profile.lastName;
    }

    getAvatar() {
        if(this.props.user.profile.avatar != '')
            return this.props.user.profile.avatar;
        else
            return  "default-user.png";
    }

    getPoll() {
        Meteor.call('addPoll',"test");
    }

    render() {
        if(!this.props.user) {
            return <div>Loading...</div>;
        }
        return (
            <div className="row">
                <div className="col-xs-6" id="addBorder">
                    <div className="action-field">
                        <p><img id="avatar" src={this.getAvatar()}/></p>
                    </div>
                    <div>
                        <div className="action-field">
                            <p>Welcome, {this.getName()}</p>
                        </div>
                        <input type="button" value="Click Me" onClick={this.getPoll.bind(this)}> </input>
                    </div>
                </div>
            </div>
        ); //end return()
    } // end render()
} //end Dashboard

export default createContainer(() =>{
    //return an object, Whatever we return will be send to userList as props
    Meteor.subscribe('users');
    Meteor.subscribe('poll');
    Meteor.subscribe('group');
    var allData=Meteor.users.find({}).fetch();

    return { user: Meteor.user(), allData:allData};
}, Dashboard);
