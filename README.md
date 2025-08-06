# 🤖 AI Agent Backend with RAG, Memory & Plugins

A TypeScript-based intelligent backend server powered by OpenAI. It supports:

- 🧠 Per-session memory  
- 📚 Retrieval-Augmented Generation (RAG) from markdown files  
- 🔌 Plugin system (Weather + Math)

---

## 📂 Folder Structure

```
FINAL-ai-agent-server/
│
├── data/                  # Markdown or text files used for RAG
│   └── *.md
│
├── node_modules/          # Node dependencies
│
├── src/
│   ├── plugins/
│   │   ├── index.ts             # Central export for plugins
│   │   ├── mathEvaluator.ts     # Math plugin
│   │   └── weatherPlugin.ts     # Weather plugin (mock or real)
│   │
│   ├── utils/
│   │   ├── embedding.ts         # Embedding using OpenAI
│   │   ├── memory.ts            # In-memory session store
│   │   ├── rag.ts               # RAG orchestrator
│   │   └── similarity.ts        # Cosine similarity logic
│   │
│   └── server.ts           # Main Express server
│
├── .env                   # API keys (not pushed to GitHub)
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Tech Stack

- **Language:** TypeScript (Node.js)
- **Framework:** Express
- **LLM:** OpenAI GPT‑3.5 or GPT‑4
- **Memory:** In-memory session cache
- **Vector Search:** Cosine similarity using raw math
- **Plugins:**
  - Math evaluator
  - Weather lookup (mock or API)
- **RAG Files:** Text/Markdown files stored in `/data`

---

## 🚀 Local Setup Instructions

### 1. 📦 Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-agent-server.git
cd ai-agent-server
```

### 2. 📥 Install dependencies

```bash
npm install
```

### 3. 🔐 Configure Environment Variables

Create a `.env` file in the root:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

> ⚠️ Get your API key from https://platform.openai.com/account/api-keys

### 4. 📁 Add Markdown Files

Put at least 5 `.md` or `.txt` files inside the `data/` directory.

### 5. ▶️ Start the server

```bash
npx ts-node src/server.ts
```

If successful, you’ll see:

```
✨ Server running on port 3000
```

---

## 🧪 Test the API

### 🔗 Endpoint: `POST /agent/message`

Use Thunder Client, Postman, or cURL:

#### ✅ Example Request:

```json
POST http://localhost:3000/agent/message
Content-Type: application/json

{
  "session_id": "abc123",
  "message": "What is the weather in Bangalore?"
}
```

#### ✅ Example Response:

```json
{
  "reply": "The weather in Bangalore is 29°C and mostly sunny. (Session: abc123)"
}
```

---

## ✨ Features Demonstrated

| Feature                      | Implemented |
|-----------------------------|-------------|
| LLM Response via OpenAI     | ✅          |
| Session-based memory        | ✅          |
| Retrieval Augmented Generation | ✅       |
| Custom plugin system        | ✅          |
| Math + Weather Plugins      | ✅          |
| System Prompting            | ✅          |

---

## ✅ To-Do / Improvements

- Replace in-memory store with Redis or DB
- Add logging and error monitoring
- Expand plugin architecture with decorators

---

## 🧾 License

MIT License – Use it however you want 🚀