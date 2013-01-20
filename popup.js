// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*/
var req = new XMLHttpRequest();
req.open(
    "GET",
    "http://n.maps.yandex.ru/notifications/", 
/* /
	"http://api.flickr.com/services/rest/?" +
        "method=flickr.photos.search&" +
        "api_key=90485e931f687a9b9c2a66bf58a3861a&" +
        "text=hello%20world&" +
        "safe_search=1&" +  // 1 is "safe"
        "content_type=1&" +  // 1 is "photos only"
        "sort=relevance&" +  // another good one is "interestingness-desc"
"per_page=20", /* /
    true);
req.onload = showPhotos;
req.send(null);
/*/


function main() {
	chrome.windows.getCurrent(function (tab, window) {
		console.log("Current wiondow get: " + (typeof window != "undefined"));
	});
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
	//document.querySelector('button').addEventListener('click', clickHandler);
	console.log("dom loaded");	
	main();
});
chrome.tabs.onCreated.addListener(function(tab) {
	console.log("onCreated");
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log(tabId + " onUpdated: " + changeInfo.status);
	console.log(tab);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	console.log("onActivated");
	console.log(activeInfo);
});
//chrome.tabs.executeScript(null, {file: "content_script.js"});

function showPhotos() {
	var div = document.createElement("div");
	div.innerHTML = req.response;
	var page = div.getElementsByClassName("b-wmdata")[0];
	page.className += " i-ua_js_yes";
	document.body.appendChild(page);	
/*  var photos = req.responseXML.getElementsByTagName("photo");

  for (var i = 0, photo; photo = photos[i]; i++) {
    var img = document.createElement("image");
    img.src = constructImageURL(photo);
    document.body.appendChild(img);
}*/
}

// See: http://www.flickr.com/services/api/misc.urls.html
function constructImageURL(photo) {
  return "http://farm" + photo.getAttribute("farm") +
      ".static.flickr.com/" + photo.getAttribute("server") +
      "/" + photo.getAttribute("id") +
      "_" + photo.getAttribute("secret") +
      "_s.jpg";
}
