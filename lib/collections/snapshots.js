/**
 * Created by mzimmerman on 1/9/15.
 */

if (typeof Schema == 'undefined') Schema = {};

Schema.Snapshots = new SimpleSchema({
    id: {
        type: String,
        autoValue: idAutoValue
    },
    url: {
        type: String,
        optional: false
    }
});

Snapshots = new Meteor.Collection("snapshots");
Snapshots.attachSchema(Schema.Snapshots);

