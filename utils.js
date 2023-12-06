const { quotes } = require('./data');
let { strLastId } = require('./data.js');

const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const findquoteIndex = (id) => {
  const targetObject = {id: id};
  const index = quotes.findIndex(i => i.id === targetObject.id);
  return index
}

const genId = () => {
  const intLastId = parseInt(strLastId);
  const intNewId = intLastId + 1;
  const strNewId = intNewId.toString();
  strLastId = strNewId;
  return strNewId;
}


module.exports = {
  getRandomElement, 
  findquoteIndex,
  genId
};