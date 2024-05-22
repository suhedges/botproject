document.getElementById('floatingIcon').addEventListener('click', function() {
    const widgetContainer = document.getElementById('widgetContainer');
    widgetContainer.style.display = widgetContainer.style.display === 'none' || widgetContainer.style.display === '' ? 'flex' : 'none';
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('widgetContainer').style.display = 'none';
});

document.getElementById('sendButton').addEventListener('click', async function() {
    const userInput = document.getElementById('userInput').value;
    const responseContainer = document.getElementById('responseContainer');

    if (!userInput.trim()) {
        alert('Please enter a message.');
        return;
    }

    addMessage(userInput, 'user');
    document.getElementById('userInput').value = '';

    responseContainer.scrollTop = responseContainer.scrollHeight; // Scroll to the bottom

    try {
        const apiKey = 'YOUR_API_KEY';  // Replace with your actual OpenAI API key
        const assistantId = 'YOUR_ASSISTANT_ID';  // Replace with your actual Assistant ID

        // Create a new thread
        const threadResponse = await fetch('https://api.openai.com/v1/assistants/threads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'OpenAI-Beta': 'assistants=v1'
            },
            body: JSON.stringify({})
        });

        if (!threadResponse.ok) {
            throw new Error(`Error: ${threadResponse.status} ${threadResponse.statusText}`);
        }

        const threadData = await threadResponse.json();
        const threadId = threadData.id;

        // Append the user message to the thread
        const appendResponse = await fetch(`https://api.openai.com/v1/assistants/threads/${threadId}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'OpenAI-Beta': 'assistants=v1'
            },
            body: JSON.stringify({
                role: 'user',
                content: userInput
            })
        });

        if (!appendResponse.ok) {
            throw new Error(`Error: ${appendResponse.status} ${appendResponse.statusText}`);
        }

        // Create a run to get the assistant's response
        const runResponse = await fetch('https://api.openai.com/v1/assistants/runs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'OpenAI-Beta': 'assistants=v1'
            },
            body: JSON.stringify({
                assistant_id: assistantId,
                thread_id: threadId
            })
        });

        if (!runResponse.ok) {
            throw new Error(`Error: ${runResponse.status} ${runResponse.statusText}`);
        }

        const runData = await runResponse.json();
        const runId = runData.id;

        // Poll for the run completion and get the response
        let aiResponse = null;
        while (!aiResponse) {
            const statusResponse = await fetch(`https://api.openai.com/v1/assistants/runs/${runId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'OpenAI-Beta': 'assistants=v1'
                }
            });

            if (!statusResponse.ok) {
                throw new Error(`Error: ${statusResponse.status} ${statusResponse.statusText}`);
            }

            const statusData = await statusResponse.json();
            if (statusData.status === 'completed') {
                aiResponse = statusData.result.messages.find(msg => msg.role === 'assistant').content;
            } else {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
            }
        }

        addMessage(aiResponse, 'assistant');
    } catch (error) {
        addMessage(`Error: ${error.message}`, 'assistant');
    }
});

function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('response-item', sender);
    messageElement.textContent = text;
    document.getElementById('responseContainer').appendChild(messageElement);
    messageElement.scrollIntoView();
}
