class Quiz {
    constructor(questions) {
      this.questions = questions;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.timerInterval = null;
    //   this.timerSeconds = 30; // Set the default timer duration
    }
  
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }

    restartQuiz() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.resetTimer();
      this.answerSelected = false;
      this.showQuestion(); // Display the first question again
  
      const nextButton = document.getElementById("next-button");
      nextButton.style.display = "block"; // Show the Next button again
      const restartButton = document.getElementById("restart-button");
      // restartButton.style.display = "none"; // Hide the restart button
    }
  
    startQuiz() {
      this.showQuestion();
      document.getElementById("next-button").addEventListener("click", () => {
        this.nextQuestion();
      });
    }
  
    showQuestion() {
        
      this.resetTimer();
      this.answerSelected = false;
  
      const currentQuestion = this.getCurrentQuestion();
      const questionText = document.getElementById("question-text");
      const answerButtons = document.getElementById("answer-buttons");
  
      questionText.textContent = currentQuestion.question;
      answerButtons.innerHTML = "";
  
      currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => {
          this.selectAnswer(answer);
        });
        answerButtons.appendChild(button);
      });
  
      this.updateTimerDisplay();
      this.startTimer();
    }
  
    startTimer() {
        this.timerSeconds = 20; // Set the default timer duration
        this.updateTimerDisplay();
      
        this.timerInterval = setInterval(() => {
          this.timerSeconds--;
      
          if (this.timerSeconds === 0) {
            this.resetTimer(); // Clear the interval when the timer reaches 0
            this.selectAnswer(null); // Mark question as unanswered
            this.nextQuestion();
          }
      
          this.updateTimerDisplay();
        }, 1000);
      }
  
    updateTimerDisplay() {
      const timerDisplay = document.getElementById("timer-display");
      timerDisplay.textContent = `Time remaining: ${this.timerSeconds} seconds`;
    }
  
    resetTimer() {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  
    selectAnswer(answer) {
        if (!this.answerSelected) {
          this.answerSelected = true; // Set the flag to indicate an answer has been selected
      
          const resultsContainer = document.getElementById("results-container");
          const resultText = document.createElement("p");
      
          if (answer === null) {
            resultText.textContent = "Time's up! Question unanswered.";
          } else if (answer.correct) {
            resultText.textContent = "Correct!";
            this.score++;
          } else {
            resultText.textContent = "Wrong!";
          }
      
          resultsContainer.appendChild(resultText);
        }
      }
  
      nextQuestion() {
        this.currentQuestionIndex++;
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = "";
      
        const nextButton = document.getElementById("next-button");
      
        if (this.currentQuestionIndex < this.questions.length) {
          this.showQuestion();
        } else {
          this.showResults();
          nextButton.style.display = "none"; // Hide the Next button
        }
      }
  
    showResults() {
      const questionContainer = document.getElementById("question-container");
      questionContainer.innerHTML = "<h2>Quiz Completed!</h2>";
  
      const scoreText = document.createElement("p");
      scoreText.textContent = `Your Score: ${this.score} out of ${this.questions.length}`;
      questionContainer.appendChild(scoreText);

      const restartButton = document.getElementById("restart-button");
      restartButton.style.display = "block"; // Show the restart button
      restartButton.addEventListener("click", () => {
        window.location.reload(); // Reload the page
      });
    }
  }


  
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Venus", correct: false },
        { text: "Mercury", correct: false }
      ]
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
          { text: "Elephant", correct: false },
          { text: "Blue Whale", correct: true },
          { text: "Giraffe", correct: false },
          { text: "Lion", correct: false }
        ]
      },
      {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [
          { text: "William Shakespeare", correct: true },
          { text: "Jane Austen", correct: false },
          { text: "Mark Twain", correct: false },
          { text: "George Orwell", correct: false }
        ]
      },
      {
        question: "Which author is known for writing the novel 'Pride and Prejudice'?",
        answers: [
            { text: "William Shakespeare", correct: false },
            { text: "Jane Austen", correct: true },
            { text: "Charles Dickens", correct: false },
            { text: "Emily Bronte", correct: false }
        ]
      }
  ];
  
  const quiz = new Quiz(questions);
  quiz.startQuiz();

  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", () => {
    window.location.reload(); // Reload the page
  });





  