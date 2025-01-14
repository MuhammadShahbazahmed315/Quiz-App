const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Dickens", "Austen", "Twain"],
        answer: "Shakespeare"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const loaderPercentage = document.getElementById('loader-percentage');
const circle = document.querySelector('.progress-circle circle');
const quizContainer = document.querySelector('.quiz-container');
const loaderContainer = document.getElementById('loader-container');

function showLoader() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        const offset = 283 - (283 * progress) / 100; // Adjust stroke-dashoffset
        circle.style.strokeDashoffset = offset;
        loaderPercentage.textContent = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            document.body.classList.add('loaded');
            quizContainer.style.display = 'block'; // Show the quiz
        }
    }, 50); // Simulates loading progress
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');

    // Calculate percentage score
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Hide quiz elements
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';

    // Show result
    resultElement.style.display = 'block';
    resultElement.innerHTML = `
        <p>Your score is: <strong>${score}/${totalQuestions}</strong></p>
        <p>Percentage: <strong>${percentage}%</strong></p>
    `;
}


// Start loader
showLoader();

// Once loader completes, load the first question
setTimeout(() => loadQuestion(), 2000); // Adjust delay to match loader duration
