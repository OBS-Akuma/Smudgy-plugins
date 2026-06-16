// ==UserScript==
// @name         Inventory Value Viewer
// @version      0.0.1
// @description  Allows users To view the value of other users inv on their profile, optimized with short ID lookup to reduce API calls and speed up loading times.
// @author       Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/inv.js
// ==/UserScript==

(function() {
    if (window.__invObserver) {
        window.__invObserver.disconnect();
    }
    
    let invAdded = false;
    let isFetching = false;
    
    async function getShortIdFromLongId(longId) {
        try {
            console.log(`Getting short ID for: ${longId}`);
            const response = await fetch('https://api2.kirka.io/api/wNmwWMWn/wWWnwmNM', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ WwmMWw: longId })
            });
            
            const data = await response.json();
            console.log('Profile API response:', data);
            
            if (data && data.wMWWm) {
                return {
                    shortId: data.wMWWm,
                    displayName: data.wNmnw,
                    level: data.wNmwWnWM
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching short ID:', error);
            return null;
        }
    }
    
    async function fetchUserId() {
        const url = window.location.href;
        console.log('Current URL:', url);
        
        let match = url.match(/profile\/([A-Za-z0-9-]+)/);
        if (!match) return null;
        
        const longId = match[1];
        
       
        const isAlreadyShort = longId.length <= 6 && !longId.includes('-');
        
        if (isAlreadyShort) {
            console.log(`Already a short ID: ${longId}`);
            return { 
                userId: `#${longId}`, 
                isShortId: true,
                shortId: longId
            };
        }
        
        
        console.log(`Long ID detected: ${longId}, fetching short ID...`);
        const profileData = await getShortIdFromLongId(longId);
        
        if (profileData && profileData.shortId) {
            console.log(`Found short ID: ${profileData.shortId}`);
            return { 
                userId: `#${profileData.shortId}`, 
                isShortId: true,
                shortId: profileData.shortId,
                displayName: profileData.displayName
            };
        }
        
        
        console.log('Could not get short ID, trying long ID directly');
        return { 
            userId: longId, 
            isShortId: false 
        };
    }
    
    async function fetchInventory(userId, isShortId) {
        try {
            const payload = { userId, isShortId };
            console.log('Sending inventory request:', payload);
            
            const response = await fetch('https://www.smudgy.store/api/getinventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            
            const data = await response.json();
            console.log(`Inventory response: ${data.data?.length || 0} items found`);
            
            if (data.success && data.data) {
                return data.data;
            }
            return [];
        } catch (error) {
            console.error('Error fetching inventory:', error);
            return [];
        }
    }
    
    async function fetchItemsPrices(itemNames) {
        if (!itemNames.length) return {};
        
        const itemsParam = itemNames.join(',');
        console.log(`Fetching prices for ${itemNames.length} items...`);
        
        try {
            const response = await fetch(`https://www.smudgy.store/api/pricecalc?price=${encodeURIComponent(itemsParam)}`);
            const data = await response.json();
            return data.breakdown || {};
        } catch (error) {
            console.error('Error fetching batch prices:', error);
            return {};
        }
    }
    
    async function calculateTotalValue(inventory) {
        const itemMap = new Map();
        
        inventory.forEach(item => {
            const itemName = item.item.name;
            const amount = item.amount || 1;
            itemMap.set(itemName, (itemMap.get(itemName) || 0) + amount);
        });
        
        const uniqueItems = Array.from(itemMap.keys());
        console.log(`Unique items: ${uniqueItems.length}`);
        
        if (uniqueItems.length === 0) return 0;
        
        const prices = await fetchItemsPrices(uniqueItems);
        
        let totalValue = 0;
        for (const [itemName, amount] of itemMap.entries()) {
            const price = prices[itemName] || 0;
            totalValue += price * amount;
        }
        
        return totalValue;
    }
    
    function formatNumber(num) {
        if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000000).toFixed(1) + 'M';
        return num.toString();
    }
    
    async function addInvStat() {
        
        if (isFetching) {
            console.log('Already fetching, skipping...');
            return;
        }
        
        if (!window.location.href.includes('/profile/')) {
            return;
        }
        
        if (document.querySelector('.card.inv-card')) {
            console.log('INV card already exists');
            return;
        }
        
        isFetching = true;
        console.log('Fetching inventory data...');

        const userData = await fetchUserId();
        if (!userData) {
            console.log('Could not extract user ID');
            isFetching = false;
            return;
        }
        
        console.log(`Using userId: ${userData.userId} (isShortId: ${userData.isShortId})`);

        const inventory = await fetchInventory(userData.userId, userData.isShortId);
        let totalValue = 0;
        
        if (inventory && inventory.length) {
            totalValue = await calculateTotalValue(inventory);
            console.log(`Total value: ${totalValue.toLocaleString()} coins`);
        } else {
            console.log('No inventory found');
        }
        
        const kloCard = document.querySelector('.card.k-d');
        if (!kloCard) {
            console.log('KLO card not found, retrying in 1 second...');
            setTimeout(() => {
                isFetching = false;
                addInvStat();
            }, 1000);
            return;
        }

        if (document.querySelector('.card.inv-card')) {
            console.log('INV card was added during fetch');
            isFetching = false;
            return;
        }

        const invCard = document.createElement('div');
        invCard.className = 'card inv-card';
        invCard.setAttribute('data-v-cb399910', '');
        invCard.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px 25px;
            margin-left: 10px;
        `;
        
        const statNameDiv = document.createElement('div');
        statNameDiv.className = 'stat-name text-2';
        statNameDiv.style.cssText = `
            font-size: 0.8rem;
            opacity: 0.7;
            margin-bottom: 4px;
            display: flex;
            align-items: center;
            gap: 4px;
        `;
        statNameDiv.innerHTML = `
            INV
            <div data-v-21922ca9="" class="v-popover" style="display: inline-block;">
                <div class="WwwMmnN" style="display: inline-block;">
                    <div data-v-21922ca9="" class="copy-cont">
                        <span class="info-icon" style="cursor: help;">?</span>
                    </div>
                </div>
            </div>
        `;
        
        const statValueDiv = document.createElement('div');
        statValueDiv.className = 'stat-value stat-value-inv text-2';
        statValueDiv.style.cssText = `
            font-size: 1.3rem;
            font-weight: 700;
            color: #ffb914;
        `;
        statValueDiv.textContent = formatNumber(totalValue);
        
        // Tooltip
        const infoIcon = statNameDiv.querySelector('.info-icon');
        if (infoIcon) {
            let tooltip;
            infoIcon.addEventListener('mouseenter', (e) => {
                tooltip = document.createElement('div');
                tooltip.textContent = `Total: ${totalValue.toLocaleString()} coins`;
                tooltip.style.cssText = `
                    position: fixed;
                    background: #1a1a2e;
                    color: #ffb914;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    z-index: 10000;
                    white-space: nowrap;
                    pointer-events: none;
                `;
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY - 25 + 'px';
                document.body.appendChild(tooltip);
            });
            infoIcon.addEventListener('mouseleave', () => {
                if (tooltip) tooltip.remove();
            });
        }
        
        invCard.appendChild(statNameDiv);
        invCard.appendChild(statValueDiv);
        

        kloCard.parentElement.insertBefore(invCard, kloCard.nextSibling);
        
        invAdded = true;
        isFetching = false;
        console.log(`card added or somethinggg Value: ${totalValue.toLocaleString()} coins`);
    }
    
    let attempts = 0;
    const maxAttempts = 5;
    
    function tryAddInvStat() {
        if (invAdded) return;
        if (attempts >= maxAttempts) {
            console.log('Max attempts reached, stopping');
            return;
        }
        
        attempts++;
        console.log(`Attempt ${attempts}/${maxAttempts}...`);
        addInvStat();
        
        if (!invAdded && attempts < maxAttempts) {
            setTimeout(tryAddInvStat, 1500);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(tryAddInvStat, 1000));
    } else {
        setTimeout(tryAddInvStat, 1000);
    }
    
    let lastUrl = window.location.href;
    window.__invObserver = new MutationObserver(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            invAdded = false;
            attempts = 0;
            console.log('Navigation detected, resetting...');
            setTimeout(tryAddInvStat, 1500);
        }
    });
    window.__invObserver.observe(document, { subtree: true, childList: true });
    
    console.log('INV script loaded (optimized with short ID lookup)');
})();
