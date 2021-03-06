/**
 * Namespace for constants.
 */
var constants = {};

/**
 * The URL of the browser UI for Google Calendar.
 * @type {string}
 * @const
 */
constants.CALENDAR_UI_URL = 'https://calendar.google.com/calendar/';

/**
 * Menu item used to open Google Calendar in a new tab.
 * @type {string}
 * @const
 */
constants.MENU_ITEM_VIEW_CALENDAR_WEB = 'view_web_calendar';

/**
 * A string used by the Calendar API to indicate when a user has declined attending an event.
 * @type {string}
 * @const
 */
constants.EVENT_STATUS_DECLINED = 'declined';

/**
 * @type {number}
 * @const
 */
constants.INFO_BAR_DISMISS_TIMEOUT_MS = 5000;

/**
 * The key under which the calendar list is stored in storage.
 * @type {string}
 * @const
 */
constants.CALENDARS_STORAGE_KEY = 'calendars';


/**
 * The default calendar to add parsed Upwork time
 * @type {string}
 * @const
 */
constants.DEFAULT_CALEDAR_ID = '<YOUR_PREFERED_CALENDAR_ID>'
