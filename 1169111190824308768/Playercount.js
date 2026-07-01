// ==UserScript==
// @name         Playercount
// @version      0.0.2
// @description  Allows you to view The amount of players in EU,NA,ASIA
// @author       xaexo, carrysheriff, Akuma
// @github       https://raw.githubusercontent.com/OBS-Akuma/Smudgy-plugins/refs/heads/main/1169111190824308768/Playercount.js
// ==/UserScript==

let microwave_players = "";
let foundmicowave = false;
async function playercountgetter(region) {
  let playercountnumber = 0;
  try {
    let playercount = await fetch(`https://${region}.kirka.io/matchmake/`);

    let playercountJSON = await playercount.json();

    if (microwave_players == "") {
      playercountJSON.forEach((item) => {
        let found = 0;
        let temp_microwave = "";
        Object.keys(item).forEach((key) => {
          if (typeof item[key] == "number" && item[key] < 9) {
            found++;
            temp_microwave = key;
          }
        });
        if (found == 1 && temp_microwave != "") {
          microwave_players = temp_microwave;
          foundmicowave = true;
        }
      });
    }

    playercountJSON.forEach((element) => {
      playercountnumber += element[microwave_players];
    });
  } catch {}
  return playercountnumber;
}

async function createHTMLelement(text, number, id) {
  const playcountelement = document.createElement("div");
  playcountelement.id = id;
  playcountelement.className = id;
  playcountelement.innerHTML = `<div data-v-78c6e76c="" data-v-0ae66549="">${text}: ${number}</div>`;
  return playcountelement;
}

async function playercountstart() {
  //EU
  let euplayercountnumber = await playercountgetter("eu");
  //NA
  let naplayercountnumber = await playercountgetter("na");
  //ASIA
  let asiaplayercountnumber = await playercountgetter("asia");
  let globalplayercount = 0;
  globalplayercount += Number(euplayercountnumber);
  globalplayercount += Number(naplayercountnumber);
  globalplayercount += Number(asiaplayercountnumber);
  
  const currentlyplaying = document.createElement("div");
  currentlyplaying.id = "currentlyplaying";
  currentlyplaying.className = "currentlyplaying";
  currentlyplaying.innerHTML =
    '<div data-v-78c6e76c="" data-v-0ae66549="">CURRENTLY PLAYING:</div>';
  const playcountelement = await createHTMLelement(
    "TOTAL",
    globalplayercount,
    "playcountelement",
  );
  const playcountelementeu = await createHTMLelement(
    "EU",
    euplayercountnumber,
    "playcountelementeu",
  );
  const playcountelementna = await createHTMLelement(
    "NA",
    naplayercountnumber,
    "playcountelementna",
  );
  const playcountelementasia = await createHTMLelement(
    "ASIA",
    asiaplayercountnumber,
    "playcountelementasia",
  );
  
  let playerholderelement = document.createElement("div");
  playerholderelement.id = "playerholderelement";
  playerholderelement.className = "playerholderelement";
  playerholderelement.innerHTML = "";
  playerholderelement.style.display = "block";
  playerholderelement.style.position = "absolute";
  playerholderelement.style.bottom = "0";
  playerholderelement.style.zIndex = "11";
  playerholderelement.style.marginBottom = "1.4rem";

  const observer = new MutationObserver(() => {
    if (
      window.location.href == "https://kirka.io/" &&
      document.getElementById("settings-and-socicons") &&
      !document.getElementById("playerholderelement")
    ) {
      document
        .getElementsByClassName("interface text-2")[0]
        .appendChild(playerholderelement);
      document.getElementById("playerholderelement").prepend(playcountelement);
      document
        .getElementById("playerholderelement")
        .prepend(playcountelementeu);
      document
        .getElementById("playerholderelement")
        .prepend(playcountelementna);
      document
        .getElementById("playerholderelement")
        .prepend(playcountelementasia);
      document.getElementById("playerholderelement").prepend(currentlyplaying);
    }
  });
  const config = {
    subtree: true,
    childList: true,
  };
  observer.observe(document, config);
  let playercountelementspawninginterval = setInterval(() => {
    if (document.getElementById("playerholderelement")) {
      window.clearInterval(playercountelementspawninginterval);
    } else {
      if (document.getElementsByClassName("interface text-2")[0]) {
        document
          .getElementsByClassName("interface text-2")[0]
          .appendChild(playerholderelement);
        document
          .getElementById("playerholderelement")
          .prepend(playcountelement);
        document
          .getElementById("playerholderelement")
          .prepend(playcountelementeu);
        document
          .getElementById("playerholderelement")
          .prepend(playcountelementna);
        document
          .getElementById("playerholderelement")
          .prepend(playcountelementasia);
        document
          .getElementById("playerholderelement")
          .prepend(currentlyplaying);
      }
    }
  });
}
playercountstart();
