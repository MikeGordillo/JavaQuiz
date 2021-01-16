var seconds 
function startTimer(duration, display) {
  var timer = duration, seconds;
  setInterval(function () {
      // minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      // minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent =  seconds;

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}
// var timerDiv = document.getElementById('time');

// var timerX = 60;
// var mainTimer = setInterval(function () {
//   timerX--
//        timerDiv.textContent = timerX;
//       if (timerX=== 0){
//         stopCount()
//       }
//       // if (--timer < 0) {
//       //     timer = duration;
//       // }
//   // }, 1000);
// }, 1000)
// function stopCount(){
//   clearInterval(mainTimer)
// }


// var timeLeft = 0;


// window.onload = function () {
    // var oneMinutes = 60 * 1,
        // display = document.querySelector('#time');
    // startTimer(oneMinutes, display);
// };

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

var ml4 = {};
ml4.opacityIn = [0,1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.durationOut = 600;
ml4.delay = 500;

anime.timeline({loop: true})
  .add({
    targets: '.ml4 .letters-1',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-1',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4 .letters-2',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-2',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4 .letters-3',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-3',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4',
    opacity: 0,
    duration: 500,
    delay: 500
  });


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

var display = document.querySelector('#time');

var oneMinutes = 60 * 1;

function startGame() {

  var readySetGo=document.querySelector('.ml4')
  readySetGo.classList.add('hide')
  startTimer(oneMinutes, display);

  
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// var currentQuestion = {}; 
// currentQuestion = selectedButton.dataset
function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  // if (!correct){
    // if (correct === currentQuestion. ){

  // }
  setStatusClass(document.body, correct)
  // Array.from(answerButtonsElement.children).forEach(button => {
  //   //setStatusClass(button, button.dataset.correct)
  // })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    console.log(`RIGHT ANSWER`)
    element.classList.add('correct')
  } else {
    console.log(`WRONG ANSWER`)
    element.classList.add('wrong')
    // Deduct 5 seconds from timer
     seconds = parseInt(seconds) - 5
    // TODO Check if timer is less than 0 

    // If not less than zero then format seconds
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Display seconds on the timer
    //display.textContent =  seconds;

  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  
}

const questions = [
    {
      question: 'JavaScript variables are containers for storing data values.',
      answers: [
        { text: 'TRUE', correct: true },
        { text: 'FALSE', correct: false }
      ]
    },
    {
      question: 'A JavaScript function is executed when "something" invokes it (____ __).',
      answers: [
        { text: 'calls it', correct: true },
        { text: 'returns', correct: false },
        { text: 'alerts', correct: false },
        { text: 'functions', correct: false }
      ]
    },
    {
      question: 'An array is a special variable, which can hold more than one value at a time.',
      answers: [
        { text: 'FALSE', correct: false },
        { text: 'TRUE', correct: true },
      ]
    },
    {
      question: 'if, else and else if, are examples of?',
      answers: [
        { text: 'functions', correct: false },
        { text: 'conditional statements', correct: true }
      ]
    },
        
]
  

