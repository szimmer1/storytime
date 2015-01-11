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
    },
    createdAt: {
        type: Date,
        optional: true
    }
});

Snapshots = new Meteor.Collection("snapshots");
Snapshots.attachSchema(Schema.Snapshots);


Snapshots._transform = function(snapshot) {
    if (snapshot) {
        snapshot.upvotes = SnapshotVotes.find({$and: [{snapshotId: snapshot._id}, {votecode:"yes"}]}).count();
        snapshot.downvotes = SnapshotVotes.find({$and: [{snapshotId: snapshot._id}, {votecode:"no"}]}).count();
        snapshot.votes = snapshot.upvotes + snapshot.downvotes;
    }
    return snapshot;
};

Snapshots.getTopVotedArray = function(eventId, count) {
    var snapshots = Snapshots.find({
        eventId: eventId
    });

    var snapshotsVotes = [];

    snapshots.forEach(function(snapshot, i) {
        var snapshotCurrentId = snapshot._id; 
        var votes = SnapshotVotes.find({
            snapshotId: snapshotCurrentId
        });

        var totalCurrent = 0;
        votes.forEach(function(vote,i) {
            if ("yes" === vote.votecode) {
                totalCurrent = totalCurrent + 1;
            } else {
                totalCurrent = totalCurrent - 1;
            }
        });

        // only add voted on content    
        if(totalCurrent > 0) {
            snapshot.votes = totalCurrent;
            snapshotsVotes.push(snapshot);
        }
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

    bestSnapshots.forEach(function(snapshot,i) {
        result.push(snapshot["_id"]);
    });
    return result;
}

