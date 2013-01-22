function pasteSimpleScript(actualCode) {
	var script = document.createElement('script');
	script.textContent = actualCode;
	(document.head||document.documentElement).appendChild(script);
	script.parentNode.removeChild(script);
}

function messageListener(msg, sender, sendResponse) {
	console.log(sender.tab ?
				"from a content script:" + sender.tab.url :
				"from the extension");
	if (typeof msg.filteredUsers != "undefined") {
		pasteSimpleScript('YaExt.setFilteredUsers("' + msg.filteredUsers + '".split(","));');
	}
}

var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);

s.onload = function() {
    s.parentNode.removeChild(s);
	var port = chrome.extension.connect();

	port.onMessage.addListener(messageListener);
};

chrome.extension.onMessage.addListener(messageListener);