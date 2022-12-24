/*
    Copyright (C) 2022  Patrick260

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const COST_INCREMENT = 1.2;

const skinPrices = {
  "cookie": 0,
  "skin1": 500,
  "skin2": 5000,
  "skin3": 25000
};
const skinImages = ["cookie.png", "skin1.png", "skin2.png", "skin3.png"];

class Game {
  constructor() {
    this.cookies = 0;
    this.cursorCount = 0;
    this.grandmaCount = 0;
    this.bakeryCount = 0;
    this.timeMachineCount = 0;

    this.cursorCost = 10;
    this.grandmaCost = 100;
    this.bakeryCost = 1000;
    this.timeMachineCost = 10000;

    this.grandmaRate = 1;
    this.bakeryRate = 10;
    this.timeMachineRate = 100;

    this.currentSkin = "cookie";
    this.ownedSkins = {
      "skin1": false,
      "skin2": false,
      "skin3": false
    };

    this.prestigeLevel = 0;
    this.prestigeMultiplier = 1;
    this.prestigeCost = 1000;
  }

  updateCookieCount() {
    this.cookies += (this.grandmaCount * this.grandmaRate + this.bakeryCount * this.bakeryRate) * this.prestigeMultiplier;
    
    document.getElementById("cookie-count").innerHTML = `${this.cookies}`;
  }

  clickCookie() {
    this.cookies += (this.cursorCount + 1) * this.prestigeMultiplier;
    
    document.getElementById("cookie-count").innerHTML = `${this.cookies}`;
  }

  buyCursor() {
    if (this.cookies >= this.cursorCost) {
      this.cookies -= this.cursorCost;
      
      this.cursorCount += 1;

      this.cursorCost = Number((this.cursorCost * COST_INCREMENT).toFixed(0));

      document.getElementById("cursor-multiplier").innerHTML = `${this.cursorCount + 1}`;
      document.getElementById("cookie-count").innerHTML = `${this.cookies}`;
      document.getElementById("cursor-cost").innerHTML = `${this.cursorCost}`;
    }
  }

  buyGrandma() {
    if (this.cookies >= this.grandmaCost) {
      this.cookies -= this.grandmaCost;

      this.grandmaCount += 1;

      this.grandmaCost = Number((this.grandmaCost * COST_INCREMENT).toFixed(0));
      
      document.getElementById("grandma-count").innerHTML = `${this.grandmaCount}`;
      document.getElementById("cookie-count").innerHTML = `${this.cookies}`;
      document.getElementById("grandma-cost").innerHTML = `${this.grandmaCost}`;
    }
  }

  buyBakery() {
    if (this.cookies >= this.bakeryCost) {
      this.cookies -= this.bakeryCost;
      this.cookies = this.cookies;
      
      this.bakeryCount += 1;

      this.bakeryCost = Number((this.bakeryCost * COST_INCREMENT).toFixed(0));
      
      document.getElementById("bakery-count").innerHTML = `${this.bakeryCount}`;
      document.getElementById("cookie-count").innerHTML = `${this.cookies}`;
      document.getElementById("bakery-cost").innerHTML = `${this.bakeryCost}`;
    }
  }

  buyTimeMachine() {
    if (this.cookies >= this.timeMachineCost) {
      this.cookies -= this.timeMachineCost;
      
      this.timeMachineCount += 1;

      this.timeMachineCost = Math.max(10000, Math.min(Number((this.timeMachineCost * COST_INCREMENT).toFixed(0)), 90000));
      
      document.getElementById("time-machine-count").innerHTML = `${this.timeMachineCount}`;
      document.getElementById("cookie-count").innerHTML = `${this.cookies}`;
      document.getElementById("time-machine-cost").innerHTML = `${this.timeMachineCost}`;
    }
  }

  useTimeMachine() {
    if (this.timeMachineCount > 0) {
      this.timeMachineCount -= 1;
      
      document.getElementById("time-machine-count").innerHTML = `${this.timeMachineCount}`;
      
      const timeMachineInterval = setInterval(() => {
        this.cookies += this.timeMachineRate;
        document.getElementById("cookie-count").innerHTML = `${this.cookies}`;
      }, 1000);
      
      setTimeout(() => {
        clearInterval(timeMachineInterval);
        this.timeMachineRate = 100;
      }, 100000);
    }
  }

  saveGame() {
    localStorage.setItem("cookies", this.cookies);
    localStorage.setItem("cursorCount", this.cursorCount);
    localStorage.setItem("grandmaCount", this.grandmaCount);
    localStorage.setItem("bakeryCount", this.bakeryCount);
    localStorage.setItem("timeMachineCount", this.timeMachineCount);
    localStorage.setItem("cursorCost", this.cursorCost);
    localStorage.setItem("grandmaCost", this.grandmaCost);
    localStorage.setItem("bakeryCost", this.bakeryCost);
    localStorage.setItem("timeMachineCost", this.timeMachineCost);
    localStorage.setItem("currentSkin", this.currentSkin);
    localStorage.setItem("ownedSkins", JSON.stringify(this.ownedSkins));
  }

  loadGame() {
    if (localStorage.getItem("cursorCost") > 0) {
      this.cookies = Number(localStorage.getItem("cookies"));
      this.cursorCount = Number(localStorage.getItem("cursorCount"));
      this.grandmaCount = Number(localStorage.getItem("grandmaCount"));
      this.bakeryCount = Number(localStorage.getItem("bakeryCount"));
      this.timeMachineCount = Number(localStorage.getItem("timeMachineCount"));
      this.cursorCost = Number(localStorage.getItem("cursorCost"));
      this.grandmaCost = Number(localStorage.getItem("grandmaCost"));
      this.bakeryCost = Number(localStorage.getItem("bakeryCost"));
      this.timeMachineCost = Number(localStorage.getItem("timeMachineCost"));
      this.currentSkin = localStorage.getItem("currentSkin");
      this.ownedSkins = JSON.parse(localStorage.getItem("ownedSkins"));
  
      document.getElementById("cursor-multiplier").innerHTML = `${this.cursorCount + 1}`;
      document.getElementById("cookie-count").innerHTML = `${this.cookies}`;
      document.getElementById("cursor-cost").innerHTML = `${this.cursorCost}`;
      document.getElementById("grandma-count").innerHTML = `${this.grandmaCount}`;
      document.getElementById("grandma-cost").innerHTML = `${this.grandmaCost}`;
      document.getElementById("bakery-count").innerHTML = `${this.bakeryCount}`;
      document.getElementById("bakery-cost").innerHTML = `${this.bakeryCost}`;
      document.getElementById("time-machine-count").innerHTML = `${this.timeMachineCount}`;
      document.getElementById("time-machine-cost").innerHTML = `${this.timeMachineCost}`;
      document.getElementById("cookie").src = `res/${this.currentSkin}.png`;
    }
  }

  openShop() {
    document.getElementById("game").style.display = "none";
    document.getElementById("shop").style.display = "block";
  }

  closeShop() {
    document.getElementById("shop").style.display = "none";
    document.getElementById("game").style.display = "block";
  }

  buySkin(skin) {
    if (!this.ownedSkins[skin]) {
      if (this.cookies >= skinPrices[skin]) {
        this.cookies -= skinPrices[skin];
        this.ownedSkins[skin] = true;
        document.getElementById("cookie").src = `res/${skin}.png`;
      }
    } else {
      document.getElementById("cookie").src = `res/${skin}.png`;
    }

    this.currentSkin = skin;
  }

  resetSkin() {
    document.getElementById("cookie").src = `res/cookie.png`;
    this.currentSkin = "cookie";
  }

  prestige() {
    if (this.cookies >= this.prestigeCost) {
      this.cookies = 0;
      this.prestigeLevel += 1;
      this.prestigeMultiplier *= 2;
      this.prestigeCost *= 2;

      document.getElementById("prestige-level").innerHTML = this.prestigeLevel;
      document.getElementById("prestige-multiplier").innerHTML = this.prestigeMultiplier;
      document.getElementById("prestige-cost").innerHTML = this.prestigeCost;
    }
  }

}

const game = new Game();

setInterval(() => {
  game.updateCookieCount();
}, 1000);

document.getElementById("cookie").addEventListener("click", () => {
  game.clickCookie();
});
document.getElementById("buy-cursor").addEventListener("click", () => {
  game.buyCursor();
});
document.getElementById("buy-grandma").addEventListener("click", () => {
  game.buyGrandma();
});
document.getElementById("buy-bakery").addEventListener("click", () => {
  game.buyBakery();
});
document.getElementById("buy-time-machine").addEventListener("click", () => {
  game.buyTimeMachine();
});
document.getElementById("use-time-machine").addEventListener("click", () => {
  game.useTimeMachine();
});
document.getElementById("save-game").addEventListener("click", () => {
  game.saveGame();
});
document.getElementById("load-game").addEventListener("click", () => {
  game.loadGame();
});
document.getElementById("open-shop").addEventListener("click", () => {
  game.openShop();
});
document.getElementById("close-shop").addEventListener("click", () => {
  game.closeShop();
});
document.getElementById("reset-skin").addEventListener("click", () => {
  game.resetSkin();
});
document.getElementById("prestige-button").addEventListener("click", () => {
  game.prestige();
});
