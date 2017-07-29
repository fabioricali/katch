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
 * @param arguments {*}
 */
Events.fire = (...arguments) => {
    // `arguments` is an object, not array, in FF, so:
    let args = [];
    for (let i = 0; i < arguments.length; i++) args.push(arguments[i]);
    // Find event listeners, and support pseudo-event `catchAll`
    let event = args[0];
    for (let j = 0; j <= Events.events.length; j += 2) {
        if (Events.events[j] === event) Events.events[j + 1].apply(Events, args.slice(1));
        if (Events.events[j] === 'catchAll') Events.events[j + 1].apply(null, args);
    }
};

module.exports = Events;