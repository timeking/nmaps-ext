var pollIntervalMin = 5; // 5 minutes

var DEFAULT_MODERATORS = "t-e-n-y-a,noita,pasag,edinstvennyi,hartamon,astron1970,vddjack2008,gueen1986-91,dokuchaevsk-info,voloduav,prosto-psih-kogda-golodnyi,fatp-3654a,devyashin80,tavsura,alexey65537,sergets,adreskakadres,omelyanenko-mikhail,tee-jay,zic3d-rus,dkollegin,tupisov-mihail,bezpartochny,ttt184,tambov-karin,dopperr,gtrus21,xraylee,rastorgujewo,mmh5,a1212aa2012,glotovmax,drafter745,danilna2012,lightcurve,monchegorsk51rus,yegor-gaffarov,andyice-mail-ru,mem2002,stinec,dbuyanow,nikitastroilov2010,jalanajak,ipozi,beleshinda,lazarenko-maxim,flash-max1,mark-kagan,amour4ikk,fstranger,cheet,buegvl,fatpanzer,roma-domoratskij,an72kon,swink,alex-rv3qx,kolru2686,igrovit,alisandres,ast-xt,sclosegl,alkvi,mohov-alexei-karpinsk,neverov-abram,adlugach,agvares666,satchez,garry-veg,pa-nikulin,tolpygin,boris3636,devilreal,sharipov-rishat2011,hatecore89,kunin-kirill,frogla,vasques666,dimon2007-82,nikita1794121,isbritish,grigory-zaruk,nabiullin-rafi5,miko-post,nemez5551,alex-g85,vinnipushkin,maxsus-sl,x160811,gbeznin,roalexa,nikita-perm-59,akisdima,cheremhovo-org,fedorov-va,freerider28,ermentau,sasha-pimenov,nyrad993,dimvolkov,tdima7,alexxegorov,liberteen24,ilyasov-andrej,uncle-yuri,y1000bab,sashan72,y258424,profit-customer,alexmurphy76,baxyz,koskin-max,fedorov-va,ttt184,zivan82,nintser,shuriknah,anatolyy-d,den48rus,edos8519,anfritz,fnaq,bashboy1995,beketoff-alexander,mryasov,geo-alpha-contakt,golubkov,egorjevsk-ru,valeron87,skarch,stoiq,valeriyartem,sunbaka,ivantrushin11,jalanajak,beleshinda,dars73rus,iskitimcity,serega-anastasin,kesha-ya-team,plutons,rybikov-sergei,gryzunov-vlad2010,hirurg-1000,andrew-murray,z2z5,uncle-gigabyte,luzza2010,dozor5,shamrock1,rbs007,autolegend-ussr,kirilloff-iura,ulanov-a,sega-yarkin,kav912,vlleskov,olegkaif,usama-lll-7,ksim371,files-t-sait,wladnazarov,applemat,sergius1989,icat7,oleg-cool,www-slavyansk-ru,sher-art,alex7enoff,vn-lisa,sarry-com-ru,pipchenko130595,aldggl,art-pushka,micleowen,hddc,aantuch,vasla999,anigam,maximedunaev,asheyin,linfo2006,harry--po,timeking,evgeny-mukhin,new-yurok,denull,madmozg2,aluboshenko,kgblab,neviksasha,bazikyan,kazievru,frytrix,kidtm,al-evgrafov,koozoo,nucleartram,paulkempf,podmotal,disinvis,egolubov,qzmich,sergei-ant,basl,banzalik,danidin,windog-zic,rom1193,kirik9111,biandre,bezrukikh,yakumon,st-rangerk,sardigital,lexer-svnet,sleptsov,map116,jahom,iwfriends,qwerty-map1,andekm,shmachilin,vizual2005,sofsoul,djinnyboy,maksim9626,falkeyn,eltiren,bizmania,someone,ans34,ivlin-vo,m-i-b,hormold,balzaker,t3986660,pufix,lutyabc,jaroslavleff,anasteziolog2006,starmel3000,den-lenin,vaterset,kiruhina47,mrscylla,kirillz90,yanakilon,dmitry-loshkarev,alpapa,redalert666,questions7,chimit,d-b-m,naidemdom-com,lsdandk,martin-tjm,a42ru,deadmorozzzk,mikhan,marattell,mixermsk,xopok,lalekz,kerjemanov,sergw13,belyaev-dm,mrpavelpavlov,mig-at,olegnc,kvakvs,vilebox,ion2k,sf-2108,oleg-v-avdeev,pollux,sasrog,dovos,dimonnot,mr-syrano,tama0,yarkaya2006,karpovich-marisha,lamtyugina-anna,vsevolod-shorin,irina-zemljakova,frolan,sashacmc,yardkeeper,polarizzzz,zabyg17,lmovsesyan,mlaufer,ivan-kartograf,voloschka,ya-dfilatov,sawj,ki-net-ru,baxtep,padla2k,abak-serv,ustinov20106,zloinc,i9045703451,ossipoffff,energener,alko-up,l0ki-1,dmitrysukhov,ninaankara,nv-neft,krugosvet67,evilcartman,nnq11,vitalyts,roman-garmashov,gumisha,denis-ibaev,alecsandr27,criha95,no-one-on,anodonta,kokoshkino-sosny-2,nmigalnikov,anatolxx,alexrkam,ya-slava7505,valeriy-himich,pk-sly,d-granovsky,smileyarik,zelenovka-ru,deetan,fedor-odintsov,viper-r73,valitka,cthutq1986,pr1kly,chourique1,queerasfolk4ever,tail-f,mikel-vys,ya-astkras,karpovich-marisha,tama0,yarkaya2006,aralov,akolomenskaya,akbars-slv,shvets-artemik7709,kn-sonera,koytoora,pavel-gustchin,bounz,dalwynd,frytrix,moho,aizikov1,east50,alexeybelyalov,ymaps,mari-shkaw0w"; 
// from http://clubs.ya.ru/narod-karta-len-obl/
// + big thanks to Te*mik

