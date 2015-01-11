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


Snapshots.getTopVotedArray = function(eventId, count) {

    var snapshots = Snapshots.find({
        eventId: eventId
    });

    var snapshotsVotes = [];

    snapshots.forEach(function(item, i) {
        var votes = SnapshotVotes.find({
            snapshotId: item._id
        });

        var totalCurrent = 0;
        votes.forEach(function(item,i) {
            if ("yes" === item.votecode) {
                totalCurrent = totalCurrent + 1;
            } else {
                totalCurrent = totalCurrent - 1;
            }
        });

        var newVote = {
            id: item._id,
            count: totalCurrent
        }
        
        snapshotsVotes.push(newVote)
        // result.push(item[field]);
    });
    var sorted = _.sortBy(snapshotsVotes, function(vote){
        return vote.count;
    }).reverse().slice(0, count);

    return sorted;
}


Snapshots.getTopVotedIds = function(eventId, count) {
    var bestSnapshots = Snapshots.getTopVotedArray(eventId, count);

    var result = [];

    bestSnapshots.forEach(function(item,i) {
        result.push(item["id"]);

    });
    return result;
}

