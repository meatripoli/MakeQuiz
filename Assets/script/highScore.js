var highScoreList = document.getElementById("highScore-list");
var finalScore = document.getElementById("finalScore");
var submitButton = document.getElementById("highscore-button");
var intialsTxt = document.getElementById("initials-text"); 
var highScoreForm = document.getElementById("highscore-form"); 
var clearScoreButton = document.getElementById("clearscore-button");
var highScoresArr = JSON.parse(localStorage.getItem("highScores"));
finalScore.textContent = localStorage.getItem("currentScore")

if(finalScore.textContent == ""){
    document.getElementById("finalScorePreText").textContent = "Quiz not completed"
    intialsTxt.style.visibility = 'hidden';
    submitButton.style.visibility = 'hidden';
    document.getElementById("finalScoreReminder").style.visibility = 'hidden';
}
else{
    intialsTxt.style.visibility = '';
    submitButton.style.visibility = '';
}
if(highScoresArr !== null){
    console.log("show current high scores")
    console.log(highScoresArr)
    displayList(highScoresArr);
    var highScores = highScoresArr.sort((a, b) => (parseInt(a.score) < parseInt(b.score)) ? 1 : -1);
}
else{
    var highScores = [];
}

function displayList(list){
  highScoreList.innerHTML = "";
  for(var i = 0; i<list.length; i++){
      var newBullet = document.createElement("div");
      newBullet.textContent = list[i].initials+"-"+list[i].score;
      highScoreList.appendChild(newBullet);
      highScoreList.appendChild(document.createElement("hr"));
  }
}

function buttonClick(event){
    event.preventDefault();
    var finalScoreNum = finalScore.textContent;
    var initialsValue = intialsTxt.value;
    highScores.push({initials:initialsValue, score:finalScoreNum});
    intialsTxt.value = "";
    var sortedHighScore = highScores.sort((a, b) => (parseInt(a.score) < parseInt(b.score)) ? 1 : -1);
    displayList(sortedHighScore);
    localStorage.setItem("highScores", JSON.stringify(sortedHighScore))
    intialsTxt.disabled = true;
    intialsTxt.style.visibility = 'hidden';
    submitButton.style.visibility = 'hidden';
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