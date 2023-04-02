import {config} from "dotenv"
config()

import { Configuration,OpenAIApi } from "openai"

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))








document.getElementById('submitButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    if (inputText) {
        try {
            openai.createChatCompletion({
                model:"gpt-3.5-turbo",
                messages: [{role:"user",content:inputText}]
            })

            .then(res => {
                console.log(res.data.choices[0].message.content)});
            const response = await axios.get('https://api.example.com/data', {
                params: {
                    input: inputText
                }
            });

            if (response.data) {
                document.getElementById('output').innerHTML = `Output: ${response.data}`;
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