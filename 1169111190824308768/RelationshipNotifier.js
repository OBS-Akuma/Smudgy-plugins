// ==UserScript==
// @name         RelationshipNotifier
// @version      0.0.1
// @description    Notifies you when someone accepts/declines your friend request or unfriends you. Also checks if any of your friends or incoming friend requests are marked as scammers on the Smudgy Client Scammer List.
// @author       Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/RelationshipNotifier.js
// ==/UserScript==

(function() {
    if (window.__friendTrackerInstalled) return;
    window.__friendTrackerInstalled = true;

    let previousFriends = [];
    let previousIncoming = [];
    let currentInterval = null;
    let notifiedScammers = new Set();

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('[FriendTracker] No token found in localStorage');
        return;
    }

    try {
        const savedFriends = localStorage.getItem('Friends_list_0.0.2');
        if (savedFriends) previousFriends = JSON.parse(savedFriends);
        const savedIncoming = localStorage.getItem('Incoming_list_0.0.2');
        if (savedIncoming) previousIncoming = JSON.parse(savedIncoming);
        const savedNotified = localStorage.getItem('Notified_scammers_0.0.2');
        if (savedNotified) notifiedScammers = new Set(JSON.parse(savedNotified));
    } catch (e) {
        console.error('[FriendTracker] Failed to load saved lists:', e);
    }

    function ensureNotificationContainer() {
        let container = document.getElementsByClassName("vue-notification-group")[0];
        if (!container) {
            container = document.createElement("div");
            container.className = "vue-notification-group";
            container.style.cssText = "position: fixed; bottom: 0; left: 0; right: auto; top: auto; z-index: 9999;";
            const innerDiv = document.createElement("div");
            innerDiv.style.cssText = "position: relative; display: flex; flex-direction: column;";
            container.appendChild(innerDiv);
            document.body.appendChild(container);
        }
        return container;
    }

    const customNotification = (data) => {
        const container = ensureNotificationContainer();
        const notificationGroup = container.children[0];
        const notifElement = document.createElement("div");
        notifElement.classList.add("vue-notification-wrapper");
        notifElement.style = "transition-timing-function: ease; transition-delay: 0s; transition-property: all;";
        notifElement.innerHTML = `
        <div style="display: flex; align-items: center; padding: .9rem 1.1rem; margin-bottom: .5rem; color: var(--white); cursor: pointer; box-shadow: 0 0 0.7rem rgba(0,0,0,.25); border-radius: .2rem; background: linear-gradient(262.54deg,#202639 9.46%,#223163 100.16%); margin-left: 1rem; border: solid .15rem #ffb914; font-family: Exo 2;" class="alert-default">
            ${data.icon ? `<img src="${data.icon}" style="min-width: 2rem; height: 2rem; margin-right: .9rem;" />` : ""}
            <span style="font-size: 1rem; font-weight: 600; text-align: left;" class="text">${data.message}</span>
        </div>`;
        if (data.onClick) {
            notifElement.querySelector('.alert-default').addEventListener('click', data.onClick);
        }
        notificationGroup.appendChild(notifElement);
        setTimeout(() => { try { notifElement.remove(); } catch {} }, 10000);
    };

    function extractFriendList(data) {
        if (data && data.wMWWmwn && Array.isArray(data.wMWWmwn)) {
            return data.wMWWmwn.map(friend => ({ wMWWm: friend.wMWWm, wNmnw: friend.wNmnw, shortId: friend.wMWWm }));
        }
        return [];
    }

    function extractIncomingRequests(data) {
        if (data && data.wWnNmWM && Array.isArray(data.wWnNmWM)) {
            return data.wWnNmWM.map(request => ({ wMWWm: request.wMWWm, wNmnw: request.wNmnw, shortId: request.wMWWm }));
        }
        return [];
    }

    async function checkScammers(users) {
        try {
            const response = await fetch('https://opensheet.elk.sh/1FNq0RTv0SOSSRVmGJFtli3Fld86uoAlAjDzHByRiZFI/2');
            if (!response.ok) return;
            const data = await response.json();
            if (!Array.isArray(data)) return;
            const scammerMap = new Map();
            data.forEach(scammer => {
                const shortId = scammer.shortId ? scammer.shortId.replace(/^#/, '') : '';
                if (shortId) scammerMap.set(shortId, scammer);
            });
            users.forEach(user => {
                const shortId = user.shortId;
                if (scammerMap.has(shortId) && !notifiedScammers.has(shortId)) {
                    const scammer = scammerMap.get(shortId);
                    customNotification({
                        icon: `https://www.smudgy.store/api/list/profile.png?meow=${shortId}`,
                        message: `${user.wNmnw} (${shortId}) has been marked Unsafe`,
                        onClick: () => {
                            alert(`Reason: ${scammer.reason}\nReported by: ${scammer.reportedBy}\nDate: ${scammer.dateTime}`);
                        }
                    });
                    notifiedScammers.add(shortId);
                }
            });
            localStorage.setItem('Notified_scammers_0.0.2', JSON.stringify(Array.from(notifiedScammers)));
        } catch (error) {
            console.error('[FriendTracker] Failed to fetch scammers:', error);
        }
    }

    function compareFriendLists(oldList, newList) {
        const newIds = new Set(newList.map(f => f.shortId));
        oldList.filter(friend => !newIds.has(friend.shortId)).forEach(friend => {
            customNotification({
                icon: `https://www.smudgy.store/api/list/profile.png?meow=${friend.shortId}`,
                message: `User ${friend.wNmnw} (${friend.shortId}) isn't your friend anymore`
            });
        });
    }

    function compareIncomingRequests(oldIncoming, newIncoming, currentFriends) {
        const newIncomingIds = new Set(newIncoming.map(r => r.shortId));
        const friendIds = new Set(currentFriends.map(f => f.shortId));
        oldIncoming.filter(request => !newIncomingIds.has(request.shortId)).forEach(request => {
            customNotification({
                icon: `https://www.smudgy.store/api/list/profile.png?meow=${request.shortId}`,
                message: friendIds.has(request.shortId)
                    ? `You accepted ${request.wNmnw} (${request.shortId})`
                    : `You declined ${request.wNmnw} (${request.shortId})`
            });
        });
    }

    function watchForButtons() {
        document.querySelectorAll('button:not([data-ft-watched])').forEach(button => {
            button.setAttribute('data-ft-watched', 'true');
            button.addEventListener('click', () => setTimeout(fetchData, 500));
        });
    }

    async function fetchData() {
        try {
            const response = await fetch('https://api2.kirka.io/api/wNmwWMWn', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            const currentFriends = extractFriendList(data);
            const currentIncoming = extractIncomingRequests(data);
            await checkScammers([...currentFriends, ...currentIncoming]);
            if (previousFriends.length > 0) compareFriendLists(previousFriends, currentFriends);
            if (previousIncoming.length > 0) compareIncomingRequests(previousIncoming, currentIncoming, currentFriends);
            previousFriends = currentFriends;
            previousIncoming = currentIncoming;
            localStorage.setItem('Friends_list_0.0.2', JSON.stringify(previousFriends));
            localStorage.setItem('Incoming_list_0.0.2', JSON.stringify(previousIncoming));
        } catch (error) {
            console.error('[FriendTracker] Failed to fetch data:', error);
        }
    }

    fetchData();
    setInterval(watchForButtons, 2000);
    if (currentInterval) clearInterval(currentInterval);
    currentInterval = setInterval(fetchData, 60000);

    console.log('[FriendTracker] Initialized');
})();
