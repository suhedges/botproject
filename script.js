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
        const apiKey = 'sk-proj-gDAF70B8w1sU8B9u7tOPT3BlbkFJfNxEtahXNUeTuzhH91Oa';
        const assistantId = 'asst_BvrFPSsSNhed6wOdnjwjH2GK';

        // Create a thread
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

        // Append user message to thread
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

        // Create a run
        const runResponse = await fetch(`https://api.openai.com/v1/assistants/runs`, {
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

        // Wait for the run to complete and get the response
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
            }
        }

        responseContainer.textContent = aiResponse;
    } catch (error) {
        responseContainer.textContent = `Error: ${error.message}`;
    } finally {
        document.getElementById('sendButton').disabled = false;
    }
});
