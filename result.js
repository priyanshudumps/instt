const waitingMessage = document.getElementById('waitingMessage');
const resultArea = document.getElementById('resultArea');
const scoreElement = document.getElementById('score');
const startOverButton = document.getElementById('startOver');

(async () => {
    const userAnswers = JSON.parse(localStorage.getItem('userAnswers'));
    const interviewType = localStorage.getItem('jobTitle');

    // Evaluate user's answers
    const evaluationResponse = await axios.post('http://localhost:3001/api/gpt', { inputText: `Evaluate the following answers for a ${interviewType} interview and provide a short and concise review of the user's performance, within 15 words:\n${userAnswers.join('\n')}` });

    console.log('API response:', evaluationResponse.data.message);

    // Extract the review from the API response
    const review = evaluationResponse.data.message;

    // Hide the waiting message and display the result
    waitingMessage.style.display = 'none';
    resultArea.style.display = 'block';
    scoreElement.innerText = review;
})();

startOverButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});
