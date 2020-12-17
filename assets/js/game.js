// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var fightOrSkip = function() {


  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Enter the conditional recursive function call here!
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player picks "skip" confirm and then stop the loop
  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      return true;
    }
    else {
      return false;
    }
  }
}

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  while(enemy.health > 0 && playerInfo.health > 0) {
    if (fightOrSkip()) {
      break;
    };

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack -3, playerInfo.attack);
    
    enemy.health = Math.max(0, enemy.health - damage);
    
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);

// if player is still alive and we're not at the last enemy in the array
      if (playerInfo.health > 0  && i < enemyInfo.length - 1) {
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        if (storeConfirm) {
          shop();
        }
      }
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }  
  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

var endGame = function() {
  if (playerInfo.health > 0) {
    window.alert("Great job, you survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }
  var playAgainConfirm = window.confirm("Would you like to play again?");
  if (playAgainConfirm) {
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  var shopOptionPrompt = window.prompt(
  "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;
    
    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack();
      break;
    
    case "LEAVE":
    case "leave":
      window.alert("Leaving the store.");
      break;

    default:
      window.alert("You did not pick a valdi option. Try again.");
      shop();
      break;
  }
};

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min +1) + min);
  return value;
};

var getPlayerName = function() {
  var name ="";

  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert ("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }
];

// start the game when the page loads
startGame();


