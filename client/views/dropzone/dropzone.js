Template.dropzone.events({
  // Catch the dropped event
  'dropped #dropzone': function(event, temp) {
    console.log('files dropped');
    FS.Utility.eachFile(event, function(file) {
      var obj = Images.insert(file, function (err, fileObj) {
        //If !err, we have inserted new doc with ID fileObj._id, and
        //kicked off the data upload using HTTP
        if (!err) {
          console.log("ALERT! added snapshot with eventId ,1");
          Snapshots.insert({
            eventId: ',1',
            imageId: fileObj._id
          });
        }
        else {
          console.log(err);
        }
      });
    });
  }
});