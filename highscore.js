// Declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#return");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var allScores = localStorage.getItem("highscore");
allScores = JSON.parse(allScores);
if(!allScores){
    var li = document.createElement("li");
    li.textContent = "no high scores"
    highScore.appendChild(li)
}



    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
// Event listener to move to index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});
