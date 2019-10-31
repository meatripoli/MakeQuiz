var highScoreList = document.getElementById("highScore-list");
var finalScore = document.getElementById("finalScore");
var submitButton = document.getElementById("highscore-button");
var intialsTxt = document.getElementById("initials-text"); 
var highScoreForm = document.getElementById("highscore-form"); 
var clearScoreButton = document.getElementById("clearscore-button");
var highScores = [];
var highScoresArr = JSON.parse(localStorage.getItem("highScores"));
finalScore.textContent = localStorage.getItem("currentScore")
if(highScoresArr !== null){
    console.log("show current high scores")
    appendList(highScoresArr);
}

///this creates the Highscores Table
function appendList(list){
  highScoreList.innerHTML = "";
  for(var i = 0; i<list.length; i++){
      var newBullet = document.createElement("div");
      newBullet.textContent = list[i];
      highScoreList.appendChild(newBullet);
      highScoreList.appendChild(document.createElement("hr"));
  }
}

function buttonClick(event){
    event.preventDefault();
    var finalScoreNum = finalScore.textContent;
    var initialsValue = intialsTxt.value;
    highScores.push(initialsValue+ " - "+finalScoreNum);
    intialsTxt.value = "";
    appendList(highScores);
    localStorage.setItem("highScores", JSON.stringify(highScores))
    // if I want to view it I would do this JSON.parse(localStorage.getItem("highScores"))
}



submitButton.addEventListener("click",buttonClick);
highScoreForm.addEventListener("submit",buttonClick);

clearScoreButton.addEventListener("click",function(event){
    event.preventDefault();
    highScores=[];
    highScoreList.innerHTML="";
    localStorage.removeItem("highScores");
});