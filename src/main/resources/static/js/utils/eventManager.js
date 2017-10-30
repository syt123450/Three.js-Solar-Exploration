/**
 * Created by ss on 2017/10/30.
 */

EventManagerClass = function() {
    var eventList = {};

    this.registerEvent = function(eventName, eventType) {
        eventList[eventName] = eventType;
    };

    this.clearEvent = function() {
        var keys = Object.keys(eventList);
        for (var key in keys) {
            console.log(111);
            document.removeEventListener(eventList[key], key, false);
        }
        eventList = {};
    };

    this.print = function () {
        console.log(eventList);
    }
};

var EventManager = new EventManagerClass();