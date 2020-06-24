const MINUTES_STEP = 1000 * 60 * 10; // 10 minutes
let button = document.createElement('button');
button.className = "extension-parse-work-dairy-btn";
button.innerHTML = "Parse!";
button.onclick = parser;

const contentContainer = document.querySelector('section.ng-pristine');
contentContainer.prepend(button);

function parser() {
  const activeMinutes = Array.prototype.slice
    .call(document.querySelectorAll('.o-minute'))
    .filter(i => i.textContent)
    .map(i => i.parentNode.parentNode);

  const result = [];
  let counter = 0;
  for (let i = 0; i < activeMinutes.length; i++) {
    const value = activeMinutes[i];
    const time = new Date(getDateByPassedTime(getTimeFromItem(value)));
    if (i > 0) {
      const previousTime = new Date(getDateByPassedTime(getTimeFromItem(activeMinutes[i - 1])));
      if (time - previousTime === MINUTES_STEP) {
        if (!result[counter]) {
          result[counter] = [];
        };
        result[counter].push({ value, time: time.toISOString() });
      } else {
        counter++
        if (!result[counter]) {
          result[counter] = [];
        };
        result[counter].push({ value, time: time.toISOString() });
      }
    } else {
      if (!result[counter]) {
        result[counter] = [];
      };
      result[counter].push({ value, time: time.toISOString() });
    }
  }
  result.forEach(item => {
    const start = item[0].time;
    const end = item[item.length - 1].time;
    const summary = workTitle();

    chrome.runtime.sendMessage({
      method: 'add-event',
      data: {
        end: {
          dateTime: end,
        },
        start: {
          dateTime: start,
        },
        summary
      }
    });
  })
};

function getCurrentDate() {
  return new Date(
    document
      .getElementById('o-current-date')
      .querySelector('span')
      .textContent
  );
};

function getTimeFromItem(item) {
  return item.children[0].children[1].textContent;
};

function workTitle() {
  return document.getElementsByClassName('m-md-bottom col-md-6')[0].textContent;
}

/**
 * @param {String} time – time if format [hours:minutes]
 * @return {Number} date – date in ms
 */
function getDateByPassedTime(time) {
  let date = getCurrentDate();
  const parsedTime = {
    h: time.split(':')[0],
    m: time.split(':')[1],
  };
  date = new Date(date).setHours(parsedTime.h);
  date = new Date(date).setMinutes(parsedTime.m);
  return date;
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method === 'events.parse') {
    parser();
  }
  sendResponse();
});
