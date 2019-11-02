var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<js>", "<scripting>", "<javascript>", "<script>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["the <body> section", "the <head> section", "the <footer> section", "both the <head> and <body> sections"],
        answer: "the <body> section"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["msgBox('Hello World')", "alert('Hello World')", "msg('Hello World')", "alertBox('Hello World')"],
        answer: "alert('Hello World')"
    }
];
var titleTxt = document.getElementById("title");
var choiceButtons = document.querySelectorAll("input");
var choiceTxt = document.querySelectorAll("label");
var questionArea = document.getElementById("question");
var startButton = document.getElementById("startButton");
var questionNumber = document.getElementById("questionNumber");

var questionNum;
var score;
var running = false;

var quizTimeTxt = document.getElementById("quizTimer");
var quizTotalSec = 15 * questions.length;
var quizSecElapsed = 0;
var interval;

localStorage.removeItem("currentScore");

function checkButton(element){
    element.checked = true;
}

function switchQuestions(questionsObjectArr,i){
    if(i<questionsObjectArr.length){
        console.log("inside switchQuestions");
        questionNumber.textContent = " "+(i+1);
        titleTxt.textContent = questionsObjectArr[i].title;
        createChoices(questionsObjectArr[i].choices);
    }
    else{
        console.log("the End");
        localStorage.setItem("currentScore", score+(quizTotalSec - quizSecElapsed));
        document.location.href = "highScore.html";
    }
}

function createChoices (choicesArr){
    console.log("inside createChoices");
    for(var j = 0; j<choicesArr.length; j++){
        choiceTxt[j].textContent = choicesArr[j];
    }
}

function pickAnswer(choicebuttonsArr,choicesTxtArr){
    for(var k = 0; k<choicebuttonsArr.length; k++){
        if(choicebuttonsArr[k].checked){
            choicebuttonsArr[k].checked = false;
            return choicesTxtArr[k].textContent;
        }
    }
}

function padTimer0(num){
    if(num<10){
        return "0" + num;
    }
    else{
        return num;
    }
}

function displayTime(seconds){
    var min = padTimer0(Math.floor(seconds/60));
    var sec = padTimer0(seconds % 60);
    quizTimeTxt.textContent =  "Time remaining: "+min+":"+sec
}

function startTimer(){
    console.log("timer started");
    if(running){
        return;
    }
    running = true;
    interval = setInterval(function(){
        console.log(quizTotalSec - quizSecElapsed)
        if (quizTotalSec - quizSecElapsed === 0){
            console.log("stop timer")
            stopTimer();
            document.location.href = "highScore.html";
        }
        else{
            quizSecElapsed++;
            console.log(displayTime(quizTotalSec - quizSecElapsed))
            displayTime(quizTotalSec - quizSecElapsed);
        }
    }, 1000);  
}

function stopTimer(){
    clearInterval(interval);
    running = false;
    secondsElapsed = 0;
    console.log(displayTime(quizTotalSec))
    displayTime(quizTotalSec)
}

startButton.addEventListener("click",function(event){    
    startTimer();
    document.getElementById("firstContainer").style.display = "none";
    document.getElementById("secondContainer").style.display = "";
    document.getElementById("linkenabled").removeAttribute("href");
    questionNum = 0;
    score = 0;
    console.log("start quiz button pressed");
    console.log(displayTime(quizTotalSec));
    console.log(questions);
    console.log(questionNum);
    ///function that starts the time goes here
    //quizTimeTxt.textContent = displayTime(quizTotalSec);
    switchQuestions(questions,questionNum);
})


questionArea.addEventListener("click",function(event){
    console.log("click");
    var answerPicked = pickAnswer(choiceButtons,choiceTxt);
    console.log(answerPicked);
    console.log(questions[questionNum].answer);
/*
if answer is correct 1 point is assigned to total score
to calculate the total score we will add the points and add the seconds left
ex: 2pt+15sec new score: 17
if answer is wrong no points will be given and 10 sec will be removed from timer

*/
   if(answerPicked === questions[questionNum].answer){
        console.log("correct");
        score += 5;
        document.getElementById("correctans").textContent = "Correct!";
        document.getElementById("correctans").prepend(document.createElement("hr"));
        questionNum++;
        ///delay of 1 sec before switching to new question
        setTimeout(switchQuestions(questions,questionNum),1000);
    }
    else{
        console.log("wrong");
        if(quizTotalSec - quizSecElapsed<=10){
            quizSecElapsed += quizTotalSec - quizSecElapsed
        }
        else{
            quizSecElapsed +=10;
        }
        
        document.getElementById("correctans").textContent = "Incorrect!";
        document.getElementById("correctans").prepend(document.createElement("hr"));
        questionNum++;
        ///delay of 1 sec before switching to new question
        setTimeout(switchQuestions(questions,questionNum),1000);
    }
})

////////////////////////////Timer Section///////////
