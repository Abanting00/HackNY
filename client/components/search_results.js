import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import { Meteor }           from 'meteor/meteor'
import { createContainer }  from 'meteor/react-meteor-data';
import { Link }             from 'react-router';
import { Accounts }         from 'meteor/accounts-base';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {users:[], option: 'user'};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      this.setState({option: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      const search = this.refs.searchBox.value;
      const option = this.state.option;

      if(option === 'user') {
        Meteor.call('searchUsers', search, (error, user) => {
          if(user) {
            this.setState({users: user});
          }
        });
      } //end if
      // else {
      //   Meteor.call('searchTags', search, (error, tags) => {
      //     if(tags) {
      //       this.setState({users: tags});
      //     }
      //   });
      // } //end else
    } //end handleSubmit

    renderList() {
      if(this.state.users[0] === null) {
        return <div> </div>;
      }
      return this.state.users.map(user => {
        return (
          <li className="list-group-item" key={user._id}>
            <img className="result-image" src={user.profile.avatar}/>
            <h2 id="username-result"><Link to={"/profile/"+user.username}>{user.profile.firstName}</Link></h2>
            {Meteor.userId() !== null && user._id !== Meteor.userId()}
          </li>
        );
      });
    }

    render() {
        return (
          <div>
            <div className="dropdown" id="searchBox-dashboard">
                <input type="search" ref="searchBox" className="form-control" onKeyUp={this.handleSubmit} placeholder="Search"/>

                <img className="dropdown-toggle" id="search-icon" src="/search-icon.png"/>
            </div>
            <div className="list-users">
                <ul className="list-group">
                    {this.renderList()}
                </ul>
            </div>
          </div>
        ); //end return()
    } //end render()
}

export default SearchResults;
