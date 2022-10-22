const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const moveDirection = "wsad";

class Field {
  constructor(field) {
    this._field = field;
  }

  get field() {
    return this._field;
  }

  set field(newField) {
    this._field = newField;
  }

  print() {
    const fieldString = this._field.reduce((str, current) => {
      str += current.join("") + "\n";
      return str;
    }, "");

    console.log(fieldString);
  }

  static generateField(height = 4, width = 4, percentage = 20) {
    // calculate total space
    const fieldSpace = height * width;

    // calculate percentage of space that should be holes
    const holesPercent = Math.floor((fieldSpace * percentage) / 100);

    // create counter for holes in field
    let holesInField = 0;
    const holesPos = [];

    // create empty array filled with field characters
    const field = Array(fieldSpace).fill(fieldCharacter);

    // randomly add holes in field array
    while (holesInField < holesPercent) {
      const pos = Math.floor(Math.random() * fieldSpace);
      if (holesPos.includes(pos) || pos === 0) continue;
      field[pos] = hole;
      holesPos.push(pos);
      holesInField++;
    }

    // randomly add hat
    while (true) {
      const pos = Math.floor(Math.random() * fieldSpace);
      if (holesPos.includes(pos) || pos === 0) continue;
      field[pos] = hat;
      break;
    }

    // add starting character to first position
    field[0] = pathCharacter;

    const nestedField = [];

    while (nestedField.length !== height) {
      const arr = [];
      for (let i = 0; i < width; i++) {
        arr.push(field.shift());
      }
      nestedField.push(arr);
    }

    return nestedField;
  }
}

const myField = new Field(Field.generateField(6, 4, 25));

let isPlaying = true;
let posX = 0;
let posY = 0;

while (isPlaying) {
  myField.print();

  console.log("w - up, s - down, a - left, d - right");
  console.log("q- quit");

  let userMove = prompt("Which way? ");
  userMove = userMove.toLowerCase();

  if (userMove === "q") break;
  if (!moveDirection.includes(userMove)) continue;

  if (userMove === "w") {
    if (posY - 1 < 0) {
      console.log("Out of bounds 🚶");
      break;
    } else if (myField.field[posY - 1][posX] === hole) {
      console.log("You fell down a hole 💀");
      break;
    } else if (myField.field[posY - 1][posX] === hat) {
      console.log("You found your hat! 👍🌟");
      break;
    }
    myField.field[posY - 1][posX] = pathCharacter;
    posY--;
  }

  if (userMove === "s") {
    if (posY + 1 >= myField.field.length) {
      console.log("Out of bounds 🚶");
      break;
    } else if (myField.field[posY + 1][posX] === hole) {
      console.log("You fell down a hole 💀");
      break;
    } else if (myField.field[posY + 1][posX] === hat) {
      console.log("You found your hat! 👍🌟");
      break;
    }
    myField.field[posY + 1][posX] = pathCharacter;
    posY++;
  }

  if (userMove === "a") {
    if (posX - 1 < 0) {
      console.log("Out of bounds 🚶");
      break;
    } else if (myField.field[posY][posX - 1] === hole) {
      console.log("You fell down a hole 💀");
      break;
    } else if (myField.field[posY][posX - 1] === hat) {
      console.log("You found your hat! 👍🌟");
      break;
    }
    myField.field[posY][posX - 1] = pathCharacter;
    posX--;
  }

  if (userMove === "d") {
    if (posX + 1 >= myField.field[0].length) {
      console.log("Out of bounds 🚶");
      break;
    } else if (myField.field[posY][posX + 1] === hole) {
      console.log("You fell down a hole 💀");
      break;
    } else if (myField.field[posY][posX + 1] === hat) {
      console.log("You found your hat! 👍🌟");
      break;
    }
    myField.field[posY][posX + 1] = pathCharacter;
    posX++;
  }
}
