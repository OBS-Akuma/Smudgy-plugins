// ==UserScript==
// @name         Kirka Chat Counter
// @version      0.0.1
// @description  Chat character counter with 80 char limit
// @author       Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/ChatCounter.js
// ==/UserScript==

(function() {
    'use strict';

    function setupChatCounter() {
        const inputField = document.querySelector('input.input[type="text"]');
        if (!inputField) return;

        let enterButton = document.querySelector('.info-key-cont.enter');
        if (!enterButton) {
            enterButton = document.createElement('div');
            enterButton.className = 'info-key-cont enter';
            enterButton.textContent = 'ENTER';
            const container = document.querySelector('.input-container');
            if (container) container.appendChild(enterButton);
        }

        function updateButtonText() {
            const textLength = inputField.value.length;
            if (enterButton) {
                enterButton.textContent = textLength.toString();
                
                if (textLength >= 80) {
                    enterButton.style.color = '#ff0000';
                    enterButton.style.fontWeight = 'bold';
                    if (textLength === 80) {
                        enterButton.style.animation = 'pulseRed 0.5s ease-in-out';
                        setTimeout(() => { if (enterButton) enterButton.style.animation = ''; }, 500);
                    }
                } else {
                    enterButton.style.color = '';
                    enterButton.style.fontWeight = '';
                }
                
                if (textLength > 80) {
                    inputField.value = inputField.value.substring(0, 80);
                    updateButtonText();
                }
            }
        }

        const style = document.createElement('style');
        style.textContent = `@keyframes pulseRed { 0% { transform: scale(1); color: #ff0000; } 50% { transform: scale(1.1); color: #ff6666; } 100% { transform: scale(1); color: #ff0000; } }`;
        document.head.appendChild(style);

        function enforceCharLimit(e) {
            if (inputField.value.length >= 80 && !['Backspace','Delete','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','Tab'].includes(e.key)) {
                e.preventDefault();
            }
        }

        function handleEnterKey(e) {
            if (e.key === 'Enter' || e.keyCode === 13) {
                const count = inputField.value.length;
                if (count === 0 || count > 80) e.preventDefault();
            }
        }

        function handlePaste(e) {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const newText = inputField.value + pastedText;
            inputField.value = newText.length > 80 ? newText.substring(0, 80) : newText;
            updateButtonText();
        }

        inputField.addEventListener('input', updateButtonText);
        inputField.addEventListener('keydown', enforceCharLimit);
        inputField.addEventListener('keydown', handleEnterKey);
        inputField.addEventListener('paste', handlePaste);
        inputField.addEventListener('keyup', (e) => { updateButtonText(); if (e.key === 'Enter') setTimeout(updateButtonText, 10); });
        inputField.addEventListener('blur', updateButtonText);
        
        if (enterButton) {
            enterButton.addEventListener('click', (e) => {
                const count = inputField.value.length;
                if (count === 0 || count > 80) e.preventDefault();
            });
        }
        
        updateButtonText();
    }

    window.addEventListener('load', setupChatCounter);
    setInterval(setupChatCounter, 1000);
})();
