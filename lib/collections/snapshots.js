/**
 * Created by mzimmerman on 1/9/15.
 */

if (typeof Schema == 'undefined') Schema = {};

Schema.Snapshots = new SimpleSchema({
    id: {
        type: String,
        autoValue: idAutoValue
    },
    eventId: {
        type: String,
        optional: false
    },
    url: {
        type: String,
        optional: true
    },
    imageId: {
        type: String,
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    type: {
        type: String,
        optional: true
    }
});

Snapshots = new Meteor.Collection("snapshots");
Snapshots.attachSchema(Schema.Snapshots);


