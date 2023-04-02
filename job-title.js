const interviewForm = document.getElementById('interviewForm');

interviewForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const interviewType = document.getElementById('interviewType').value;
    localStorage.setItem('jobTitle', interviewType);
    window.location.href = 'quiz.html';
});
