export function generateId() {
  var minNum = 100000;
  var maxNum = 999999;
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}