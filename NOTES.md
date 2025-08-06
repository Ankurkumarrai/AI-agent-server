# NOTES.md

## 🔍 AI-Generated vs Manual Work

- Folder structure, basic prompt engineering guidance was AI-assisted
- Core logic, plugin integration, memory system written by me

## 🐛 Bugs Faced & Fixes

- **Thunder Client 404 error**: Due to incorrect endpoint or server not running. Fixed by verifying route and server status.
- **OpenAI API quota exceeded**: Generated new key and updated `.env`
- **GitHub push failed due to secrets**: Removed `.env` from commits using `.gitignore` and `git rm --cached`

## ⚙️ Agent Internals

- **Plugin Routing**:  
  Parsed intent from message. If it matches keywords like `weather` or `math`, routed to `weatherPlugin` or `mathEvaluator` respectively.

- **Memory Storage**:  
  Session-wise memory stored in an in-memory object using `session_id`.

- **RAG (Retrieval-Augmented Generation)**:  
  - Used markdowns in `/data`
  - Embedded using `OpenAI Embeddings`
  - Similarity search with custom cosine similarity logic

- **Prompt Construction**:  
  Prompt includes system instructions + memory + top 3 context chunks + plugin output (if triggered)
