import React      from 'react';
import { Meteor } from 'meteor/meteor';

export default class Home extends React.Component {
    render() {
          return (
            <div className="row">
              <div className="col-xs-6">
                <img src="meerkat.png"/>
              </div>
              <div className="col-xs-6">
                <h2>Welcome</h2>
                <p>

                </p>
              </div>
            </div>
          );
    }
} // end class
