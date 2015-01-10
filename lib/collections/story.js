/**
 * Created by mzimmerman on 1/10/15.
 */

if (typeof Schema === 'typeof') Schema = {};

Schema.Story = new SimpleSchema({
    id: {
        type: String,
        autoValue: idAutoValue
    },
    event_id: {
        type: String,
        optional: false
    }
});



