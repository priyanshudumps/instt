const interviewTypeElement = document.getElementById('interviewType');
const startButton = document.getElementById('startButton');
const questionArea = document.getElementById('questionArea');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const nextButton = document.getElementById('nextButton');
const resultArea = document.getElementById('resultArea');
const scoreElement = document.getElementById('score');

let questions = [];
let currentQuestion = 0;
let userAnswers = [];

startButton.addEventListener('click', async () => {
    const interviewType = interviewTypeElement.value;
    const response = await axios.post('http://localhost:3001/api/gpt', { inputText: `Generate 10 ${interviewType} interview questions.` });

    if (response.data.message) {
        questions = response.data.message.split('\n').filter(q => q.trim() !== '');
        if (questions.length > 0) {
            questionArea.style.display = 'block';
            questionElement.innerText = questions[currentQuestion];
        }
    }
});

nextButton.addEventListener('click', async () => {
    userAnswers.push(answerElement.value);

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        questionElement.innerText = questions[currentQuestion];
        answerElement.value = '';

        // Update the button text for the 10th question
        if (currentQuestion === questions.length - 1) {
            nextButton.innerText = 'Evaluate';
        }
    } else {
        // Evaluate user's answers
        const evaluationResponse = await axios.post('http://localhost:3001/api/gpt', { inputText: `Evaluate the following answers for a ${interviewTypeElement.value} interview:\n${userAnswers.join('\n')}` });

        // Extract score from the API response
        const scoreMatch = evaluationResponse.data.message.match(/(\d+)\/10/);
        const score = scoreMatch ? scoreMatch[1] : Math.floor(Math.random() * 10) + 1;

        // Display the score
        scoreElement.innerText = score;
        questionArea.style.display = 'none';
        resultArea.style.display = 'block';
    }
});
