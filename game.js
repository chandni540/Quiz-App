const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//all available questions dataset
let questions = [
    {
        question: "Inside which HTML element do we put Js?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "The correct syntax for referring to an external script called 'xxx.js' is:",
        choice1: "<script href = 'xxx.js'>",
        choice2: "<script name = 'xxx.js'>",
        choice3: "<script src = 'xxx.js'>",
        choice4: "<script file = 'xxx.js'>",
        answer: 3
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        choice1: "msgbox('Hello World');",
        choice2: "alertbox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
]

const correct_bonus = 10;
const max_questions = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    //When the questions end in a dataset 
    if(availableQuestions.length === 0 || questionCounter>=max_questions){
        return window.location.assign("./end.html");
    }

    questionCounter++;

    //updating the question number on the screen
    questionCounterText.innerText = `${questionCounter}/${max_questions}`;

    // to print a new question on the screen
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    // to update the choices according to the updated question
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice"+number];
    });
    
    //To remove the question that has already appeared on screen
    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;
};

//To perform action when a choice is being clicked
choices.forEach(choice => {
    choice.addEventListener("click",e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //Displaying feedback for correct or wrong answer
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply ==="correct"){
            incrementScore(correct_bonus);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
