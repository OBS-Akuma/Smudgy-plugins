// ==UserScript==
// @name         Kirka KLO Display
// @version      0.0.2
// @description  Replace level with KLO from API (kirka api)
// @author       Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/lvl2klo.js
// ==/UserScript==

(function() {
    'use strict';

    let lastKLO = null;
    let lastUsername = null;
    let currentLevelsElement = null;

    const SELECTORS = {
        username: '[data-v-63a0c208][data-v-e3674cae].username',
        levels: '[data-v-00ce7b25].levels'
    };

    function createKLOElements(klo) {
        const container = document.createElement('div');
        container.setAttribute('data-v-00ce7b25', '');
        container.className = 'levels';
        container.appendChild(document.createTextNode(klo));
        
        const label = document.createElement('div');
        label.setAttribute('data-v-00ce7b25', '');
        label.className = 'klo';
        label.textContent = 'srp';
        container.appendChild(label);
        
        return container;
    }

    async function getKLO() {
        if (document.readyState !== 'complete' && document.readyState !== 'interactive') {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) return;

        const user = document.querySelector(SELECTORS.username);
        if (!user) return;

        const name = user.textContent.trim().replace('#', '');
        
        if (name === lastUsername && lastKLO !== null) {
            updateDisplay(lastKLO);
            return;
        }

        try {
            const res = await fetch('https://api2.kirka.io/api/wNmwWMWn/wWNmMWnw', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    WwmMWw: name,
                    wmWW: true,
                    wmNwWMWn: 9
                })
            });

            const data = await res.json();
            const klo = Math.round(data.wWwnNmMW);
            
            lastUsername = name;
            lastKLO = klo;
            
            updateDisplay(klo);
        } catch (error) {
        }
    }

    function updateDisplay(klo) {
        const levels = document.querySelector(SELECTORS.levels);
        if (!levels) return;
        if (currentLevelsElement === levels && levels.textContent.includes(klo)) {
            return;
        }

        const newElement = createKLOElements(klo);
        levels.parentNode.replaceChild(newElement, levels);
        currentLevelsElement = newElement;
    }

    let debounceTimer = null;
    function scheduleUpdate() {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            getKLO();
            debounceTimer = null;
        }, 100);
    }
    let observer = null;
    function setupObserver() {
        if (observer) {
            observer.disconnect();
        }

        observer = new MutationObserver(() => {
            const user = document.querySelector(SELECTORS.username);
            if (!user) return;

            const currentName = user.textContent.trim().replace('#', '');
            if (currentName !== lastUsername) {
                getKLO();
                return;
            }
            const levels = document.querySelector(SELECTORS.levels);
            if (levels && levels !== currentLevelsElement && lastKLO !== null) {
                updateDisplay(lastKLO);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: false
        });
    }

    function init() {
        getKLO();
        setupObserver();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    setInterval(getKLO, 5000);
    window.addEventListener('beforeunload', () => {
        if (observer) {
            observer.disconnect();
        }
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
    });
})();
