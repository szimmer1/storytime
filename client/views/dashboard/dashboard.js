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
    },
    isImg: function() {
        return (this.type === 'image' || this.type === undefined)
    },
    isText: function() {
        return (this.type === 'text')
    },
    eventName: function() {
        return Session.get("eventName");
    }    

});


Template.dashboard.events({
    'click .fa-thumbs-up' : function(e,t) {
        $(e.currentTarget).css("color",'#7CFC00');
        $(e.currentTarget).closest('.flipper').find('.fa-thumbs-down').css("color","#9C9C9C");
    },

    'click .fa-thumbs-down' : function(e,t) {
        $(e.currentTarget).css("color","red");
        $(e.currentTarget).closest('.flipper').find('.fa-thumbs-up').css("color","#9C9C9C");
    },

    // catch the event quote write
    'click div.event-text': function(event, t) {
        $('div.event-text').hide();
        $('input.event-text').show();
    },

    'submit .event-text-form': function(e,t) {
        var eventText = $('#event-text').val()
        if (eventText.length <= 100) {
            var snapshotId = Snapshots.insert({
                eventId: Session.get('eventId'),
                type: 'text',
                description: eventText,
                createdAt: new Date()
            });
            console.log(snapshotId);
        }
        else {
            alert('Write a shorter quote!')
        }
    },

  'click .upvote' : function(e, t) {
    SnapshotVotes.upvote(this._id);
  },

  'click .downvote' : function(e, t) {
    SnapshotVotes.downvote(this._id);
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
