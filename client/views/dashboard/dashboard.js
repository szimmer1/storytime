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
    }
});
