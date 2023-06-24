export default class Player {
  username;
  score;

  constructor(username, score=0) {
    this.username = username;
    this.score = score;
  }
}