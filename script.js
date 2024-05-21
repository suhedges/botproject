document.getElementById('floatingIcon').addEventListener('click', function() {
    const widgetContainer = document.getElementById('widgetContainer');
    widgetContainer.style.display = widgetContainer.style.display === 'none' || widgetContainer.style.display === '' ? 'block' : 'none';
});

document.getElementById('sendButton').addEventListener('click', async function() {
    const userInput = document.getElementById('userInput').value;
    const responseContainer = document.getElementById('responseContainer');

    if (!userInput.trim()) {
        alert('Please enter a message.');
        return;
    }

    responseContainer.textContent = 'Loading...';
    document.getElementById('sendButton').disabled = true;

    try {
        const response = await fetch('https://api.openai.com/v1/assistants/asst_BvrFPSsSNhed6wOdnjwjH2GK/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer sk-proj-gDAF70B8w1sU8B9u7tOPT3BlbkFJfNxEtahXNUeTuzhH91Oa',
                'OpenAI-Beta': 'assistants=v2'
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: userInput }]
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const assistantResponse = data.choices[0].message.content;
        responseContainer.textContent = assistantResponse;
    } catch (error) {
        responseContainer.textContent = `Error: ${error.message}`;
    } finally {
        document.getElementById('sendButton').disabled = false;
    }
});
