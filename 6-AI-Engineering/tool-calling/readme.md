# wiki-tool-call-demo

A tool calling demo that makes a minimal AI agent capable of making queries to the wikipedia API.

## Prerequisites

- Node.js 18 or newer
- [Ollama](https://ollama.com/) running locally on `http://localhost:11434`
- The `llama3.2` model installed in Ollama

To install the model if needed:

```bash
ollama pull llama3.2
```

To start Ollama:

```bash
ollama serve
```

From this project directory, run:

```bash
node app.js "What do you know about Scotland?"
```

You can use this as a template for building agents capable of making calls to other APIs and external tools.