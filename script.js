var startButton = document.getElementById('start-btn')
var nextbutton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame(){
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

function showQuestion(question){
    questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
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

function selectAnswer(e){
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct)
    })
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
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
}


function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

  var questions = [
    {
      question: 'What is the capital of Iceland?',
      answers: [
        { text: 'Reykjavík', correct: true },
        { text: 'Belgium', correct: false }
      ]
    },
    {
      question: 'What is the largest country in the world?',
      answers: [
        { text: 'Russia', correct: true },
        { text: 'Africa', correct: false },
        { text: 'India', correct: false },
        { text: 'Australia', correct: false }
      ]
    },
    {
      question: 'How many valves does the heart have?',
      answers: [
        { text: 'Eight', correct: false },
        { text: 'Four', correct: true },
        { text: 'Two', correct: false },
        { text: 'Five', correct: false }
      ]
    },
    {
      question: 'What is the Papaver rhoeas flower better known as?',
      answers: [
        { text: 'A tulip!', correct: false },
        { text: 'A poppy!', correct: true }
      ]
    }
  ]