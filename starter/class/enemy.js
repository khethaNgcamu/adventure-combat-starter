const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom);
    this.cooldown = 3000; // Default cooldown time
    this.player = null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    const directions = Object.keys(this.currentRoom.exits);
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const nextRoom = this.currentRoom.getRoomInDirection(randomDirection);
    if (nextRoom) {
      this.currentRoom = nextRoom;
    }
  }

  takeSandwich() {
    // Fill this in
    const sandwichIndex = this.currentRoom.items.findIndex(item => item.name === 'sandwich');
    if (sandwichIndex !== -1) {
      const sandwich = this.currentRoom.items.splice(sandwichIndex, 1)[0];
      this.items.push(sandwich);
      console.log(`${this.name} takes the sandwich.`);
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    if (this.player && this.player.currentRoom === this.currentRoom) {
      this.player.applyDamage(this.strength);
      console.log(`${this.name} attacks ${this.player.name} for ${this.strength} damage.`);
    }
  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
