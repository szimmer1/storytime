Template.dashboard.helpers({
    imgUrl: function() {
        if (this.url) {
            return this.url
        }
        else {
            var image = Images.findOne({
                _id: this.imageId
            });
            if (image && image.url()) {
                return image.url();
            }
        }
        return "/assets/image_not_found.JPG"
    },
    timeStamp: function() {
        var time;
        if (this) {
            time = Images.findOne({
                _id: this.imageId
            }).uploadedAt;
        }
        else {
            time = "0";
        }
        return new Date(time);
    },
    showDropzone: function() {
        return Session.get("showDropzone") ? true : false;
    }
});


Template.dashboard.events({
    // catch the event quote write
    'click div.dropzone': function(event, t) {
        $('div.dropzone').hide();
        $('input.dropzone').show();
    },
    /*
    'mouseleave div.dropzone': function(event, t) {
        $('div.dropzone').show();
        $('input.dropzone').hide();
    },
    */



  'click .upvote' : function(e, t) {
    var snapId = $(e.currentTarget).attr('data-target');
    SnapshotVotes.upvote(snapId);
  },

  'click .downvote' : function(e, t) {
    var snapId = $(e.currentTarget).attr('data-target');
    SnapshotVotes.downvote(snapId);
  },

   'dropped #dropzone': function(event, temp) {
    //console.log('files dropped');
    FS.Utility.eachFile(event, function(file) {
      var obj = Images.insert(file, function (err, fileObj) {
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
        if (!err) {
          if (Session.get('eventId')) {
            Snapshots.insert({
              eventId: Session.get('eventId'),
              imageId: fileObj._id,
              createdAt: new Date()
            });
          }
          else {
            console.log("no Session.get('eventId') found");
          }
        }
        else {
          console.log(err);
        }
      });
    });
  } 

});
