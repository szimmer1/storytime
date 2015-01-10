/**
 * Created by mzimmerman on 1/9/15.
 */

idAutoValue = function() {
    if (!this.value) {
        return Random.hexString(17)
    }
};

// Instantiate new Images collection for S3

Images = new FS.Collection("images", {
    stores: [imageStore]
});