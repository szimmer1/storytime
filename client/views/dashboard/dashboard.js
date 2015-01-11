/**
 * Created by mzimmerman on 1/10/15.
 */

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
        return "/image_not_found.jpeg"
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
