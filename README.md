# AI Chat Agent 🤖

A professional, ChatGPT-like AI assistant built with a modern full-stack architecture. This application leverages the power of HuggingFace's Large Language Models (LLMs) to provide real-time, intelligent chat interactions with persistent conversation memory.

---

## 🚀 Features

- **Real-time AI Chat**: Seamless interaction with state-of-the-art AI models.
- **HuggingFace Integration**: Powered by the HuggingFace Inference Router for high availability and low latency.
- **Conversation Memory**: The assistant remembers previous messages in the current session for contextually aware responses.
- **Chat History Sidebar**: Dynamically updated sidebar showing your conversation history.
- **Clear History Functional**: Easily reset your conversation and start fresh.
- **Responsive UI**: A beautiful, dark-themed glassmorphic interface that works on all devices.
- **Optimistic UI Updates**: Messages appear instantly for a smooth user experience.

---

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Axios, Lucide-React (Icons)
- **Backend**: FastAPI (Python), Uvicorn, HTTPX
- **AI Model**: HuggingFace Inference API (`Qwen/Qwen2.5-72B-Instruct`)
- **Others**: CORS Middleware, Dotenv for environment management

---

## 📂 Folder Structure

```text
Ai_Agent/
├── backend/                # FastAPI Backend
│   ├── app/
│   │   ├── main.py        # Entry point & CORS config
│   │   ├── models.py      # Pydantic schemas
│   │   ├── routes/        # API endpoints (Chat, History, Clear)
│   │   └── services/      # AI Service logic
│   └── .env               # API Tokens
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/    # UI Components (ChatWindow, MessageBubble, Sidebar)
│   │   ├── services/      # API communication layer (api.js)
│   │   └── App.jsx        # Main application logic
│   └── vite.config.js     # Proxy configuration
└── README.md              # Project documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- HuggingFace API Token (Free)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the `backend/` folder:
   ```env
   HUGGINGFACEHUB_API_TOKEN=your_hf_token_here
   ```
4. Start the server:
   ```bash
   python -m app.main
   ```
   *The backend will run on `http://localhost:8000`*

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`*

---

## 🔌 API Endpoints

### Health Check
`GET /api/health`
- **Response**: `{"status": "ok"}`

### Send Chat Message
`POST /api/chat`
- **Request Body**:
  ```json
  { "message": "Hello, how are you?" }
  ```
- **Response**:
  ```json
  { "response": "Hello! I am an AI assistant..." }
  ```

### Get History
`GET /api/history`
- **Response**:
  ```json
  {
    "history": [
      { "role": "user", "content": "Hello" },
      { "role": "assistant", "content": "Hi there!" }
    ]
  }
  ```

### Clear History
`POST /api/clear`
- **Response**: `{"message": "Chat history cleared successfully"}`

---

## 🖼 Screenshots

*(Add UI screenshot here)*
> [!NOTE]
> The interface features a sleek dark mode with emerald accents and a persistent sidebar for navigation.

---

## 🐞 Known Issues & Fixes

- **Model Compatibility**: Fixed the `model_not_supported` (400) error by migrating from traditional endpoints to the HuggingFace Inference Router and selecting the verified `Qwen/Qwen2.5-72B-Instruct` model.
- **CORS Errors**: Resolved cross-origin issues by implementing `CORSMiddleware` in FastAPI to allow requests from the Vite development server.
- **State De-sync**: Fixed a bug where history would overwrite active chat states by implementing defensive check logic in `App.jsx`.

---

## 🚀 Future Improvements

- [ ] **Authentication**: Add JWT-based user login and registration.
- [ ] **RAG Integration**: Add a Vector Database (Pinecone/ChromaDB) for chatting with local documents.
- [ ] **Streaming Responses**: Implement Server-Sent Events (SSE) for real-time word-by-word streaming.
- [ ] **Cloud Deployment**: Deploy the backend to AWS/Render and the frontend to Vercel.

---

## 👤 Author

- **Name**: Taiyyab Makandar
- **Role**: Full Stack Developer
- **GitHub**: [Your Profile Link Here]

---
*Created for the Google Deepmind Advanced Agentic Coding Challenge.*
