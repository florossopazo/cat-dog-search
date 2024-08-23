// Event listener for summation calculation
document.getElementById('summationForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const number = document.getElementById('summationNumber').value;

    try {
        const response = await fetch(`/findSummation?number=${number}`);
        const result = await response.text();
        document.getElementById('summationResult').textContent = result !== "false"
            ? `Summation is: ${result}`
            : 'Invalid input. Please enter a positive number.';
    } catch (error) {
        console.error('Error:', error);
    }
});

// Event listener for uppercase first and last letters
document.getElementById('uppercaseForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const inputString = document.getElementById('inputString').value;

    try {
        const response = await fetch(`/uppercaseFirstandLast?toString=${encodeURIComponent(inputString)}`);
        const result = await response.text();
        document.getElementById('uppercaseResult').textContent = result;
    } catch (error) {
        console.error('Error:', error);
    }
});

// Event listener for average and median calculation
document.getElementById('averageMedianForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const numbers = document.getElementById('numberArray').value.split(',').map(Number);

    try {
        const response = await fetch('/findAverageAndMedian', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ numbers })
        });

        const result = await response.json();
        if (result) {
            document.getElementById('averageResult').textContent = `Average: ${result.average}`;
            document.getElementById('medianResult').textContent = `Median: ${result.median}`;
        } else {
            document.getElementById('averageResult').textContent = 'Invalid input. Please enter an array of numbers.';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Event listener for finding 4-digit numbers
document.getElementById('find4DigitsForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const numbersString = document.getElementById('numbersString').value;

    try {
        const response = await fetch(`/find4Digits?numbers=${encodeURIComponent(numbersString)}`);
        const result = await response.text();
        document.getElementById('find4DigitsResult').textContent = result !== "false"
            ? `First 4-digit number is: ${result}`
            : 'No 4-digit numbers found.';
    } catch (error) {
        console.error('Error:', error);
    }
});
