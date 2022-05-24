function Quiz(questions){
    this.questions=questions;
    this.score=0;
    this.questionIndex=0;
}
function Question(text,options,answer){
    this.text=text;
    this.options=options;
    this.answer=answer;
}
let questions=[
    new Question("Javascript supports",["Functions","XHTML","HTML","CSS"],"Functions"),
    new Question("CSS stands for",["Cascading style sheet","Cascading style script","color style sheet","class style script"],"Cascading style sheet"),
    new Question("Inside which HTML element do we put the JavaScript",["<js>","<javascript>","<script>","<scripting>"],"<script>"),
    new Question("What is the correct syntax for referring to an external script called 'xxx.js'",["<script name='xxx.js'>","<script href='xxx.js'>","<script src='xxx.js'>","<script='xxx.js'>"],"<script src='xxx.js'>"), 
    new Question("How do you write 'Hello World' in an alert box?",["alert('Hello World')","msg('Hello World')","msgBox('Hello World')","alertox('Hello World')"],"alert('Hello World')")
]; 
let quiz= new Quiz(questions);

Quiz.prototype.getQuestionByIndex=function(){
    return this.questions[this.questionIndex];
}
Quiz.prototype.checkUserAttempt=function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}
Question.prototype.isCorrectAnswer=function(choice){
    return choice===this.answer
} 
Quiz.prototype.isEnded=function(){
    return this.questionIndex===this.questions.length;
}
function loadQuestions(){
    if(quiz.isEnded()){
        showScores();
    }else{
        let elem=document.getElementById("question" );
        elem.innerHTML=quiz.getQuestionByIndex().text;
        let options=quiz.getQuestionByIndex().options;
        for(let i=0;i<options.length;i++){
            let eachOption=document.getElementById("choice"+i);
            eachOption.innerText=options[i]; 
            handleOptionBtn("btn"+i,options[i]);               
            }
            showProgress();
        }
 }
 function showScores(){
     let endResult="<h1>Result</h1>";
     endResult+="<h2 id='score'>Your scores:"+quiz.score+" . and percentage is:"+(quiz.score/questions.length*100)+"% </h2>";
    let elem=document.getElementById("quiz");
    elem.innerHTML=endResult;
    }
 function handleOptionBtn(id,currentOption){
     let btn=document.getElementById(id);
     btn.onclick=function(){
         quiz.checkUserAttempt(currentOption);
         loadQuestions();
     }
 }
 function showProgress(){
     let currentQuestionNumber=quiz.questionIndex+1;
     let  elem=document.getElementById("progress");
     elem.innerHTML="Question "+ currentQuestionNumber +" of "+ quiz.questions.length;
 }
loadQuestions();
