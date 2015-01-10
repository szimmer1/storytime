/**
 * Created by mzimmerman on 1/9/15.
 */

if (Snapshots.find({}).count() === 0) {
    console.log("hardcoding");
    // Hardcode a few events
    var hardcodeEventId1 = Events.insert({
        name: "HardcodedEvent1"
    });
    var hardcodeEventId2 = Events.insert({
        name: "HardcodedEvent2"
    });
    var hardcodeEventId3 = Events.insert({
        name: "Hardcoded Event"
    });

    // Hardcode a few snapshots
    Snapshots.insert({
        name: 'Hardcoded image 1',
        eventId: hardcodeEventId1,
        url: 'http://thenypost.files.wordpress.com/2013/09/119152.jpg'
    });

    Snapshots.insert({
        name: 'Hardcoded image 2',
        eventId: hardcodeEventId1,
        url: 'http://www.independent.co.uk/incoming/article9058848.ece/alternates/w620/monkey-bananav2.jpg'
    });

    Snapshots.insert({
        name: 'Harcoded image 3',
        eventId: hardcodeEventId1,
        url: 'http://i.dailymail.co.uk/i/pix/2014/03/26/article-2589986-1C92E23F00000578-914_634x626.jpg'
    });

    Snapshots.insert({
        name: 'Hardcoded image 4',
        eventId: hardcodeEventId2,
        url: 'http://thenypost.files.wordpress.com/2013/09/119152.jpg'
    });

    Snapshots.insert({
        name: 'Hardcoded image 5',
        eventId: hardcodeEventId2,
        url: 'http://www.independent.co.uk/incoming/article9058848.ece/alternates/w620/monkey-bananav2.jpg'
    });

    Snapshots.insert({
        name: 'Harcoded image 6',
        eventId: hardcodeEventId2,
        url: 'http://i.dailymail.co.uk/i/pix/2014/03/26/article-2589986-1C92E23F00000578-914_634x626.jpg'
    });

    Snapshots.insert({
        name: 'Hardcoded image 7',
        eventId: hardcodeEventId3,
        url: 'http://thenypost.files.wordpress.com/2013/09/119152.jpg'
    });

    Snapshots.insert({
        name: 'Hardcoded image 8',
        eventId: hardcodeEventId3,
        url: 'http://www.independent.co.uk/incoming/article9058848.ece/alternates/w620/monkey-bananav2.jpg'
    });

    Snapshots.insert({
        name: 'Harcoded image 9',
        eventId: hardcodeEventId3,
        url: 'http://i.dailymail.co.uk/i/pix/2014/03/26/article-2589986-1C92E23F00000578-914_634x626.jpg'
    });
}
else {
    console.log("harcoded data exists")
}

