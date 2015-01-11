if (typeof Schema == 'undefined') Schema = {};

Schema.SnapshotVote = new SimpleSchema({
	id: {
		type: String,
		autoValue: idAutoValue
	},
	userId: {
		type: String,
		optional: false
	},
	snapshotId: {
		type: String,
		optional: true
	},
	votecode: {
		type: String,
		optional: true  
	},
	createdAt: {
		type: Date
	}
});

SnapshotVotes = new Meteor.Collection("snapshotvotes");
SnapshotVotes.attachSchema(Schema.SnapshotVote);

SnapshotVotes.dovote = function(sId, vcode) {
	SnapshotVotes.insert({
		userId: Meteor.userId(),
		snapshotId: sId,
		votecode: vcode,
		createdAt: new Date()
	});
}

SnapshotVotes.upvote = function(sId) {
	SnapshotVotes.dovote(sId, "yes");
}

SnapshotVotes.downvote = function(sId) {
	SnapshotVotes.dovote(sId, "no");
}
