// ==UserScript==
// @name         BKC Auto Quest Claimer
// @description  It should auto claim quests, like previously in BKC client. (IN_dev)
// @version      0.3
// @author       infi, boden, skywalk, Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/QuestClaimer.js
// ==/UserScript==

setInterval(async () => {
    if (localStorage.token === "") return;
    
    try {
        let quests = await fetch("https://api2.kirka.io/api/wnWmNwMW", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": "Bearer " + localStorage.getItem("token"),
                "content-type": "application/json;charset=UTF-8",
                "csrf": "token",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrer": "https://kirka.io/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "{\"wNmnwWW\":\"wnWmwNMW\"}",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        });
        
        if (quests.status >= 400) return;
        quests = await quests.json();
        
        for (let quest of quests) {
            if (quest.wmNnWWwM && quest.wmNnWWwM.wmWWNwn === true && !quest.wmNnWWwM.wWNmnwWM) {
                let claimQuest = await fetch("https://api2.kirka.io/api/wMWWmnNw/wNmwWMW", {
                    "headers": {
                        "accept": "application/json, text/plain, */*",
                        "authorization": "Bearer " + localStorage.getItem("token"),
                        "content-type": "application/json;charset=UTF-8",
                        "csrf": "token",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-site"
                    },
                    "referrer": "https://kirka.io/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body": JSON.stringify({wnWmNwM: "quest:" + quest.WwmMWw}),
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                });
                
                let claimResult = await claimQuest.json();
                console.log("Claimed quest:", quest.WwmMWw, claimResult);
            }
        }
    } catch (error) {
        console.error("Error in quest claiming:", error);
    }
}, 15000);
