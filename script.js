const chatInput = document.getElementById('chat-input');
const chatOutput = document.getElementById('chat-output');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
    const query = chatInput.value;
    const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    });
    const data = await response.json();
    chatOutput.innerHTML += `<p><strong>You:</strong> ${query}</p>`;
    chatOutput.innerHTML += `<p><strong>Bot:</strong> ${data.answer}</p>`;
    chatInput.value = '';
});
