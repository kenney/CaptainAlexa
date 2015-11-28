'use strict';

var Boats = require("./boats.js")

var AlexaSkill = require('./AlexaSkill');
var CaptainAlexa = function () {
    AlexaSkill.call(this);
};

CaptainAlexa.prototype = Object.create(AlexaSkill.prototype);
CaptainAlexa.prototype.constructor = CaptainAlexa;


CaptainAlexa.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("CaptainAlexa onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to Captain Alexa, you can ask when the next boat is";
    var repromptText = "You can say: when is the next boat";
    response.ask(speechOutput, repromptText);
};

CaptainAlexa.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("HelloWorld onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
};

CaptainAlexa.prototype.intentHandlers = {
    // register custom intent handlers
    NextBoatIntent: function(intent, session, response) {
        console.log("NextBoatIntent received");
        var nextBoatResponse = Boats.nextBoats()
        response.tell(nextBoatResponse);
    },
    HowMuchTimeIntent: function(intent, session, response) {
        console.log("HowMuchTimeIntent received");
        var howMuchTimeResponse = Boats.howMuchTime()
        response.tell(nextBoatResponse);
    },
    //TargetTime:TIME
    BoatToMakeIntent: function(intent, session, response) {
        console.log("BoatToMakeIntent received");
        console.log("Make it by: " + intent.slots.TargetTime.value)
        var your_response = "You want to make it by " + intent.slots.TargetTime.value
        response.tell(your_response);
    },
    //Direction:LITERAL
    SetDirectionIntent: function(intent, session, response) {
        console.log("SetDirectionIntent received");
        var your_response = "Direction has been set as " + intent.slots.Direction.value
        response.tell(your_response);
    },
    //WalkingTime:DURATION
    SetWalkingTimeIntent: function(intent, session, response) {
        console.log("SetWalkingTimeIntent received");
        var your_response = "OK, I've set your walking time to " + intent.slots.WalkingTime.value
        response.tell(your_response);
    },
    //DrivingTime:DURATION
    SetTimeToFerryIntent: function(intent, session, response) {
        console.log("SetTimeToFerryIntent received");
        var your_response = "OK, I've set your car time to " + intent.slots.DrivingTime.value
        response.tell(your_response);
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the CaptainAlexa skill.
    var captainAlexa = new CaptainAlexa();
    captainAlexa.execute(event, context);
};