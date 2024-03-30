const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    // Fill this in
    const item = this.currentRoom.getItemByName(itemName);
    if (item) {
      this.items.push(item);
      this.currentRoom.removeItem(item);
      console.log(`${this.name} picked up ${item.name}.`);
    } else {
      console.log(`${itemName} is not available in this room.`);
    }

  }

  dropItem(itemName) {

    // Fill this in
    const itemIndex = this.items.findIndex(item => item.name === itemName);
    if (itemIndex !== -1) {
      const droppedItem = this.items.splice(itemIndex, 1)[0];
      this.currentRoom.items.push(droppedItem);
      console.log(`${this.name} dropped ${droppedItem.name}.`);
    } else {
      console.log(`${this.name} does not have ${itemName}.`);
    }

  }

  eatItem(itemName) {

    // Fill this in
    const food = this.getItemByName(itemName);
    if (food && food instanceof Food) {
      this.health += food.healing;
      console.log(`${this.name} ate ${food.name} and gained ${food.healing} health.`);
      const itemIndex = this.items.findIndex(item => item.name === itemName);
      this.items.splice(itemIndex, 1);
    } else if (food) {
      console.log(`${food.name} is not edible.`);
    } else {
      console.log(`${this.name} does not have ${itemName}.`);
    }

  }

  getItemByName(name) {

    // Fill this in
    return this.items.find(item => item.name === name);
  }

  hit(name) {

    // Fill this in
    const target = this.currentRoom.getCharacterByName(name);
    if (target && target !== this) {
      target.applyDamage(this.strength);
      console.log(`${this.name} hits ${target.name} for ${this.strength} damage.`);
    } else {
      console.log(`${name} is not a valid target.`);
    }

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
