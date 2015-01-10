/**
 * Created by mzimmerman on 1/9/15.
 */

if (Snapshots.find({}).count() === 0) {
    console.log("hardcoding");
    // Hardcode a event
    var hardcodeEventId = Events.insert({
        name: "Hardcoded Event"
    });

    // Hardcode a few snapshots
    Snapshots.insert({
        name: 'Hardcoded image 1',
        eventId: hardcodeEventId,
        url: 'http://thenypost.files.wordpress.com/2013/09/119152.jpg'
    });

    Snapshots.insert({
        name: 'Hardcoded image 2',
        eventId: hardcodeEventId,
        url: 'http://www.independent.co.uk/incoming/article9058848.ece/alternates/w620/monkey-bananav2.jpg'
    });

    Snapshots.insert({
        name: 'Harcoded image 3',
        eventId: hardcodeEventId,
        url: 'http://i.dailymail.co.uk/i/pix/2014/03/26/article-2589986-1C92E23F00000578-914_634x626.jpg'
    });
}
else {
    console.log("data already exists")
}

