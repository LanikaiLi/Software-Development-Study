const inputBox = document.getElementById("input-box")
const submitButton = document.getElementById("submit-button")
const definitionBox = document.getElementById("definition-box")

submitButton.addEventListener("click", () => {
    getDefinitionAndThen(inputBox.value, (definition) => {
        const firstDefinition = definition[0].meanings[0].definitions[0].definition
        console.log(firstDefinition)
        definitionBox.innerText = firstDefinition
    })
})