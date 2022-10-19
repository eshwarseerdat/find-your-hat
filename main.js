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
