/**
 * Created by mzimmerman on 1/9/15.
 */

if (typeof Schema == 'undefined') Schema = {};

Schema.Events = new SimpleSchema({
    id: {
        type: String,
        autoValue: idAutoValue
    },
    name: {
        type: String,
        optional: false
    },
    splashImgUrl: {
      type: String,
      optional: false
    }
});

Events = new Meteor.Collection("events");
Events.attachSchema(Schema.Events);
