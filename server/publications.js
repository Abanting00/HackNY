import { Meteor }       from 'meteor/meteor';
import { Accounts }     from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';
import {Poll} from '../server/collections';
import {Group} from '../server/collections';


/* Publish users collection to see them on CTRL + M */
Meteor.publish('users', function() {
    return Meteor.users.find({});
});

Meteor.publish('poll', function(){
    return Poll.find({});
});

Meteor.publish('group', function(){
    return Group.find({});
});

Meteor.methods({
  'sendVerificationEmail': function() {
    Accounts.sendVerificationEmail(Meteor.userId(), Meteor.user().emails[0].address);
  },

  'users.updateEmail': function(email) {
    if(email != Meteor.user().emails[0].address) {
      Accounts.addEmail(Meteor.userId(), email);
      Accounts.removeEmail(Meteor.userId(), Meteor.user().emails[0].address);
    }
  },

  'users.changePassword': function(newPassword) {
    Accounts.setPassword(Meteor.userId(), newPassword);
  },

  'searchUsers': function(searchValue) {
    var user = [];
    if (searchValue == '') {
      return user;
    }
    if (Match.test(searchValue, Match.OneOf(String, null, undefined))) {
      user.push(Accounts.findUserByEmail(searchValue) || Accounts.findUserByUsername(searchValue));
    }
    return user;
  },

    'poll.insert': function() {
        return Poll.insert({
            createdAt: new Date(),

        });
    },

  'addGroup': function(poll){
      Group.insert({poll: poll});
      console.log();
  }
}); //end Meteor.methods()
