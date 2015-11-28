var fs = require('fs');
var moment = require('moment');

var now = moment()

function Boat(name) {
	this.name = name
	this.time = name;
  
	today = now.format("MM/DD/YYYY")
	boatTimeStr = today + " " + this.time
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

module.exports.nextBoats = nextBoats
module.exports.getUpcomingBoats = getUpcomingBoats
module.exports.Boat = Boat