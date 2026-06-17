// ==UserScript==
// @name         Server Copy Button
// @version      0.0.3
// @description  Adds a copy button next to join button to copy server link
// @author       Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/ServerCopyButton.js
// ==/UserScript==

(function() {
    'use strict';

    const BASE_URL = 'https://kirka.io';

    function getServerLink(serverElement) {
        const sessionIdElement = serverElement.querySelector('.session-id');
        if (!sessionIdElement) return null;
        
        const sessionId = sessionIdElement.textContent.trim();
        if (!sessionId) return null;
        
        return `${BASE_URL}/games/${sessionId}`;
    }

    function createCopyButton(serverLink) {
        const button = document.createElement('button');
        button.setAttribute('data-v-e32a4426', '');
        button.className = 'button copy-button';
        
        const joinButton = document.querySelector('.button.join');
        if (joinButton) {
            const computedStyle = window.getComputedStyle(joinButton);
            button.style.cssText = `
                background-color: var(--WwNnWwmM-1);
                --hover-color: var(--WwNnWwmM-2);
                --top: var(--WwNnWwmM-2);
                --bottom: var(--WwNnWwmM-3);
                padding: 0 12px;
                height: ${computedStyle.height || '32px'};
                cursor: pointer;
                border: none;
                border-radius: 4px;
                color: white;
                font-size: ${computedStyle.fontSize || '14px'};
                font-weight: ${computedStyle.fontWeight || '500'};
                position: relative;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                min-width: 32px;
                margin-left: 4px;
                text-transform: ${computedStyle.textTransform || 'capitalize'};
                font-family: ${computedStyle.fontFamily || 'inherit'};
                letter-spacing: ${computedStyle.letterSpacing || 'normal'};
                line-height: ${computedStyle.lineHeight || 'normal'};
            `;
        }

        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = 'var(--hover-color)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = 'var(--WwNnWwmM-1)';
        });

        const triangle = document.createElement('div');
        triangle.className = 'triangle';
        triangle.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
        button.appendChild(triangle);

        const contentSpan = document.createElement('div');
        contentSpan.className = 'text';
        contentSpan.style.cssText = `
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
        `;
        contentSpan.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
        `;
        button.appendChild(contentSpan);

        const borderContainer = document.createElement('div');
        borderContainer.className = 'WwNwmM';
        borderContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
        
        const borderTop = document.createElement('div');
        borderTop.className = 'border-top border';
        borderTop.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 200%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--top), transparent);
            animation: borderTop 2s linear infinite;
        `;
        
        const borderBottom = document.createElement('div');
        borderBottom.className = 'border-bottom border';
        borderBottom.style.cssText = `
            position: absolute;
            bottom: 0;
            left: -100%;
            width: 200%;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--bottom), transparent);
            animation: borderBottom 2s linear infinite;
        `;
        
        borderContainer.appendChild(borderTop);
        borderContainer.appendChild(borderBottom);
        button.appendChild(borderContainer);

        button.addEventListener('click', async (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            try {
                await navigator.clipboard.writeText(serverLink);
                
                const originalContent = contentSpan.innerHTML;
                contentSpan.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                
                setTimeout(() => {
                    contentSpan.innerHTML = originalContent;
                }, 1500);
            } catch (err) {
                const textArea = document.createElement('textarea');
                textArea.value = serverLink;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        });

        if (!document.querySelector('#copy-button-styles')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'copy-button-styles';
            styleSheet.textContent = `
                @keyframes borderTop {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                @keyframes borderBottom {
                    0% { left: 100%; }
                    100% { left: -100%; }
                }
                .copy-button {
                    position: relative;
                }
                .copy-button:hover {
                    background-color: var(--hover-color) !important;
                }
                .copy-button .WwNwmM {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                }
                .copy-button .border-top,
                .copy-button .border-bottom {
                    position: absolute;
                    width: 200%;
                    height: 2px;
                }
                .copy-button .border-top {
                    top: 0;
                    left: -100%;
                    background: linear-gradient(90deg, transparent, var(--top), transparent);
                    animation: borderTop 2s linear infinite;
                }
                .copy-button .border-bottom {
                    bottom: 0;
                    left: -100%;
                    background: linear-gradient(90deg, transparent, var(--bottom), transparent);
                    animation: borderBottom 2s linear infinite;
                }
            `;
            document.head.appendChild(styleSheet);
        }

        return button;
    }

    function addCopyButtons() {
        const servers = document.querySelectorAll('.server');
        
        servers.forEach(server => {
            if (server.querySelector('.copy-button')) return;
            
            const rightSection = server.querySelector('.right');
            if (!rightSection) return;
            
            const joinButton = rightSection.querySelector('.button.join');
            if (!joinButton) return;
            
            const serverLink = getServerLink(server);
            if (!serverLink) return;
            
            const copyButton = createCopyButton(serverLink);
            
            if (joinButton.nextSibling) {
                joinButton.parentNode.insertBefore(copyButton, joinButton.nextSibling);
            } else {
                joinButton.parentNode.appendChild(copyButton);
            }
            
            rightSection.style.display = 'flex';
            rightSection.style.alignItems = 'center';
            rightSection.style.gap = '4px';
            rightSection.style.justifyContent = 'flex-end';
        });
    }

    function setupObserver() {
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === 1) {
                            if (node.matches && node.matches('.server')) {
                                shouldUpdate = true;
                                break;
                            }
                            if (node.querySelector && node.querySelector('.server')) {
                                shouldUpdate = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (shouldUpdate) {
                setTimeout(addCopyButtons, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return observer;
    }

    function init() {
        setTimeout(() => {
            addCopyButtons();
        }, 500);
        
        const observer = setupObserver();
        
        setInterval(addCopyButtons, 3000);
        
        window.addEventListener('beforeunload', () => {
            observer.disconnect();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
