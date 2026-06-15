// ==UserScript==
// @name         KirkaIgnoreList
// @version      0.0.73
// @description  Block/Ignore Player messages. Enter the #ShortID of the user you want to ignore and add them. You'll no longer see that users messages in server chat or in game chat. (You will still see the players trades)
// @author       Cheeseburger, Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1003936286513582202/KirkaIgnoreList.js
// ==/UserScript==

(function () {
  'use strict';

  const API_URL = 'https://api2.kirka.io/api/wNmwWMWn/wWWnwmNM';
  const change_event = new Event("change", { bubbles: true });

  let ignoreList = JSON.parse(localStorage.getItem('kirkaIgnoreListById')) || [];
  let input, feedback, listDisplay;

  function getAuthToken() {
    const tokenData = localStorage.getItem('token');
    if (!tokenData) return null;
    
    try {
      const parsed = JSON.parse(tokenData);
      return parsed.token || parsed.access_token || parsed;
    } catch (e) {
      return tokenData;
    }
  }

  async function fetchProfileById(id) {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No authentication token found');
        return null;
      }

      const requestBody = {
        "WwmMWw": id.toUpperCase().replace(/^#/, ''),
        "wmWW": true
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Accept": "application/json, text/plain, */*",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      });
      
      if (!res.ok) return null;
      const json = await res.json();
      
      if (json && json.WwmMWw) {
        const userId = json.WwmMWw;
        const username = json.wNmnw || json.wNmwWnWM || 'Unknown';
        
        if (json.wWMnmNw && json.wWMnmNw.wNmnw) {
          return { id: userId, username: json.wNmnw };
        }
        
        return { id: userId, username: username };
      }
      
      return null;
    } catch (error) {
      console.error('API fetch error:', error);
      return null;
    }
  }

  function saveIgnoreList() {
    localStorage.setItem('kirkaIgnoreListById', JSON.stringify(ignoreList));
  }

  function showFeedback(msg, isError = false) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.style.color = isError ? '#ff5555' : '#50fa7b';
    feedback.style.opacity = '1';
    setTimeout(() => { feedback.style.opacity = '0'; }, 3000);
  }

  function updateListDisplay() {
    if (!listDisplay) return;
    listDisplay.innerHTML = '';
    ignoreList.forEach(user => {
      const li = document.createElement('li');
      li.style = 'display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #44475a;';
      li.innerHTML = `
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #f8f8f2; font-size: 13px;">${user.username} (${user.id.substring(0, 8)}...)</span>
        <button style="background: #ff5555; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 11px; outline: none;">Remove</button>
      `;
      li.querySelector('button').onclick = () => {
        ignoreList = ignoreList.filter(u => u.id !== user.id);
        saveIgnoreList();
        updateListDisplay();
        showFeedback(`Removed ${user.username}`);
      };
      listDisplay.appendChild(li);
    });
  }

  function createIgnoreListUI() {
    if (document.querySelector('.kirka-ignore-list-container')) return;

    const container = document.createElement('div');
    container.className = 'kirka-ignore-list-container';
    container.style = 'position:relative; background:#282a36; border: 1px solid #44475a; border-radius:6px; padding:10px; color:#f8f8f2; font-family:sans-serif; max-width:600px; margin:16px auto; flex-direction:column; width: 240px;';

    if (!document.querySelector('#kirka-scroll-style')) {
      const styleTag = document.createElement('style');
      styleTag.id = 'kirka-scroll-style';
      styleTag.innerHTML = `
        .kirka-list::-webkit-scrollbar { width: 4px; }
        .kirka-list::-webkit-scrollbar-thumb { background: #44475a; border-radius: 2px; }
        .kirka-list::-webkit-scrollbar-track { background: #1e1f29; }
      `;
      document.head.appendChild(styleTag);
    }

    container.innerHTML = `
      <div style="display:flex; gap:6px; margin-bottom: 8px;">
        <input id="kirka_ignore_input" type="text" placeholder="#SHORTID" style="flex:1; padding:6px; border-radius:4px; border:1px solid #44475a; background:#1e1f29; color:#f8f8f2; font-size: 12px; outline: none;">
        <button id="kirka_add_button" style="padding: 6px 10px; font-size: 11px; background: #50fa7b; color: black; border-radius: 4px; border: none; cursor:pointer; outline: none;">Add</button>
      </div>
      <div class="kirka-feedback" style="font-size:11px; opacity:0; transition: opacity 0.3s; text-align: center;"></div>
      <ul class="kirka-list" style="list-style: none; padding: 0; margin: 0; max-height: 150px; overflow-y: auto;"></ul>
    `;

    input = container.querySelector('#kirka_ignore_input');
    feedback = container.querySelector('.kirka-feedback');
    listDisplay = container.querySelector('.kirka-list');
    const addButton = container.querySelector('#kirka_add_button');

    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') addButton.click();
    });

    addButton.addEventListener('click', async () => {
      const raw = input.value.trim();
      if (!raw.startsWith('#') || raw.length < 6) {
        return showFeedback('Enter a valid #ShortID', true);
      }

      const token = getAuthToken();
      if (!token) {
        return showFeedback('Please log in to use this feature', true);
      }

      showFeedback('Looking up user...', false);
      const result = await fetchProfileById(raw);
      if (!result) return showFeedback('User not found', true);

      if (ignoreList.some(u => u.id === result.id)) {
        return showFeedback('Already ignored', true);
      }

      ignoreList.push(result);
      saveIgnoreList();
      updateListDisplay();
      showFeedback(`Now ignoring ${result.username}`);
      input.value = '';
    });

    updateListDisplay();
    return container;
  }

  function blockMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
      const usernameElement = message.querySelector('span.author-name');
      const username = usernameElement ? usernameElement.textContent.trim().replace(/[:\s]*$/, '') : '';
      const shouldHide = username && ignoreList.some(user => user.username === username);
      message.style.display = shouldHide ? 'none' : '';
    });
  }

  function observeChat() {
    let retries = 0;
    const maxRetries = 20;
    const retryInterval = setInterval(() => {
      const chatContainer = document.querySelector('#chat');
      if (chatContainer) {
        new MutationObserver(blockMessages).observe(chatContainer, { childList: true, subtree: true });
        setInterval(blockMessages, 100);
        clearInterval(retryInterval);
      } else if (++retries >= maxRetries) {
        clearInterval(retryInterval);
      }
    }, 1000);
  }

  function startInjection() {
    const target = document.getElementById('scripts-options');
    if (target && !document.querySelector('.kirka-ignore-list-container')) {
      target.appendChild(createIgnoreListUI());
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      startInjection();
      observeChat();
    }, 1000);
  });
})();
