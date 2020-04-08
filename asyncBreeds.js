const fs = require('fs');
let arr = [];
let obj = {};
// 2.1 this is our breedDetailsFromFile function, where we passed in the breed Bombay, and the instructions to do when our function has the data: printDataCallback 
const breedDetailsFromFile = function(breed, whenDone) {
  
  // 2.2 the first thing breedDetailsFromFile does is call fs.readFile to go get the data from the file system. the params are (`path string`, encoding or flag options, )
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {

    // readFile has a built in behaviour that accepts error and data parameters.
    if (!error) {
      // as long as you CALL THE DATA IN THE if !error .readFile callback
      // and as long as you DON'T *RETURN* THE DATA within that callback
      console.log('\nYOU CAN CONSOLE.LOG THE DATA: ', data, '\n');
      whenDone(data); // ✅✅✅
      // but you CAN'T PUSH THE DATA TO AN ARRAY.
      arr.push(data);
      obj = data;
    };
  });
};

const printDataCallback = data => {
  console.log('OR PASS THE DATA TO YOUR OWN CALLBACK ✅✅✅: ', data, '\n')
};

// 1  we call our breedDetailsFromFile function, we ask for Bombay brreds, and we tell it to print out that breed, using our printDataCallbacks function
breedDetailsFromFile('Bombay', printDataCallback);

console.log('\nyou CAN\'T PUSH DATA TO AN ARRAY: ', arr);
console.log('and you CAN\'T ASSIGN IT TO AN OBJECT: ', obj);

/* EXAMPLE OF HOW readFile DOESN'T WORK!!

const breedDetailsFromFile = function(breed) {
  console.log('breedDetailsFromFile: Calling readFile...');

  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    console.log("In readFile's Callback: it has the data.");
    // ISSUE: Returning from *inner* callback function, not breedDetailsFromFile.
    if (!error) return data;
  });

  // ISSUE: Attempting to return data out here will also not work.
  //        Currently not returning anything from here, so breedDetailsFromFile function returns undefined.
};

// we try to get the return value
const bombay = breedDetailsFromFile('Bombay');
console.log('Return Value: ', bombay); // => will NOT print out details, instead we will see undefined!
 */