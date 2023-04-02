const crimes = [
    'Aggravated Assault',
    'Insurance Fraud',
    'Aiding and Abetting / Accessory',
    'Kidnapping',
    'Arson',
    'Manslaughter: Involuntary',
    'Assault / Battery',
    'Manslaughter: Voluntary',
    'Attempt',
    'Medical Marijuana',
    'Bribery',
    'MIP: A Minor in Possession',
    'Burglary',
    'Money Laundering',
    'Child Abandonment',
    'Murder: First-degree',
    'Child Abuse',
    'Murder: Second-degree',
    'Child Pornography',
    'Open Container (of alcohol)',
    'Computer Crime',
    'Perjury',
    'Conspiracy',
    'Probation Violation',
    'Credit / Debit Card Fraud',
    'Prostitution',
    'Criminal Contempt of Court',
    'Public Intoxication',
    'Cyberbullying',
    'Pyramid Schemes',
    'Disorderly Conduct',
    'Racketeering / RICO',
    'Disturbing the Peace',
    'Rape',
    'Domestic Violence',
    'Robbery',
    'Drug Manufacturing and Cultivation',
    'Securities Fraud',
    'Drug Possession',
    'Sexual Assault',
    'Drug Trafficking / Distribution',
    'Shoplifting',
    'DUI / DWI',
    'Solicitation',
    'Embezzlement',
    'Stalking',
    'Extortion',
    'Statutory Rape',
    'Forgery',
    'Tax Evasion / Fraud',
    'Fraud',
    'Telemarketing Fraud',
    'Harassment',
    'Theft',
    'Hate Crimes',
    'Vandalism',
    'Homicide',
    'White Collar Crimes',
    'Identity Theft',
    'Wire Fraud',
    'Indecent Exposure'
];

document.getElementById('submitButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    if (inputText) {
        try {
            // Make a POST request to the '/api/gpt' endpoint with the input text
            const response = await axios.post('http://localhost:3001/api/gpt', { inputText: `Is it a crime if someone ${inputText}?` });

            if (response.data.message) {
                const message = response.data.message.trim().toLowerCase();
                let output = '';

                if (message.includes('not a crime') || message.includes('not illegal')) {
                    output = 'It is not a crime.';
                } else if (message.includes('crime') || message.includes('illegal')) {
                    output = 'It is a crime.';

                    // Randomly select a crime from the list
                    const randomCrime = crimes[Math.floor(Math.random() * crimes.length)];
                    output += ` Type of crime: ${randomCrime}`;
                } else {
                    output = 'Unable to determine if it is a crime.';
                }

                document.getElementById('output').innerHTML = output;
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
