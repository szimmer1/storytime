/**
 * Created by mzimmerman on 1/10/15.
 */


var imageStore = new FS.Store.S3("images", {
    region: "us-west-2",
    accessId: process.env['AWS_ACCESS_ID'],
    secretId: process.env['AWS_SECRET_ID'],
    bucket: process.env['BUCKET_ID'],
    ACL: "public-read"
});

Images = new FS.Collection("images", {
    stores: [imageStore]
});
