var usersTextarea;
var saveButton;
var cancelButton;
var revertButton;
var DEFAULT_MODERATORS;

function getBackgroundPage(callback) {
	if (chrome.runtime) {
		chrome.runtime.getBackgroundPage(callback);
	} else {
		callback(chrome.extension.getBackgroundPage());
	}
}

function init() {
	usersTextarea = document.getElementById("user-list");
	saveButton = document.getElementById("save-button");
	cancelButton = document.getElementById("cancel-button");
	revertButton = document.getElementById("revert-button");
	var onFilterInit = function() {
		usersTextarea.value = localStorage.filteredUsers;
	};
	getBackgroundPage(function(backgroundPage) {
		DEFAULT_MODERATORS = backgroundPage.DEFAULT_MODERATORS;
		backgroundPage.initFilter(onFilterInit);
	});
	markClean();
}

function save() {
	localStorage.filteredUsers = usersTextarea.value.replace(/ /g, "").replace(/\n/g, ",").replace(/\n/g, ",,");
	markClean();
}

function revert() {
	usersTextarea.value = DEFAULT_MODERATORS;
	markDirty();
}

function markDirty() {
	saveButton.disabled = false;
}

function markClean() {
	saveButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', function () {
	init();
	saveButton.addEventListener('click', save);
	cancelButton.addEventListener('click', init);
	revertButton.addEventListener('click', revert);
	usersTextarea.addEventListener('input', markDirty);
});
