const model = "llama3.2"
const inputText = process.argv.slice(2).join(' ')

const prompt = `
Please take the following text, and produce the title of a wikipedia article related to the text. For example if the text says "What do you know about Jamaica?" the article title for the response should just be "Jamaica"

Text: ${inputText}

The response should be a JSON object with this exact format:
{
    articleTitle: <string>
}

Do not include any text before or after the JSON object.
`

const askWikipedia = async (searchText) => {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${searchText}`)

    if (!response.ok) throw new Error ("Request failed.")

    const data = await response.json()
    return data.extract
}

const runQuery = async () => {
    const response = await fetch('http://localhost:11434/api/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            stream: false,
            format: "json"
        })
    })

    if (!response.ok) throw new Error ("Request failed.")

    const data = await response.json()
    const parsed = JSON.parse(data.response)
    
    const wikiResponse = await askWikipedia(parsed.articleTitle) // this is a tool calling, we are asking the AI to call the askWikipedia function to get the wiki response

    console.log(wikiResponse)
}

runQuery()