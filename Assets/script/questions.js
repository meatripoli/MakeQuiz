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
///etc.
];
var titleTxt = document.getElementById("title");
var choiceButtons = document.querySelectorAll("input");
var choiceTxt = document.querySelectorAll("label");
var questionArea = document.getElementById("question");
var questionNum = 0;

function switchQuestions(questionsObjectArr,i){
    if(i<questionsObjectArr.length){
        console.log("inside switchQuestions");
        titleTxt.textContent = questionsObjectArr[i].title;
        createChoices(questionsObjectArr[i].choices);
    }
    else{
        console.log("the End");
        //document.getElementById("donebanner").textContent = "All done!!!!"
        document.location.href = "highScore.html";
        localStorage.setItem("currentScore", 22);
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

switchQuestions(questions,questionNum);

questionArea.addEventListener("click",function(event){
    console.log("click");
    var answerPicked = pickAnswer(choiceButtons,choiceTxt);
    console.log(answerPicked);
    console.log(questions[questionNum].answer);
   if(answerPicked === questions[questionNum].answer){
        console.log("correct");
        document.getElementById("correctans").textContent = "Correct!!!!";
        questionNum++;
        ///delay of 1 sec before switching to new question
        setTimeout(switchQuestions(questions,questionNum),1000);
    }
    else{
        console.log("wrong");
        document.getElementById("correctans").textContent = "Wrong!!!!";
        questionNum++;
        ///delay of 1 sec before switching to new question
        setTimeout(switchQuestions(questions,questionNum),1000);
    }
})


  