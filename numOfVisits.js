const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

// this connects the Node.js code to the html file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/A3Q2.html'));
});
app.use(cookieParser());

app.get('/', (req, res) => {
    let visitCount = 1;
    let lastVisitMessage = '';

    if (req.cookies.visitCount) {
        visitCount = parseInt(req.cookies.visitCount) + 1;

        // Get the last visit date from the cookie
        const lastVisit = new Date(req.cookies.lastVisit);
        lastVisitMessage = `Last time you visited my webpage on: ${lastVisit.toString()}`;
    }

    // Set a new cookie with the updated visit count
    res.cookie('visitCount', visitCount, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    // Store the current date and time as last visit time in the cookie
    const currentVisit = new Date();
    res.cookie('lastVisit', currentVisit.toString(), { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    // Generate the response message based on the visit count
    let message;
    if (visitCount === 1) {
        message = "Welcome to my webpage! It is your first time that you are here.";
    } else {
        message = `Hello, this is the ${visitCount} time that you are visiting my webpage.<br>`;
        message += lastVisitMessage;
    }

    // Send the response
    res.send(message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
