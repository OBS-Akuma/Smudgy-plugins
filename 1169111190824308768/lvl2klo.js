// ==UserScript==
// @name         Kirka KLO Display
// @version      0.0.1
// @description  Replace level with KLO from API (kirka api)
// @author       Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/lvl2klo.js
// ==/UserScript==

(function() {
    'use strict';

    async function getKLO() {
        const token = localStorage.getItem('token');
        if (!token) return;

        const user = document.querySelector('[data-v-63a0c208][data-v-e3674cae].username');
        if (!user) return;

        const name = user.textContent.trim().replace('#', '');
        
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

            const levels = document.querySelector('[data-v-00ce7b25].levels');
            if (levels) {
                const newDiv = document.createElement('div');
                newDiv.setAttribute('data-v-00ce7b25', '');
                newDiv.className = 'levels';
                newDiv.appendChild(document.createTextNode(klo));
                
                const label = document.createElement('div');
                label.setAttribute('data-v-00ce7b25', '');
                label.className = 'klo';
                label.textContent = 'srp';
                newDiv.appendChild(label);
                
                levels.parentNode.replaceChild(newDiv, levels);
            }
        } catch (error) {

        }
    }

    window.addEventListener('load', getKLO);

    setInterval(getKLO, 2000);
})();
