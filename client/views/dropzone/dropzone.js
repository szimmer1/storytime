Template.dropzone.events({
  // Catch the dropped event
  'dropped #dropzone': function(event, temp) {
    console.log('files dropped');
    FS.Utility.eachFile(event, function(file) {
      var obj = Images.insert(file, function (err, fileObj) {
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
        if (!err) {
          debugger;
          if (Session.get('eventId')) {
            Snapshots.insert({
              eventId: Session.get('eventId'),
              imageId: fileObj._id
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