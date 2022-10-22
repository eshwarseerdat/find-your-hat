const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const moveDirection = "wsad";

const randRangeNum = (maxNum) => Math.floor(Math.random() * maxNum);
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

    // create empty array filled with field characters
    const field = Array(fieldSpace).fill(fieldCharacter);

    const nestedField = [];
    while (nestedField.length !== height) {
      nestedField.push(field.splice(0, width));
    }

    const pathX = randRangeNum(width);
    const pathY = randRangeNum(height);
    console.log(`path`, pathY, pathX);
    nestedField[pathY][pathX] = pathCharacter;

    while (holesInField < holesPercent) {
      const randX = randRangeNum(width);
      const randY = randRangeNum(height);
      const pos = nestedField[randY][randX];
      if (pos !== pathCharacter && pos !== hat) {
        nestedField[randY][randX] = hole;
        holesInField++;
      }
    }

    while (true) {
      const hatX = randRangeNum(width);
      const hatY = randRangeNum(height);
      if (
        nestedField[hatY][hatX] !== pathCharacter &&
        nestedField[hatY][hatX] !== hole
      ) {
        console.log(`hat`, hatY, hatX);
        nestedField[hatY][hatX] = hat;
        break;
      }
    }

    return { nestedField, pathY, pathX };
  }
}

let { nestedField, pathY, pathX } = Field.generateField(4, 4, 25);
const myField = new Field(nestedField);

while (true) {
  myField.print();

  console.log("w - up, s - down, a - left, d - right");
  console.log("q- quit");

  let userMove = prompt("Which way? ");
  userMove = userMove.toLowerCase();

  if (userMove === "q") break;
  if (!moveDirection.includes(userMove)) continue;

  if (userMove === "w") {
    if (pathY - 1 < 0) {
      console.log("Out of bounds 🚶");
      break;
    } else if (myField.field[pathY - 1][pathX] === hole) {
      console.log("You fell down a hole 💀");
      break;
    } else if (myField.field[pathY - 1][pathX] === hat) {
      console.log("You found your hat! 👍🌟");
      break;
    }
    myField.field[pathY - 1][pathX] = pathCharacter;
    pathY--;
  }

  if (userMove === "s") {
    if (pathY + 1 >= myField.field.length) {
      console.log("Out of bounds 🚶");
      break;
    } else if (myField.field[pathY + 1][pathX] === hole) {
      console.log("You fell down a hole 💀");
      break;
    } else if (myField.field[pathY + 1][pathX] === hat) {
      console.log("You found your hat! 👍🌟");
      break;
    }
    myField.field[pathY + 1][pathX] = pathCharacter;
    pathY++;
  }

  if (userMove === "a") {
    if (pathX - 1 < 0) {
      console.log("Out of bounds 🚶");
      break;
    } else if (myField.field[pathY][pathX - 1] === hole) {
      console.log("You fell down a hole 💀");
      break;
    } else if (myField.field[pathY][pathX - 1] === hat) {
      console.log("You found your hat! 👍🌟");
      break;
    }
    myField.field[pathY][pathX - 1] = pathCharacter;
    pathX--;
  }

  if (userMove === "d") {
    if (pathX + 1 >= myField.field[0].length) {
      console.log("Out of bounds 🚶");
      break;
    } else if (myField.field[pathY][pathX + 1] === hole) {
      console.log("You fell down a hole 💀");
      break;
    } else if (myField.field[pathY][pathX + 1] === hat) {
      console.log("You found your hat! 👍🌟");
      break;
    }
    myField.field[pathY][pathX + 1] = pathCharacter;
    pathX++;
  }
}
