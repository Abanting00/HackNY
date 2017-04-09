// Declare our collection
import { Mongo } from 'meteor/mongo';

export const Poll = new Mongo.Collection('poll');
export const Group = new Mongo.Collection('group');
