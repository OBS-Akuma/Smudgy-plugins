// ==UserScript==
// @name         Inventory Selected Items Sorter
// @version      0.0.2
// @description  Moves selected inventory items to the top of the list
// @author       protox
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/InventorySorter.js
// ==/UserScript==

(function() {
    'use strict';

    let isSorting = false;
    let activeObserver = null;
    let isSetup = false;
    let lastContainerHash = '';

    function sortSelectedItems() {
        if (isSorting) return;
        isSorting = true;

        try {
            const container = document.querySelector('.inventory .content .subjects');
            if (!container) {
                isSorting = false;
                return;
            }

            const currentHash = container.children.length + '-' + 
                Array.from(container.querySelectorAll('.subject')).map(el => el.className).join('|');
            
            if (currentHash === lastContainerHash && isSetup) {
                isSorting = false;
                return;
            }
            lastContainerHash = currentHash;

            const subjects = Array.from(container.querySelectorAll('.subject'));
            if (subjects.length === 0) {
                isSorting = false;
                return;
            }

            const selected = [];
            const unselected = [];

            subjects.forEach(subject => {
                if (subject.querySelector(':scope > .selected')) {
                    selected.push(subject);
                } else {
                    unselected.push(subject);
                }
            });

            if (selected.length > 0) {
                const fragment = document.createDocumentFragment();
                selected.forEach(item => fragment.appendChild(item));
                unselected.forEach(item => fragment.appendChild(item));

                container.innerHTML = '';
                container.appendChild(fragment);

                console.log(`[Inventory Sorter] Moved ${selected.length} selected item(s) to the top.`);
            }
        } catch (error) {
            console.warn('[Inventory Sorter] Error:', error.message);
        } finally {
            isSorting = false;
        }
    }

    function setupObserver(container) {
        if (activeObserver) {
            activeObserver.disconnect();
            activeObserver = null;
        }

        const observer = new MutationObserver((mutations) => {
            const hasRelevantChanges = mutations.some(mutation => 
                mutation.type === 'childList' && 
                (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)
            );

            if (hasRelevantChanges && !isSorting) {
                setTimeout(() => {
                    sortSelectedItems();
                }, 100);
            }
        });

        observer.observe(container, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

        activeObserver = observer;
        isSetup = true;
        console.log('[Inventory Sorter] Observer active. Selected items will stay at the top.');
    }

    function setupInventorySorter() {
        const container = document.querySelector('.inventory .content .subjects');
        if (container) {
            setupObserver(container);
            
            setTimeout(() => {
                sortSelectedItems();
            }, 50);
            
            return true;
        }
        return false;
    }

    function persistentCheck() {
        if (!activeObserver || !document.querySelector('.inventory .content .subjects')) {
            const container = document.querySelector('.inventory .content .subjects');
            if (container) {
                setupObserver(container);
                setTimeout(() => {
                    sortSelectedItems();
                }, 50);
            }
        } else {
            sortSelectedItems();
        }
    }

    window.addEventListener('load', function() {
        setupInventorySorter();
    });
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(setupInventorySorter, 100);
    }

    setInterval(persistentCheck, 1000);
    window.stopInventorySorter = function() {
        if (activeObserver) {
            activeObserver.disconnect();
            activeObserver = null;
            isSetup = false;
            console.log('[Inventory Sorter] Stopped.');
        }
    };
    window.sortInventory = function() {
        sortSelectedItems();
    };

    window.reloadInventorySorter = function() {
        if (activeObserver) {
            activeObserver.disconnect();
            activeObserver = null;
        }
        isSetup = false;
        setupInventorySorter();
        console.log('[Inventory Sorter] Reloaded.');
    };

    console.log('[Inventory Sorter] Script loaded. Will keep selected items at the top.');
})();
