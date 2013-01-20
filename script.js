var YaExt = window.YaExt || {};
(function() {
	var filteredUsers = [];
	
	function getFilteredPositions() {
		var users = $(".b-wmdata__layout .b-user");
		if (users.length == 0) {
			console.log("No users on page");
			return []; // clear notification page
		}

		var filteredPositions = [];
		for (var i = 0; i < users.length; i++) {
			var href = users[i].firstChild.href;
			var needToFilter = false;
			if (typeof href != "undefined") {
				for (var j = 0; j < filteredUsers.length; j++) {
					if (href.indexOf("/users/" + filteredUsers[j] + "/") != -1) {
						needToFilter = true;
						break;
					};
				}
			} else {
				// TODO: add setting
				needToFilter = true; // Hide "Робот"
			}
			if (needToFilter) {
				filteredPositions.push(i);
			}
		}
		return filteredPositions;
	}
	
	function getFilteredIds() {
		var idsInput = $("input[name=ids]")[0];
		if (typeof idsInput == "undefined") {
			console.log("Can't find ids form element");
			return []; // read-only mode
		}
		var ids = idsInput.value.split(",");
		var users = $(".b-wmdata__layout .b-user");
		if (ids.length != users.length) {
			console.error("Can't match ids to user list");
			return [];
		}
		
		var filteredIds = [];
		var filteredPositons = getFilteredPositions();
		
		for (var i = 0; i < filteredPositons.length; i++) {
			filteredIds.push(ids[filteredPositons[i]]);
		}
		return filteredIds;
	}
		
	function canBeFiltered() {
		return filteredUsers.length != 0 && getFilteredPositions().length != 0;
	}

	function createFilterButton() {
		var input = document.createElement("input");
		input.className = "b-wmdata__more__control";
		input.style.display = "block";
		input.type = "submit";
		input.value = "удалите изменения модераторов";
		input.addEventListener("click", function() {
			YaExt.filterIds();
		}, false);
		
		var form = $(".b-wmdata__more")[0];
		form.appendChild(input);
		console.log("New button has been added.");
	}

	function addEvent(el, type, fn) {
		if (el && el.nodeName || el === window) {
			el.addEventListener(type, fn, false);
		} else if (el && el.length) {
			for (var i = 0; i < el.length; i++) {
				addEvent(el[i], type, fn);
			}
		}
	}
	
	var matchedEntiresHidden = false;
	
	function removeMatchedEntries() {
		var users = $(".b-wmdata__layout .b-user");
		var filteredPositions = getFilteredPositions();
		for (var i = 0; i < filteredPositions.length; i++) {
			var nodeToRemove = users[filteredPositions[i]].parentNode.parentNode;
			needToRemove.parentNode.remove(needToRemove);
		}
		console.log("Unnecessary " + filteredPositions.length + " log entries have been removed");
	}
	
	function hideMatchedEntries() {
		var users = $(".b-wmdata__layout .b-user");
		var filteredPositions = getFilteredPositions();
		for (var i = 0; i < filteredPositions.length; i++) {
			var nodeToHide = users[filteredPositions[i]].parentNode.parentNode;
			nodeToHide.style.display = "none";
		}
		console.log("Unnecessary " + filteredPositions.length + " log entries have been hided");		
	}

	function unhideMatchedEntries() {
		var users = $(".b-wmdata__layout .b-user");
		var filteredPositions = getFilteredPositions();
		for (var i = 0; i < filteredPositions.length; i++) {
			var nodeToHide = users[filteredPositions[i]].parentNode.parentNode;
			nodeToHide.style.display = "";
		}
		console.log("Unnecessary " + filteredPositions.length + " log entries have been unhided");		
	}

	
	function tryToFilter() {
		if (canBeFiltered()) {
			if (document.location.href.indexOf("modconsole/events-region") != -1) {
				if (localStorage.disableUserFilter == "false") {
					hideMatchedEntries();
				} else {
					console.log("Can't filter, because filter was disabled");
				}
			} else {
				createFilterButton();
			}
			return true;
		} else {
			console.log("This page can't be filtered. ");
			return false;
		}
	}

	function init() {
		if (typeof localStorage.disableUserFilter == "undefined") {
			localStorage.disableUserFilter = false;
		}
		
		if (document.location.href.indexOf("modconsole/events-region") != -1) {
			var parentElement = $(".b-wmdata")[0];
			var checkbox = document.createElement("input");
			checkbox.name = "YaExt-DisableFilter";
			checkbox.type = "checkbox";
			if (localStorage.disableUserFilter == "true") {
				checkbox.checked = "checked";
			}
			checkbox.addEventListener("click", function() {
				localStorage.disableUserFilter = this.checked;
				if (localStorage.disableUserFilter == "true") {
					unhideMatchedEntries();
				} else {
					hideMatchedEntries();
				}
			}, false);
			parentElement.appendChild(checkbox);
			var checkboxLabel = document.createElement("label");
			checkboxLabel.setAttribute("for", "YaExt-DisableFilter");
			checkboxLabel.innerHTML = "Выключить фильтр";
			checkboxLabel.style.marginLeft = "5px";
			parentElement.appendChild(checkboxLabel);
		}
		
		isFiltered = tryToFilter();	
	}
	
	var isFiltered = false;	

	YaExt.setFilteredUsers = function(newFilteredUsers) {
		filteredUsers = newFilteredUsers;
		console.log("New user list has been set: " + newFilteredUsers.length + " users");
		if (!isFiltered) isFiltered = tryToFilter();
	};
	
	YaExt.getFilteredUsers = function() {return filteredUsers;};

	YaExt.filterIds = function() {
		var idsInput = $("input[name=ids]")[0];
		var filteredIds = getFilteredIds();
		idsInput.value = filteredIds.join(",");
		console.log("Removing unnecessary " + filteredIds.length + " log entries");
	};
	
	init();
})();

window.YaExt = YaExt;