var fs = require('fs');
var moment = require('moment-timezone');

var now = moment().tz("Americas/New_York")

var tripTime = 40

function Boat(name) {
	this.name = name
	this.time = name;
  
	today = now.format("MM/DD/YYYY")
	
	// Lambda servers run on UTC time, so set the dates to be loaded from Boston time.
	boatTimeStr = today + " " + this.time + " -0500"
	this.moment = moment(new Date(boatTimeStr))
	this.timestamp = this.moment.format("X")
}
// Boat methods
Boat.prototype.status = function() {
	nowTS = now.format("X")
	return (this.timestamp >= nowTS) ? "UPCOMING" : "MISSED"
};
Boat.prototype.timeTil = function() {
	minutes = this.moment.diff(now, "minutes")
	return moment.duration(minutes, "minutes").humanize(false)
};
Boat.prototype.toString = function() {
	return this.name
}
Boat.prototype.isAfter = function(targetTS) {
	return (this.timestamp >= targetTS)
}
Boat.prototype.willMakeItInTime = function(targetTS) {
	var arrivalTime = (tripTime*60) + parseFloat(this.timestamp)
	//console.log("this.ts: " + this.timestamp + " arrivalTime: " + arrivalTime + " targetTS: " + targetTS)
	return ( arrivalTime <= targetTS)
}

function getUpcomingBoats(direction) {
	
	var upcomingBoats = []
	var boats = JSON.parse(fs.readFileSync('boats.json', 'utf8'));

	boatTimes = boats[direction]
	for(var k in boatTimes) {
		boat = new Boat(boatTimes[k])
		if (boat.status() == "UPCOMING") {
			upcomingBoats.push(boat)
		}
	}
	
	return upcomingBoats
}

function nextBoats(direction) {
    if (typeof direction === 'undefined') { direction = 'inbound'; }
    
    var nextBoats = getUpcomingBoats(direction)
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
    
    var nextBoats = getUpcomingBoats(direction)
    console.log("We found " + nextBoats.length + " upcoming boats")
    if (nextBoats.length >= 1) {
		return "You have " + nextBoats[0].timeTil() + " until the " + nextBoats[0] + " boat leaves"
	} else {
		return "Sorry, but there are no more boats today"
	}
}

function whichBoatForDeadline(targetTime) {
    if (typeof direction === 'undefined') { direction = 'inbound'; }
    
    var allBoats = getUpcomingBoats(direction)
	
	var today = now.format("MM/DD/YYYY")
	var targetTimeStr = today + " " + targetTime + " -0500"
	console.log(targetTimeStr)
	ttMoment = moment(new Date(targetTimeStr))
	ttTS = ttMoment.format("X")
	
	for(k=allBoats.length - 1; k >= 0; k--) { 
		console.log("Looking at boat " + allBoats[k])
		if (allBoats[k].willMakeItInTime(ttTS)) {
			console.log("Boat can make it!")
			return "The " + allBoats[k] + " boat will get you there by " + targetTime
		} else {
			console.log("Boat can't make it")
		}
	}
	
	return "No boats could get you there by " + targetTime + " so maybe you should try Uber?"
}

module.exports.nextBoats = nextBoats
module.exports.getUpcomingBoats = getUpcomingBoats
module.exports.howMuchTime = howMuchTime
module.exports.whichBoatForDeadline = whichBoatForDeadline
module.exports.Boat = Boat