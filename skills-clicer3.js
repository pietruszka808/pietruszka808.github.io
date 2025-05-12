import { defaultSkillValues } from "./clicer3 v2.js";

function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent
  
    defaultSkillValues.forEach((obj) => {
      let html = template;
  
      Object.keys(obj).forEach((key) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, obj[key])
      });
  
      upgradesContainer.innerHTML += html
    })
  }