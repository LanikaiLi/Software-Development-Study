import { z } from "zod"

const inputText = process.argv.slice(2).join(" ") || "Jane, age 29, Toronto, likes cooking"
const model = "llama3.2"

const personSchema = z.object({
    name: z.string().min(1),
    age: z.number().int().min(0).max(150),
    city: z.string().min(1),
    hobbies: z.array(z.string().min(1)).max(5) // max(5) means the array can have at most 5 items, min(1) means each item in the array must be at least 1 character long, notice how the min(1) is inside the parentheses of the array, this is a way to apply the min(1) to each item in the array
})
//console.log("This is the input text: ", inputText)

const prompt = `Take the text below and extract a person profile. Return ONLY valid JSON with no additional text before or after, use this exact template:
{
 "name": <string>,
 "age": <integer>,
 "city": <string>,
 "hobbies": <list of strings>
}

Remember that age can be given in months or years, if it's given in months, you need to convert it to years by dividing by 12 and round the age to the nearest integer.

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

    try {const validatedPerson = personSchema.parse(parsed)
        console.log("This is the validated person: ", validatedPerson)
    } catch (error) {
        console.error("Error validating person: ", error)
    }

}

runQuery()