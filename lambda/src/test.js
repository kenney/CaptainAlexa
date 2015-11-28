var fs = require('fs');

//var boats = require("boats.json")

arr = [1,2,3]

direction = "inbound"
commuteTime = 20
walkingTime = 15

var moment = require('moment');


now = moment()
nowTS = now.format("X")
today = now.format("MM/DD/YYYY")


//console.log(now)
//console.log(now.format("DDDD"))
//console.log(now.format("DDDD") + " " + "6:00pm")
//console.log(now.format("DD/MM/YYYY") + " " + "6:00pm")


//console.log("Timestamp for today: " + now.format("X"))
//boat_time = today + " " + "6:00 pm"
//console.log(boat_time)
//console.log(new Date("6/9/2010 3:20 pm").toUTCString())
//console.log(new Date(boat_time).toUTCString())
//boat_moment = moment(new Date(boat_time))
//console.log("Timestamp for boat time: " + boat_moment.format("X"))

//firstboat = 


console.log("The time is currently " + nowTS)
var boats = JSON.parse(fs.readFileSync('boats.json', 'utf8'));

boatTimes = boats[direction]
for(var k in boatTimes) {
   boatTimeStr = today + " " + boatTimes[k]
   boatTimeMoment = moment(new Date(boatTimeStr))
   boatTimeTS = boatTimeMoment.format("X")
   status = (boatTimeTS >= nowTS) ? "UPCOMING" : "MISSED"
   console.log("[" + status + "] " + boatTimeStr + " is " + boatTimeTS)
   
   //console.log(k, boatTimes[k]);
}

process.exit()

//console.log(boats[direction])
console.log("all done")

// Done executing.
process.exit()

//console.log(boats)
for(var k in boats) {
   console.log(k, boats[k]);
}

var str = '{ "name": "John Doe", "age": 42 }';
var boats = JSON.parse(str);

arr.each(function(entry) {
    console.log(entry);
});

console.log("All done")