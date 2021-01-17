// HTML Elements
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// Question related global variables
var shuffledQuestions, currentQuestionIndex

// Handle on the timer element
var display = document.querySelector('#time')

// Score element
var score = document.querySelector('#score')
var points = 0

// Timer related variables
var seconds 
var oneMinute = 60 * 1
var currentTimer
var currentTimerString

// Animation related variables
var ml4 = {}
ml4.opacityIn = [0,1]
ml4.scaleIn = [0.2, 1]
ml4.scaleOut = 3
ml4.durationIn = 800
ml4.durationOut = 600
ml4.delay = 500

// Create a global variable called points
// Increase points value when they get a correct answer
// Update the HTML element with this new value

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

function startTimer() {
  currentTimer = oneMinute
  setInterval(function () {
      currentTimer--
      currentTimerString = currentTimer < 0 ? "0" + currenTimer : currentTimer;
      display.textContent =  currentTimerString;
      if (currentTimer < 0) {
          // TODO Reset Timer
          console.log(`TIME IS UP`)
      }
  }, 1000);
}


// Add event listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// Start the game
function startGame() {
  console.log(`Inside Start Game`)
  var readySetGo = document.querySelector('.ml4')
  readySetGo.classList.add('hide')
  startTimer();

  
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

// Handle logic for next question
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

// Show question text and options
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

// Resets the quiz
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Handle answer action
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

// check if answer is correct
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    console.log(`RIGHT ANSWER`)
    element.classList.add('correct')
    // Increase points value here
    // Don't forget to update the HTML element with this new value
    score.textContent = ++points;
  } else {
    console.log(`WRONG ANSWER`)
    element.classList.add('wrong')
    // Deduct 5 seconds from timer
    currentTimer = currentTimer - 12
  }
}

// Clear correct and wrong styling
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
  
}