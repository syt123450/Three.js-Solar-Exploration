/**
 * Created by ss on 2017/10/30.
 */

var EventManager = new function () {

    var eventList = {};

    this.registerEvent = function (eventType, eventName) {
        document.addEventListener(eventType, eventName, false);
        eventList[eventType] = eventName;
    };

    this.removeEvents = function () {
        var keys = Object.keys(eventList);
        for (var i = 0; i < keys.length; i++) {
            document.removeEventListener(keys[i], eventList[keys[i]], false);
        }
        eventList = {};
    };
};