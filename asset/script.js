// The quiz questions,choices,and answers.     
var questions = [{
    title: "Q 1 - Which of the following is true about variable naming conventions in JavaScript?",
    choices: ["A - You should not use any of the JavaScript reserved keyword as variable name.", "B - JavaScript variable names should not start with a numeral (0-9).", "C - Both of the above.", "D - None of the above."],
    answer: "C - Both of the above."
},
{
    title: "Q 2 - Which of the following is the correct syntax to redirect a url using JavaScript?",
    choices: ["A - document.location='http://www.newlocation.com';", "B - browser.location='http://www.newlocation.com';", "C - navigator.location='http://www.newlocation.com';", "D - window.location='http://www.newlocation.com';"],
    answer: "D - window.location='http://www.newlocation.com';"
},
{
    title: "Q 3 - Which built-in method returns the length of the string?",
    choices: ["A - length()", "B - size()", "C - index()", "None of the above."],
    answer: "A - length()"
},
{
    title: "Q 4 - Which built-in method returns the calling string value converted to lower case?",
    choices: ["A - toLowerCase()", "B - toLower()", "C - changeCase(case)", "D - None of the above."],
    answer: "A - toLowerCase()"
},
{
    title: "Q 6 - Which of the following function of String object splits a String object into an array of strings by separating the string into substrings?",
    choices: ["A - slice()", "B - split()", " C - replace()", "D - search()"],
    answer: "B - split()"
}
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 60;
document.getElementById("timeRemaining").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeRemaining").innerHTML = timeLeft;
    //proceed to end the game function when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end the game 
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>

`;

document.getElementById("quizBody").innerHTML = quizContent;
}

// Event listener to capture initials and local storage for initials and score
// createSubmit.addEventListener("click", function () {
//     var initials = createInput.value;

//     if (initials === null) {

//         console.log("No value entered!");

//     } else {
//         var finalScore = {
//             initials: initials,
//             score: timeRemaining
//         }
//         console.log(finalScore);
//         var allScores = localStorage.getItem("allScores");
//         if (allScores === null) {
//             allScores = [];
//         } else {
//             allScores = JSON.parse(allScores);
//         }
//         allScores.push(finalScore);
//         var newScore = JSON.stringify(allScores);
//         localStorage.setItem("allScores", newScore);
//         // Travels to final page
//         window.location.replace("highscore.html");
//     }
// });

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeRemaining").innerHTML = timeLeft;

var quizContent = `
<h1>
    Code Quiz!
</h1>
<h3>
    Click to Begin!   
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}