function initFilter(callback) {
	if (typeof localStorage.filteredUsers == "undefined") {
		localStorage.filteredUsers = DEFAULT_MODERATORS;
	}
	if (typeof localStorage.moderators != "undefined") {
		var oldUsers = localStorage.moderators.split(",");
		var newUsers = localStorage.filteredUsers.split(",");
		var diff = [];
		for (var i = 0; i < oldUsers.length; i++) {
			if (newUsers.indexOf(oldUsers[i]) == -1) diff.push(oldUsers[i]);
		}
		if (diff.length == 0) {
			alert("Te*mik подготовил новый более полный список модераторов, в котором уже находятся пользоватли из вашего списка. Жмите ОК. :)");
		} else {
			if (confirm("Te*mik подготовил большой список модераторов, ваш прежний список пользователей для фильтрации будет изменён. Хотите ли вы добавить пользователей из вашего старого списка, которые не присутствуют в списке от Te*mik: " + diff)) localStorage.filteredUsers += "," + diff;
		}
		delete localStorage.moderators;
	}
	if (typeof(callback) != "undefined") callback();
}

function getUsers() {
	return localStorage.filteredUsers.split(",");
}


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

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	if (info.menuItemId == "addMenuId") {
		var users = localStorage.filteredUsers.split(",");
		var user = info.linkUrl.match(/\/users\/(.*)\//g)[0]; 
		user = user.substring(7, user.length - 1); 
		if (users.indexOf(user) == -1) {
			users.push(user);
			localStorage.filteredUsers = "" + users;
			//chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.sendMessage(tab.id, {filteredUsers: localStorage.filteredUsers});
		//});
		} else {
			alert("Пользователь '" + user + "' уже находится в фильтре");
		}
	} else if (info.menuItemId == "removeMenuId") {
		var users = localStorage.filteredUsers.split(",");
		var user = info.linkUrl.match(/\/users\/(.*)\//g)[0]; 
		user = user.substring(7, user.length - 1); 
		var index = users.indexOf(user);
		if (index != -1) {
			users.splice(index, 1);
			localStorage.filteredUsers = "" + users;
			localStorage.filteredUsers = "" + users;
			//chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.sendMessage(tab.id, {filteredUsers: localStorage.filteredUsers});
			//});
		} else {
			alert("Пользователя '" + user + "' в фильтре нет");
		}
	}
});

function onInit() {
	chrome.contextMenus.create({"title": "Добавить пользователя в фильтр", 
		"contexts":["link"], 
		"id": "addMenuId", 
		"targetUrlPatterns" : ["http://n.maps.yandex.ru/users/*/*"]
	});
	chrome.contextMenus.create({"title": "Удалить пользователя из фильтра", 
		"contexts":["link"], 
		"id": "removeMenuId", 
		"targetUrlPatterns" : ["http://n.maps.yandex.ru/users/*/*"]
	});
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
	var onFilterInit = function () {
		var tab = port.sender.tab;
		port.postMessage({filteredUsers: localStorage.filteredUsers});
	};
	if (typeof localStorage.filteredUsers == "undefined") {
		initFilter(onFilterInit);
	} else {
		onFilterInit();
	}
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