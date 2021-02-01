const d = new Date();
const m = getMonth();
const y = d.getFullYear();
const testSheet = "Test";
const liveSheet = `${m} ${y}`;
//const publishMode = "test";

//let targetSheet = publishMode === "live" ? liveSheet : testSheet;
dataSheet = ds.getSheetByName(liveSheet);
//dataSheet = ds.getSheetByName(testSheet);

/*
Target Data SpreadSheet retrieved as ds in privateSettings.js
*/

Data = {
    firstName: "a2",
    lastName: "b2",
    email: "c2",
    attendeeLevel: "d2",
    assistance: "e2",
    questions: "f2",
    imageName: "k2",
    imageId: "l2",
    titleOfWork: "g2",
    width: "h2",
    height: "i2",
    medium: "j2",
    timestamp: "m2",
    // Calculated Columns, pivot tables
    attendeeCount: "n2:o",  // grand total is last row of range, sub totals by attendee level
    uploadCounts: "p2:q",   // counts are by email address.
    entriesMade: "r2:s"     // number of registrations made by email address. if 1, then send confirmation email
}

function getDataSheet() {
    return dataSheet;
}

function getObserversCount() {
    let count = 0;
    let counts = dataSheet.getRange(Data.attendeeCount+dataSheet.getLastRow()).getValues();
    let filteredCounts = counts.filter(r => r[0]=="observer");
    if (filteredCounts.length>0) {
        count = filteredCounts[0][1];
    }
    return count;
}

function getActiveCount() {
    let count = 0;
    let counts = dataSheet.getRange(Data.attendeeCount+dataSheet.getLastRow()).getValues();
    let filteredCounts = counts.filter(r => r[0]=="active");
    if (filteredCounts.length>0) {
        count = filteredCounts[0][1];
    }
    return count;
}

function getTotalAttendees() {
    let count = 0;
    let counts = dataSheet.getRange(Data.attendeeCount+dataSheet.getLastRow()).getValues();
    let filteredCounts = counts.filter(r => r[0]=="Grand Total");
    if (filteredCounts.length>0) {
        count = filteredCounts[0][1];
    }
    return count;
}

function getObserverSeatsAvailable() {
    return getObserverLimit() - getObserversCount();
}

function getRecordCountByEmail(email) {
    let count = 0;
    let counts = dataSheet.getRange(Data.entriesMade+dataSheet.getLastRow()).getValues();
    let filteredCounts = counts.filter(r => r[0].toLowerCase()==email.toLowerCase());
    if (filteredCounts.length>0) {
        count = filteredCounts[0][1];
    }
    return count;
}
function getUploadCountByEmail(email) {
    let count = 0;
    let counts = dataSheet.getRange(Data.uploadCounts+dataSheet.getLastRow()).getValues();
    let filteredCounts = counts.filter(r => r[0].toLowerCase()==email.toLowerCase());
    if (filteredCounts.length>0) {
        count = filteredCounts[0][1];
    }
    return count;
}

function getActiveAvailable() {
    return getActiveSeatLimit() - getActiveCount();
}

function getObserverAvailable() {
    return getObserverSeatLimit() - getObserversCount();
}

function isMaxUploadReached(email) {
    let maxReached = (getUploadLimit() - getUploadCountByEmail(email)) <=0;
    return maxReached;
}