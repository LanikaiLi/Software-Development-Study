const inputText = process.argv.slice(2).join(" ") || "Jane, age 29, Toronto, likes cooking"
const model = "llama3.2"
//console.log("This is the input text: ", inputText)

const prompt = `Take the text below and extract a person profile. Return ONLY valid JSON with no additional text before or after, use this exact template:
{
 "name": <string>,
 "age": <integer>,
 "city": <string>,
 "hobbies": <list of strings>
}

Text: ${inputText}
`
//console.log("This is the prompt: ", prompt)

const runQuery = async () => {
    const result = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            stream: false,
            format: "json"
        })
    })

    console.log("!!!!!!!!!!")
    console.log(result.ok) // check if we have successfully made the request to the model (the server)
    console.log("!!!!!!!!!!")

    if (!result.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }


    const data = await result.json()
   // console.log("This is the data: ", data)
    const parsed = JSON.parse(data.response)
    console.log("This is the parsed data: ", parsed)

}

runQuery()