**📄 Document Editor Web Application**

A full-stack document editor application built with React + TypeScript + Vite on the frontend and Node.js + PostgreSQL on the backend.
This app provides a secure, responsive, and feature-rich environment for managing and editing documents with ease.

**🚀 Features**

🔐 Login-based document handling – Secure user authentication and access control.

📝 Text editing – Powered by TipTap

⚡ Info & warning callbacks – Get instant feedback and alerts while working with documents.

📱 Mobile responsive – Optimized UI/UX across devices for a smooth editing experience.

**🛠️ Tech Stack**

**Frontend**

React (with Vite for fast builds)

TypeScript

Tailwind CSS

TipTap editor

**Backend**

Node.js / Express.js
PostgreSQL

**⚙️ Setup & Installation**

**1️⃣ Clone the repository**
git clone https://github.com/your-username/document-editor.git
cd document-editor

**2️⃣ Backend Setup**
cd backend
npm install


**Configure your PostgreSQL connection in backend/db.ts:**

This runs on local postgres hence you can add your local postgres user name and password for logging in


**Run the backend:**

npm run dev
runs on **http://localhost:3000**

**3️⃣ Frontend Setup**
cd frontend
npm install
npm run dev


**App will start at:**
👉 http://localhost:4200

**📂 Project Structure**

document-editor/
│── backend/       # Node.js + Express backend
│── frontend/      # React + Vite frontend
│── database/      # PostgreSQL schema & migration scripts
│── README.md      # Project documentation

**🔑 Authentication Flow**

Users log in using their credentials.
Only authenticated users can create & save documents.
Whilst without logging in you can explore the document editing options but cannot save.
