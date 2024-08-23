const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));

// this connects the Node.js code to the html file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/A3Q1.html'));
});


// A) Function: findSummation
app.get('/findSummation', (req, res) => {
    const inputNumber = parseInt(req.query.number) || 1;

    if (isNaN(inputNumber) || inputNumber <= 0) {
        res.send(false);
    } else {
        const summation = (inputNumber * (inputNumber + 1)) / 2;
        res.send(summation.toString());
    }
});

// B) Function: uppercaseFirstandLast
app.get('/uppercaseFirstandLast', (req, res) => {
    const inputString = req.query.toString() || '';
    const modifiedString = inputString
        .split(' ')
        .map(word => {
            if (word.length >= 2) {
                const firstChar = word[0].toUpperCase();
                const lastChar = word[word.length - 1].toUpperCase();
                return firstChar + word.slice(1, -1) + lastChar;
            }
            return word;
        })
        .join(' ');

    res.send(modifiedString);
});

// C) Function: findAverageAndMedian
app.post('/findAverageAndMedian', (req, res) => {
    const numbers = req.body.numbers || [];

    if (!Array.isArray(numbers) || numbers.length === 0) {
        res.send(false);
    } else {
        const numberArray = numbers.map(Number);
        const sum = numberArray.reduce((acc, num) => acc + num, 0);
        const average = sum / numberArray.length;

        numberArray.sort((a, b) => a - b);
        const median = numberArray.length % 2 === 0
            ? (numberArray[numberArray.length / 2 - 1] + numberArray[numberArray.length / 2]) / 2
            : numberArray[Math.floor(numberArray.length / 2)];

        res.send({ average, median });
    }
});

// D) Function: find4Digits
app.get('/find4Digits', (req, res) => {
    const inputString = req.query.numbers || '';
    const numbers = inputString.split(' ').filter(str => str.length === 4 && /^\d+$/.test(str));

    if (numbers.length > 0) {
        res.send(numbers[0]);
    } else {
        res.send(false);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server listening on port 3000");
});
