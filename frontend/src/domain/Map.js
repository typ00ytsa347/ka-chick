export default class Map {
  id;
  name;
  objectives;

  // id determined after post to database.
  constructor(name, objectives) {
    this.name = name;
    this.objectives = objectives;
  }
}