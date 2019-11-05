/**
 * An object that encapsulates a request from/to the background page to/from the
 * content script and/or the browser action.
 * @constructor
 */
function RequestObject() {}
/** @type {string} */
RequestObject.prototype.method = '';
/** @type {Object.<string>} */
RequestObject.prototype.parameters = {};
/** @type {function()} */
RequestObject.prototype.callback = function() {};


/**
 * A calendar feed object.
 * @constructor
 */
function CalendarFeed() {}
/** @type {string} */
CalendarFeed.prototype.title = '';
/** @type {string} */
CalendarFeed.prototype.summary = '';
/** @type {string} */
CalendarFeed.prototype.author = '';
/** @type {string} */
CalendarFeed.prototype.url = '';
/** @type {string} */
CalendarFeed.prototype.backgroundColor = '';
/** @type {string} */
CalendarFeed.prototype.foregroundColor = '';
/** @type {boolean} */
CalendarFeed.prototype.visible = false;


/**
 * A calendar event, either detected or from the feed.
 * @constructor
 */
function CalendarEvent() {}
/** @type {string} */
CalendarEvent.prototype.title = '';
/** @type {string} */
CalendarEvent.prototype.description = '';
/** @type {number} */
CalendarEvent.prototype.start = 0;
/** @type {number} */
CalendarEvent.prototype.end = 0;
/** @type {string} */
CalendarEvent.prototype.url = '';
/** @type {string} */
CalendarEvent.prototype.gcal_url = '';
/** @type {string} */
CalendarEvent.prototype.location = '';
/** @type {CalendarFeed} */
CalendarEvent.prototype.feed = new CalendarFeed();
