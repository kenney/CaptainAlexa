'use strict';

var Boats = require("./boats.js")

var nb = nextBoats()
var hmt = howMuchTime()

console.log("Next boats response: " + nb)
console.log("How much time response: " + hmt)


function nextBoats(direction) {
    if (typeof direction === 'undefined') { direction = 'inbound'; }
    
    nextBoats = Boats.getUpcomingBoats(direction)
    console.log("We found " + nextBoats.length + " upcoming boats")
    if (nextBoats.length >= 3) {
        return "The next three boats are at " + nextBoats[0] + ", " + nextBoats[1] + ", and " + nextBoats[2]
    } else if (nextBoats.length == 2) {
        return "The last two boats of the day are at " + nextBoats[0] + ", " + nextBoats[1]
    } else {
        return "The last boat of the day is at " + nextBoats[0]
    }
}

function howMuchTime(direction) {
    if (typeof direction === 'undefined') { direction = 'inbound'; }
    
    var upcomingBoats = Boats.getUpcomingBoats(direction)
    if (upcomingBoats.length < 1) {
        throw "No upcoming boats" 
    }
    
    //console.log(upcomingBoats)
    
    var nextBoat = upcomingBoats[0]
    console.log("Next boat is " + nextBoat)
    console.log("The boat is in: " + nextBoat.timeTil())
    return "Next boat at " + nextBoat + " in " + nextBoat.timeTil()
}