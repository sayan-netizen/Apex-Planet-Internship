const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "Which country has won the most FIFA World Cups?",
    answers: [
      { text: "Germany", correct: false },
      { text: "Italy", correct: false },
      { text: "Brazil", correct: true },
      { text: "Argentina", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add("hidden");
  scoreElement.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answersElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
  }
}

function selectAnswer(selectedButton, isCorrect) {
  Array.from(answersElement.children).forEach(button => {
    button.disabled = true; // Disable all buttons after selection
    if (button.innerText === selectedButton.innerText) {
      button.classList.add(isCorrect ? "correct" : "wrong");
    }
  });

  if (isCorrect) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    nextButton.classList.remove("hidden");
    nextButton.addEventListener("click", showQuestion);
  } else {
    showScore();
  }
}

function showScore() {
  questionElement.innerText = "Quiz Completed!";
  scoreElement.innerText = `Your Score: ${score}/${questions.length}`;
  scoreElement.classList.remove("hidden");
  nextButton.innerText = "Restart";
  nextButton.classList.remove("hidden");
  nextButton.addEventListener("click", startQuiz);
}

startQuiz();
