var pollIntervalMin = 5; // 5 minutes

function getNMapsNotificationsUrl() {
	return "http://n.maps.yandex.ru/notifications/";
}

function getNMapsUrl() {
	return "http://n.maps.yandex.ru/";
}

function isNMapsNotificationsUrl(url) {
	return url.indexOf(getNMapsNotificationsUrl()) == 0;
}

function isNMapsUrl(url) {
	return url.indexOf(getNMapsUrl()) == 0 && !isNMapsNotificationsUrl(url);
}	

function goToInbox() {
	console.log('Going to NMaps notifications...');
	chrome.tabs.getAllInWindow(undefined, function(tabs) {
		for (var i = 0, tab; tab = tabs[i]; i++) {
			if (tab.url && isNMapsNotificationsUrl(tab.url)) {
				console.log('Found NMaps notifications tab: ' + tab.url + '. ' +
							'Focusing and refreshing count...');
				chrome.tabs.update(tab.id, {selected: true});
				startRequest({scheduleRequest:false});
				return;
			}
		}
		console.log('Could not find NMaps notifications tab. Creating one...');
		chrome.tabs.create({url: getNMapsNotificationsUrl()});
	});
}

function getInboxCount(callback) {
	try {
		var req = new XMLHttpRequest();
		req.open("GET", "http://n.maps.yandex.ru/actions/get-user-counters.xml", true);
		req.onload = function() {
			if (typeof req.response != "undefined") {
				var obj = JSON.parse(req.response);
				callback(obj.response.notifications, obj.response.tasks);
			} else {
				callback();
			}
		};
		req.onerror = function () {
			callback();
		};
		req.send(null);
	} catch (e) {
		callback();
	}
}

function scheduleRequest(delay) {
	console.log('Creating scheduled alarm');
	chrome.alarms.create('refresh', {periodInMinutes: delay});
}

// ajax stuff
function startRequest(params) {
	// Schedule request immediately. We want to be sure to reschedule, even in the
	// case where the extension process shuts down while this request is
	// outstanding.
	if (params && params.scheduleRequest) scheduleRequest(pollIntervalMin);

/*	function stopLoadingAnimation() {
		if (params && params.showLoadingAnimation) loadingAnimation.stop();
	}

	if (params && params.showLoadingAnimation)
		loadingAnimation.start();
*/

	getInboxCount(
		function(notifications, tasks) {
//      	stopLoadingAnimation();
			updateUnreadCount(notifications, tasks);
		}
/*	,
    function() {
      stopLoadingAnimation();
      delete localStorage.unreadCount;
      updateIcon();
}*/
	);
}

function onInit() {
	startRequest({scheduleRequest: true});
}

function onAlarm(alarm) {
	console.log('Got alarm', alarm);
	if (alarm.name == 'refresh') {
		startRequest({scheduleRequest:true});
	}
}

function updateUnreadCount(notifications, tasks) {
	var count = notifications; // TODO: mod tasks
	if (typeof count != "undefined") {
		var changed = localStorage.unreadCount != count;
		localStorage.unreadCount = count;
	} else {
		//delete localStorage.unreadCount;
	}
	updateIcon(count);
	/*if (changed) animateFlip();*/
}

function updateIcon(count) {
	if (!localStorage.hasOwnProperty('unreadCount')) {
		//chrome.browserAction.setIcon({path:"gmail_not_logged_in.png"});
		chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
		chrome.browserAction.setBadgeText({text:"?"});
	} else {
		//chrome.browserAction.setIcon({path: "gmail_logged_in.png"});
		chrome.browserAction.setBadgeBackgroundColor((typeof count != "undefined") ? 
			{color:[208, 0, 24, 255]} : {color:[190, 190, 190, 230]});
		chrome.browserAction.setBadgeText({
			text: localStorage.unreadCount != "0" ? localStorage.unreadCount : ""
		});
	}
}


chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);
chrome.browserAction.onClicked.addListener(goToInbox);

chrome.extension.onConnect.addListener(function(port) {
	var tab = port.sender.tab;
	port.postMessage({filteredUsers: localStorage.filteredUsers});
});

var filters = {
  // TODO(aa): Cannot use urlPrefix because all the url fields lack the protocol
  // part. See crbug.com/140238.
	url: [
		{urlContains: getNMapsNotificationsUrl().replace(/^https?\:\/\//, '')}, 
		{urlContains: getNMapsUrl().replace(/^https?\:\/\//, '')}
	]
};

chrome.webNavigation.onDOMContentLoaded.addListener(function(changeInfo) {
	if (changeInfo.url && (isNMapsNotificationsUrl(changeInfo.url) || isNMapsUrl(changeInfo.url))) {
		console.log('Recognized NMaps navigation to: ' + changeInfo.url + '.' +	
					'Refreshing count...');
		startRequest({scheduleRequest:false});
	}
}, filters);


chrome.idle.onStateChanged.addListener(function(newState) {
	// alert("new state: " + newState);
});
/*
chrome.runtime.onSuspend.addListener(function () {
	alert("On suspend");
});

chrome.runtime.onSuspendCanceled.addListener(function () {
	alert("On suspend canceled");
});

chrome.runtime.onStartup.addListener(function() {
	alert("wake up!");
});
*/