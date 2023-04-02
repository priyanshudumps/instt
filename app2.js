document.getElementById('submitButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    if (inputText) {
        try {
            // Make a POST request to the '/api/gpt' endpoint with the input text
            const response = await axios.post('http://localhost:3001/api/gpt', { inputText });

            if (response.data.message) {
                document.getElementById('output').innerHTML = `Output: ${response.data.message}`;
            } else {
                document.getElementById('output').innerHTML = 'No output received from the API.';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('output').innerHTML = 'An error occurred while fetching data from the API.';
        }
    } else {
        document.getElementById('output').innerHTML = 'Please enter some text before submitting.';
    }
});
