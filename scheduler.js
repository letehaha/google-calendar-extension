/**
 * The namespace for all scheduling operations.
 */
var scheduler = {};

/**
 * Poll the server every 6 hours for new calendars that may have been added.
 * @type {number}
 * @const
 * @private
 */
scheduler.CALENDARS_POLL_INTERVAL_MS_ = 6 * 60 * 60 * 1000;

/**
 * Poll the server every hour for new calendar events, but not new calendars.
 * @type {number}
 * @const
 * @private
 */
scheduler.EVENTS_POLL_INTERVAL_MS_ = 60 * 60 * 1000;

/**
 * Update the badge every minute.
 * @type {number}
 * @const
 * @private
 */
scheduler.BADGE_UPDATE_INTERVAL_MS_ = 60 * 1000;

/**
 * Starts the scheduler that updates the badge (more often) and the feed from
 * the calendar (less often).
 */
scheduler.start = function() {
  chrome.extension.getBackgroundPage().background.log('scheduler.start()');

  // Do a one-time initial fetch on load. Settings are only refreshed when restarting Chrome.
  feeds.fetchSettings();
  feeds.fetchCalendars();

  window.setInterval(function() {
    feeds.refreshUI();

    var now = (new Date()).getTime();
    if (!feeds.lastFetchedAt) {
      // If never successfully fetched before, fetch the list of calendars now.
      feeds.fetchSettings();
      feeds.fetchCalendars();
    } else {
      var feedsFetchedAtMs = feeds.lastFetchedAt.getTime();
      if (now - feedsFetchedAtMs > scheduler.CALENDARS_POLL_INTERVAL_MS_) {
        feeds.fetchCalendars();  // Will trigger fetchEvents automatically.
      } else if (now - feedsFetchedAtMs > scheduler.EVENTS_POLL_INTERVAL_MS_) {
        feeds.fetchEvents();
      }
    }
  }, scheduler.BADGE_UPDATE_INTERVAL_MS_);
};
