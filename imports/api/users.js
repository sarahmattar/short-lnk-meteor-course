import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
		const email = user.emails[0].address; // we are pulling this from the 'user' object that Meteor creates.

		new SimpleSchema({
		email: {
			type: String,
			regEx: SimpleSchema.RegEx.Email
			}
		}).validate({ email })
		
		return true;
	});