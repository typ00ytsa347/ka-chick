export default class Objective {
  id;
  hint;
  letter;
    image;
    found;

    constructor(id, image, letter, hint = "No hint given.", found=false) {
    this.id = id;
    this.image = image
    this.letter = letter
      this.hint = hint;
      this.found = found;
  }
}