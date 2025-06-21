#  AI Chatbot 

A production-ready AI chatbot web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**, featuring secure authentication, real-time messaging, and OpenAI/Gemini API integration.

![Website](./public/samples/Screenshot.png)

## Architecture Diagram

![Architecture](./public/samples/architecture.png)
        
##  Live Demo
[https://ai.pimpalkar.com](#)  
**Demo Credentials**  
Email: `test@gmail.com`  
Password: `Abc@123456`

## Features

- **Authentication & Authorization**
  - Session-based authentication using NextAuth
  - Multiple providers: Google, GitHub, and email/password
  - Secure password hashing with bcrypt
  - Protected routes and API endpoints

- **Chat Interface**
  - Real-time message streaming
  - Markdown support for messages
  - Typing indicators
  - Auto-scroll functionality
  - Chat history persistence

- **AI Integration**
  - Gemini API integration (with OpenAI fallback)
  - Real-time response streaming
  - Context-aware conversations

- **Database**
  - PostgreSQL with Prisma ORM
  - Efficient data modeling for users, chats, and messages
  - Automatic migrations

## Tech Stack

### Frontend
- **Next.js 15** - React framework with server-side rendering
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Reusable UI components
- **Sonner** - Toast notifications

### Backend
- **Next.js API Routes** - Backend API endpoints
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **Zod** - Schema validation

### AI/ML
- **Google Gemini API** - Primary AI model
- **OpenAI API** - Fallback AI model

### DevOps
- **AWS** - Deployment platform

## Getting Started

### Prerequisites
- Bun 
- PostgreSQL database
- Google Cloud/OpenAI API keys

### Environment Variables
```env
# Auth
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# AI APIs
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-chat.git
cd ai-chat
```

2. Install dependencies
```bash
bun install
```

3. Set up the database
```bash
bunx prisma migrate dev
```

4. Start the development server
```bash
bun run dev
```
