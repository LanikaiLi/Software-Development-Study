const form = document.getElementById("chat-input-form")
const responseBox = document.getElementById("chatbot-response")
const promptBox = document.getElementById("prompt")

form.onsubmit = async (event) => {
    event.preventDefault()

    const prompt = promptBox.value
    promptBox.value = ""
    responseBox.innerText = "..."

    const response = await fetch(`http://localhost:11434/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: 'llama3.2',
            prompt: `${prompt}. Please keep responses between one and three sentences.`, // this is a technique called 'structured output' to get the response in a specific format.
            stream: false
        })
    })

    const data = await response.json()
    responseBox.innerText = data.response
}