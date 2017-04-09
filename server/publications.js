import { Meteor }       from 'meteor/meteor';
import { Accounts }     from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';
import { Mongo }        from 'meteor/mongo';

export const Group = new Mongo.Collection('group')
export const Poll = new Mongo.Collection('poll')


/* Publish users collection to see them on CTRL + M */
Meteor.publish('users', function() {
    return Meteor.users.find({});
});

Meteor.publish("poll", function(){
    return Poll.find({});
});

Meteor.publish("group", function(){
    return 'group'.find({});
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

  'addPoll': function(text){
      //Allows the user to create a poll
      Poll.insert({ text: text});
  },

  'addGroup': function(poll){
      Group.insert({poll: poll});
      console.log();
  }
}); //end Meteor.methods()
