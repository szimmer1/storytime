/**
 * mzimmerman
 */
 FS.debug = true;
 FS.HTTP.setBaseUrl('/media');
 FS.HTTP.setHeadersForGet([
   ['Cache-Control', 'public, max-age=31536000']
   ]);

var settings = {};

if (Meteor.isServer) {
    settings = {
        region: "us-west-1",
        accessKeyId: process.env['AWS_ACCESS_ID'],
        secretAccessKey: process.env['AWS_SECRET_ID'],
        bucket: process.env['BUCKET_ID'],
        ACL: "public-read"
    };
    var tempDir = process.env['TEMP_DIR'];
    if (tempDir) {
        FS.TempStore.Storage = new FS.Store.FileSystem("_tempStore", {
            internal: true,
            path: tempDir
        })
    }
    console.log(settings,tempDir);
}

var imageStore = new FS.Store.S3("images", settings);

// Instantiate new Images collection for S3
Images = new FS.Collection("images", {
    stores: [imageStore]
});

console.log("created images");
console.log(Images);
