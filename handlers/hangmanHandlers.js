const { words } = require("../data/words");

let testing = (req, res) => {
  let testWord = words.find((word) => {
    return word.id == req.params.id;
  }).word;
  return res.status(200).json(testWord);
};

let wordToFind = (req, res) => {
  let theWordObject = words[Math.floor(Math.random() * words.length)];
  let theWordId = theWordObject.id;
  let theWordLength = theWordObject.letterCount;
  return res.status(200).json({ theWordId, theWordLength });
};

let returnStatus = (req, res) => {
  let answerArray = [];
  let id = req.params.id;
  let guessedLetter = req.params.letter;
  let theWordObject = words.find((word) => {
    return word.id == id;
  });
  let dividedLetterFromWord = theWordObject.word.split("");

  dividedLetterFromWord.forEach((letter) => {
    if (letter === guessedLetter) {
      answerArray.push(true);
    } else {
      answerArray.push(false);
    }
    return answerArray;
  });
  res.status(200).json(answerArray);
};

module.exports = { testing, wordToFind, returnStatus };
