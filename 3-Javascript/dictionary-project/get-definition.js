const getDefinitionAndThen = (word, callback) => {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => response.json())
    .then(json => callback(json))
}