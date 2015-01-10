/**
 * mzimmerman
 */

var settings = {};

if (Meteor.isServer) {
    settings = {
        region: "us-west-2",
        accessId: process.env['AWS_ACCESS_ID'],
        secretId: process.env['AWS_SECRET_ID'],
        bucket: process.env['BUCKET_ID'],
        ACL: "public-read"
    };
}

var imageStore = new FS.Store.S3("images", settings);

// Instantiate new Images collection for S3
Images = new FS.Collection("images", {
    stores: [imageStore]
});

console.log("created images");
console.log(Images);