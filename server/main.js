import { Meteor }   from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';
import { image, helpers, lorem, internet, name } from 'faker';

Meteor.startup(() => {
  // See if the collection has any records already
  const numberRecords = Meteor.users.find({}).count();
  if (numberRecords < 40) {
    _.times(40, () => {
      const helper = helpers.contextualCard();
      const firstName = helper.name;
      const username = helper.username;
      const email = helper.email;
      const avatar = image.avatar();
      const blurb = lorem.sentences();
      const mentorTags = [ name.jobType().toLowerCase() ];
      const menteeTags = [ name.jobType().toLowerCase() ];

      Accounts.createUser({
        username: username,
        email: email,
        password:'faker',
        profile: { avatar: avatar,
                   firstName: firstName,
                   lastName: '',
                   blurb: blurb
                 }
      });
    }); // end loop
  } //end if
}); //end Meteor.startup()
