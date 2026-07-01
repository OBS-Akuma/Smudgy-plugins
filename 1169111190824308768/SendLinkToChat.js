// ==UserScript==
// @name         Send Link to Chat Button
// @version      0.0.1
// @description  Adds a button to send current URL to Kirka chat
// @author       Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/SendLinkToChat.js
// ==/UserScript==

(function() {
    'use strict';

    let sendBtn = null;
    let activeObserver = null;
    let isSetup = false;

    function createSendButton() {
        const spectateBtn = document.querySelector('button.button.right-btn.invite2.rectangle');
        if (!spectateBtn) {
            return false;
        }

        if (document.querySelector('.send-link-btn')) {
            sendBtn = document.querySelector('.send-link-btn');
            return true;
        }

        const currentUrl = window.location.href;

        const newBtn = document.createElement('button');
        newBtn.classList.add('send-link-btn');
        
        Array.from(spectateBtn.attributes).forEach(attr => {
            if (attr.name !== 'class') {
                newBtn.setAttribute(attr.name, attr.value);
            }
        });
        
        newBtn.className = spectateBtn.className;
        newBtn.style.cssText = spectateBtn.style.cssText;
        newBtn.style.backgroundColor = '#1A8E50';
        newBtn.style.setProperty('--hover-color', '#1A8E50');
        newBtn.style.setProperty('--top', '#1A8E50');
        newBtn.style.setProperty('--bottom', '#1A8E50');
        
        const triangleDiv = document.createElement('div');
        triangleDiv.className = 'triangle';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'text';
        textDiv.textContent = 'SEND LINK';
        
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'WwNwmM';
        
        const borderTop = document.createElement('div');
        borderTop.className = 'border-top border';
        
        const borderBottom = document.createElement('div');
        borderBottom.className = 'border-bottom border';
        
        wrapperDiv.appendChild(borderTop);
        wrapperDiv.appendChild(borderBottom);
        
        newBtn.appendChild(triangleDiv);
        newBtn.appendChild(textDiv);
        newBtn.appendChild(wrapperDiv);
        
        spectateBtn.parentNode.insertBefore(newBtn, spectateBtn);

        function sendUrlToChat() {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const textElement = newBtn.querySelector('.text');
            const originalText = textElement.textContent;
            textElement.textContent = 'SENDING...';
            newBtn.style.opacity = '0.7';
            newBtn.style.pointerEvents = 'none';

            const ws = new WebSocket('wss://chat.kirka.io/', token);
            
            ws.onopen = function() {
                ws.send(currentUrl);
                textElement.textContent = 'SENT!';
                newBtn.style.opacity = '1';
                
                setTimeout(() => {
                    textElement.textContent = originalText;
                    newBtn.style.pointerEvents = 'auto';
                }, 2000);
                
                ws.close();
            };
            
            ws.onerror = function() {
                textElement.textContent = originalText;
                newBtn.style.opacity = '1';
                newBtn.style.pointerEvents = 'auto';
            };
        }

        newBtn.addEventListener('click', sendUrlToChat);
        sendBtn = newBtn;
        
        return true;
    }

    function setupSendButton() {
        const spectateBtn = document.querySelector('button.button.right-btn.invite2.rectangle');
        if (spectateBtn) {
            createSendButton();
            return true;
        }
        return false;
    }

    function setupObserver() {
        if (activeObserver) {
            activeObserver.disconnect();
            activeObserver = null;
        }

        const observer = new MutationObserver(() => {
            if (sendBtn && !document.body.contains(sendBtn)) {
                createSendButton();
            }
            
            if (!sendBtn || !document.body.contains(sendBtn)) {
                const spectateBtn = document.querySelector('button.button.right-btn.invite2.rectangle');
                if (spectateBtn) {
                    createSendButton();
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        activeObserver = observer;
        isSetup = true;
    }

    function persistentCheck() {
        if (!activeObserver || !document.querySelector('button.button.right-btn.invite2.rectangle')) {
            const spectateBtn = document.querySelector('button.button.right-btn.invite2.rectangle');
            if (spectateBtn) {
                if (!activeObserver) {
                    setupObserver();
                }
                if (!sendBtn || !document.body.contains(sendBtn)) {
                    createSendButton();
                }
            }
        } else {
            if (!sendBtn || !document.body.contains(sendBtn)) {
                createSendButton();
            }
        }
    }

    window.addEventListener('load', function() {
        setupSendButton();
        setupObserver();
    });
    
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(() => {
            setupSendButton();
            setupObserver();
        }, 100);
    }

    setInterval(persistentCheck, 2000);

    window.stopSendLink = function() {
        if (activeObserver) {
            activeObserver.disconnect();
            activeObserver = null;
            isSetup = false;
        }
    };

    window.reloadSendLink = function() {
        if (activeObserver) {
            activeObserver.disconnect();
            activeObserver = null;
        }
        isSetup = false;
        sendBtn = null;
        setupSendButton();
        setupObserver();
    };

})();
