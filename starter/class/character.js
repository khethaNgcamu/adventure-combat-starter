const { Player } = require('./player');

class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    if (new.target === Character) {
      throw new Error('Cannot instantiate abstract class Character.');
    }

    // if (this instanceof Player || this instanceof Enemy) {
    //   throw new Error('Character instances cannot be instances of Player or Enemy.');
    // }
    
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.health = 100;
    this.strength = 10;
    this.items = [];
}

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;

    if(this.health <= 0){
      this.die();
    }
  }

  die() {
    // Fill this in
    this.currentRoom.items.push(...this.items); // Drop all held items into the current room
    this.items = [ ]; // Clear the items held by the character
    this.currentRoom = null; // Character is no longer in any room
  }

}

module.exports = {
  Character,
};
