
const questionArea = document.getElementById('questionArea');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const nextButton = document.getElementById('nextButton');

const waitingMessage = document.getElementById('waitingMessage');
questionArea.style.display = 'none';

let questions = [];
let currentQuestion = 0;
let userAnswers = [];

(async () => {
    const interviewType = localStorage.getItem('jobTitle');
    const response = await axios.post('http://localhost:3001/api/gpt', { inputText: `Generate 10 ${interviewType} interview questions.` });

    if (response.data.message) {
        questions = response.data.message.split('\n').filter(q => q.trim() !== '');
        if (questions.length > 0) {
            waitingMessage.style.display = 'none';
            questionArea.style.display = 'block';
            questionElement.innerText = questions[currentQuestion];
        }
    }
})();

nextButton.addEventListener('click', async () => {
    userAnswers.push(answerElement.value);

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        questionElement.innerText = questions[currentQuestion];
        answerElement.value = '';

        // Change the button text to "Evaluate" for the last question
        if (currentQuestion === questions.length - 1) {
            nextButton.innerText = 'Evaluate';
        }
    } else {
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
        window.location.href = 'result.html';
    }
});
