CaptainAlexa
============

Captain Alexa is an an Amazon Alexa Skill for reporting on commuter boat times in Boston.  It is primarily useful for a very small audience of users--the intersection of those that take commuter ferry services between Hingham and Boston and those that own an Amazon Echo. That being said everyone should own an Echo or two!

For developers it is an example of a (mostly) working NodeJS Alexa Skill.

## Working intents
See the echo/utterances.txt file for the utterances.  Example working utterances:

* When is the next boat?
* What boat do I need to make a 9am meeting?
* Set direction inbound|outbound


# TODO
* Store persistent state for direction, walking time, etc.
* get inbound vs outbound working
* get the How intents to work (how much time...)
* get weekend schedule working