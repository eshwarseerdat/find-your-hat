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
}

const myField = new Field([
  [pathCharacter, fieldCharacter, hole],
  [fieldCharacter, hole, fieldCharacter],
  [fieldCharacter, hat, fieldCharacter],
]);

let isPlaying = true;

while (isPlaying) {
  myField.print();

  console.log("w - up, s - down, a - left, d - right");
  console.log("q- quit");

  let userMove = prompt("Which way? ");
  userMove = userMove.toLowerCase();

  if (userMove === "q") break;
  if (!moveDirection.includes(userMove)) continue;

  for (let i = myField.field.length - 1; i >= 0; i--) {
    const pathCharIndex = myField.field[i].lastIndexOf(pathCharacter);
    if (pathCharIndex === -1) continue;

    if (userMove === "w") {
      if (i - 1 < 0) {
        console.log("Out of bounds 🚶");
        isPlaying = !isPlaying;
        break;
      }
      if (myField.field[i - 1][pathCharIndex] === hole) {
        console.log("You fell down a hole 💀");
        isPlaying = !isPlaying;
        break;
      }
      if (myField.field[i - 1][pathCharIndex] === hat) {
        console.log("You found your hat! 👍🌟");
        isPlaying = !isPlaying;
        break;
      }

      myField.field[i - 1][pathCharIndex] = pathCharacter;
      break;
    }

    if (userMove === "s") {
      if (i + 1 >= myField.field.length) {
        console.log("Out of bounds 🚶");
        isPlaying = !isPlaying;
        break;
      }
      if (myField.field[i + 1][pathCharIndex] === hole) {
        console.log("You fell down a hole 💀");
        isPlaying = !isPlaying;
        break;
      }
      if (myField.field[i + 1][pathCharIndex] === hat) {
        console.log("You found your hat! 👍🌟");
        isPlaying = !isPlaying;
        break;
      }

      myField.field[i + 1][pathCharIndex] = pathCharacter;
      break;
    }

    if (userMove === "a") {
      if (pathCharIndex - 1 < 0) {
        console.log("Out of bounds 🚶");
        isPlaying = !isPlaying;
        break;
      }
      if (myField.field[i][pathCharIndex - 1] === hole) {
        console.log("You fell down a hole 💀");
        isPlaying = !isPlaying;
        break;
      }
      if (myField.field[i][pathCharIndex - 1] === hat) {
        console.log("You found your hat! 👍🌟");
        isPlaying = !isPlaying;
        break;
      }

      myField.field[i][pathCharIndex - 1] = pathCharacter;
      break;
    }

    if (userMove === "d") {
      if (pathCharIndex + 1 >= myField.field[i].length) {
        console.log("Out of bounds 🚶");
        isPlaying = !isPlaying;
        break;
      }
      if (myField.field[i][pathCharIndex + 1] === hole) {
        console.log("You fell down a hole 💀");
        isPlaying = !isPlaying;
        break;
      }
      if (myField.field[i][pathCharIndex + 1] === hat) {
        console.log("You found your hat! 👍🌟");
        isPlaying = !isPlaying;
        break;
      }

      myField.field[i][pathCharIndex + 1] = pathCharacter;
      break;
    }
  }
}
