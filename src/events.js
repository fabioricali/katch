let Events = {};
Events.events = [];

/**
 * Call events
 * @param event {string} event name
 * @param callback {function} callback function
 */
Events.on = (event, callback) => {
    Events.events.push(event, callback);
};

/**
 * Fire event
 * @param args {*}
 */
Events.fire = (...args) => {
    // `arguments` is an object, not array, in FF, so:
    let _args = [];
    for (let i = 0; i < args.length; i++) _args.push(args[i]);
    // Find event listeners, and support pseudo-event `catchAll`
    let event = _args[0];
    for (let j = 0; j <= Events.events.length; j += 2) {
        if (Events.events[j] === event) Events.events[j + 1].apply(Events, _args.slice(1));
        if (Events.events[j] === 'catchAll') Events.events[j + 1].apply(null, _args);
    }
};

module.exports = Events;