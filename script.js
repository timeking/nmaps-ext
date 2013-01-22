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
		input.value = "удалить выделенные";
		input.addEventListener("click", function() {
			YaExt.filterIds();
		}, false);
		input.id = "filter-button";
		
		var form = $(".b-wmdata__more")[0];
		var div = document.createElement("div");
		var label = document.createElement("label");
		label.innerHTML = "или";
		div.appendChild(label);
		div.appendChild(input);
		form.appendChild(div);
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

	function fetchUser(user, callback) {
		var req = new XMLHttpRequest();
		req.open(
			"GET",
			"http://n.maps.yandex.ru/users/" + user + "/", 
			true);
		req.onload = function() {
			if (!!req.response) {
				var userMap = JSON.parse(localStorage.users); 
				userMap[user] = {
					creations : (function() {var a = $("a", $(".b-about-user__section__item", req.response)[1])[0]; if (!!a) return a.innerHTML.match(/[0-9]+/)[0]; return 0;})(), 
					edits : (function() {var a = $("a", $(".b-about-user__section__item", req.response)[0])[0]; if (!!a) return a.innerHTML.match(/[0-9]+/)[0]; return 0;})(), 
					version : new Date().getTime()
				};
				localStorage.users = JSON.stringify(userMap);
				console.log("Fetched new user", userMap[user]);
				if (!!callback) callback(userMap[user]);
			}
		};
		req.send(null);
	}
	
	function addExpCount() {
		var users = $(".b-wmdata__layout .b-user");
		var userMap = JSON.parse(localStorage.users);
		for (var i = 0; i < users.length; i++) {
			var node = users[i].parentNode;
			if (typeof users[i].firstChild.href == "undefined") continue;
			var user = users[i].firstChild.href.match(/\/users\/(.*)\//g)[0]; 
			user = user.substring(7, user.length - 1); 
			
			var td = document.createElement("td");
			td.className = "b-wmdata__layout__l";
			if (!!userMap[user] && new Date().getTime() - userMap[user].version < 1000 * 3600 * 24) {
				td.innerHTML = userMap[user].creations;				
			} else {
				fetchUser(user, function(userObj) {
					td.innerHTML = userObj.creations;
				});
			}
			//td.innerHTML = Math.floor(10 + Math.random() * 10000);
			node.parentNode.insertBefore(td, node); 
		}
	}
	
	function markMatchedEntries() {
		var users = $(".b-wmdata__layout .b-user");
		var filteredPositions = getFilteredPositions();
		for (var i = 0; i < users.length; i++) {
			var node = users[i].parentNode.parentNode;
			node.removeAttribute("style");
			node.className = "";
		}
		for (var i = 0; i < filteredPositions.length; i++) {
			var node = users[filteredPositions[i]].parentNode.parentNode;
			//node.style.backgroundColor = "lightgoldenrodyellow";
			node.style.backgroundColor = "rgb(248, 248, 240)";
			node.className = "b-wmdata__item_moderator";
		}
		//console.log("Unnecessary " + filteredPositions.length + " log entries have been hided");		
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
		if (document.location.href.indexOf("/users/") != -1) return;
		if (canBeFiltered()) {
			if (document.location.href.indexOf("modconsole/events-region") != -1) {
				if (localStorage.disableUserFilter == "false") {
					hideMatchedEntries();
				} else {
					console.log("Can't filter, because filter was disabled");
				}
			} else {
				if ($(".b-wmdata__more #filter-button").length == 0) {
					createFilterButton();
				}
				markMatchedEntries();
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
		} else if (document.location.href.indexOf("/users/") != -1) {
			if (typeof localStorage.users == "undefined") localStorage.users = "[]";
			var users = $(".b-wminfo-i .b-user"); 
			var userMap = JSON.parse(localStorage.users); 
			
			if (users.length > 0) {
				for (var i = 0; i < users.length; i++) {
					if (typeof users[i].firstChild.href == "undefined") continue; 
					var user = users[i].firstChild.href.match(/\/users\/(.*)\//g)[0]; 
					user = user.substring(7, user.length - 1); 
					userMap[user] = {
						creations : users[i].parentNode.parentNode.nextSibling.firstChild.innerHTML, 
						edits : users[i].parentNode.parentNode.nextSibling.nextSibling.firstChild.innerHTML,
						version : new Date().getTime()
					}; 
				} 
			} else {
				var user = document.location.href.match(/\/users\/(.*)\//g)[0]; 
				user = user.substring(7, user.length - 1); 
				userMap[user] = {
					creations : (function() {var a = $("a", $(".b-about-user__section__item")[1])[0]; if (!!a) return a.innerHTML.match(/[0-9]+/)[0]; return 0;})(), 
					edits : (function() {var a = $("a", $(".b-about-user__section__item")[0])[0]; if (!!a) return a.innerHTML.match(/[0-9]+/)[0]; return 0;})(),
					version : new Date().getTime()
				};
			}
			localStorage.users = JSON.stringify(userMap);
			return;
		}
		
		isFiltered = tryToFilter();	
		// addExpCount();
	}
	
	var isFiltered = false;	

	YaExt.setFilteredUsers = function(newFilteredUsers) {
		filteredUsers = newFilteredUsers;
		console.log("New user list has been set: " + newFilteredUsers.length + " users");
		tryToFilter();
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