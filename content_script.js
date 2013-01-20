var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
	var port = chrome.extension.connect();

	port.onMessage.addListener(function(msg) {
		if (typeof msg.filteredUsers == "undefined") return;
		var actualCode = 'YaExt.setFilteredUsers("' + msg.filteredUsers + '".split(","));';
		var script = document.createElement('script');
		script.textContent = actualCode;
		(document.head||document.documentElement).appendChild(script);
		script.parentNode.removeChild(script);
	});
};