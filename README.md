# FounderHQ.ai - AI-Powered Startup Pitch Deck Generator

![FounderHQ.ai Logo](https://img.shields.io/badge/FounderHQ.ai-AI%20Powered%20Startup%20Tools-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)

## 🚀 Overview

FounderHQ.ai is a comprehensive AI-powered platform designed to help startup founders create compelling pitch decks, track their progress, and get intelligent guidance throughout their startup journey. This project demonstrates full-stack development skills with modern technologies and AI integration.

### ✨ Key Features

- **🤖 AI-Powered Pitch Deck Generation**: Create professional pitch decks from problem/solution descriptions
- **📊 Real-time AI Analysis**: Get quality scores and actionable feedback on your presentations
- **💡 Smart Suggestions**: AI-powered content and design recommendations
- **📱 Professional Dashboard**: Track startup metrics, progress, and milestones
- **📄 Export Capabilities**: Export to PDF and PowerPoint formats
- **🎨 Visual Design Tools**: Charts, tables, and professional layouts

## 🏗️ Architecture

This is a **full-stack monorepo** with the following components:

```
FounderHubAI/
├── apps/
│   ├── backend/          # FastAPI backend with AI integration
│   ├── frontend/         # Next.js React frontend
│   └── services/
│       └── user/         # Java Spring Boot user service
├── infra/                # Docker Compose orchestration
└── README.md
```

### Tech Stack

**Backend:**
- **FastAPI** - Modern Python web framework
- **OpenAI GPT** - AI content generation and analysis
- **ReportLab** - PDF generation
- **python-pptx** - PowerPoint export
- **SQLite** - Data persistence

**Frontend:**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **React Hooks** - State management

**Infrastructure:**
- **Python venv** - Backend dependency management
- **npm** - Frontend package management
- **Manual deployment** - Local development setup

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 18+**
- **Git**
- **OpenAI API Key** (required for AI features)

### OpenAI API Key Setup

The AI features require an OpenAI API key. Here's how to get one:

1. **Get an API Key:**
   - Go to [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign up or log in to your OpenAI account
   - Click "Create new secret key"
   - Copy the generated key

2. **Set Up the API Key:**
   ```bash
   # Create environment file
   cd apps/backend
   cp .env.example .env  # if .env.example exists
   
   # Add your OpenAI API key to .env file
   echo "OPENAI_API_KEY=your-api-key-here" > .env
   ```

   **Or manually create `.env` file:**
   ```bash
   # In apps/backend/.env
   OPENAI_API_KEY=your-actual-api-key-here
   ```

   **Using the example file (recommended):**
   ```bash
   cd apps/backend
   cp .env.example .env
   # Then edit .env and replace 'your-api-key-here' with your actual key
   ```

3. **API Key Security:**
   - Never commit your API key to version control
   - The `.env` file is already in `.gitignore`
   - Keep your API key secure and don't share it publicly

**Note:** The AI features (content generation, analysis, suggestions) will not work without a valid OpenAI API key. The application will show appropriate error messages if the key is missing or invalid.

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/FounderHubAI.git
cd FounderHubAI
```

#### 2. Backend Setup
```bash
cd apps/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### 3. Frontend Setup
```bash
cd apps/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

#### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🎯 How to Use

### 1. Create Your First Pitch Deck

1. **Navigate to Pitch Deck Builder**: Click "Pitch Deck Builder" in the sidebar
2. **Enter Problem & Solution**: Describe your startup's problem and solution
3. **Generate with AI**: Click "AI Generate" to create a complete pitch deck
4. **Review & Edit**: Use the slide editor to customize content and design
5. **Get AI Feedback**: Click "Show AI Feedback" for quality analysis
6. **Export**: Download as PDF or PowerPoint

### 2. Explore the Dashboard

- **Metrics Overview**: Track key startup KPIs
- **Progress Tracking**: Monitor different startup activities
- **AI Recommendations**: Get intelligent suggestions for improvement
- **Team Activity**: View recent activities and milestones

### 3. Test AI Features

- **Content Suggestions**: Click AI suggestion buttons to improve slides
- **Design Recommendations**: Get visual improvement suggestions
- **Quality Analysis**: Request detailed feedback on your pitch deck
- **Export Functionality**: Test PDF and PowerPoint export

## 🔧 API Endpoints

The backend provides the following key endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/generate-slides` | POST | Generate complete pitch deck from problem/solution |
| `/analyze-pitch-deck` | POST | Get AI analysis and quality scores |
| `/generate-suggestion` | POST | Get AI-powered content/design suggestions |
| `/export-pdf` | POST | Export pitch deck as PDF |
| `/export-ppt` | POST | Export pitch deck as PowerPoint |

### Example API Usage

```bash
# Generate slides
curl -X POST "http://localhost:8000/generate-slides" \
  -H "Content-Type: application/json" \
  -d '{
    "problem": "Small businesses struggle to manage inventory efficiently",
    "solution": "AI-powered inventory management platform"
  }'

# Analyze pitch deck
curl -X POST "http://localhost:8000/analyze-pitch-deck" \
  -H "Content-Type: application/json" \
  -d '{
    "slides": [{"title": "The Problem", "content": "..."}],
    "getFeedback": true
  }'
```

## 🧪 Testing the Application

### Demo Credentials
- **No login required** - The application works with demo data
- **Session persistence** - Your work is saved in browser session storage
- **Real AI processing** - All AI features are fully functional

### Test Scenarios

1. **Basic Pitch Deck Creation**
   - Problem: "Restaurants waste 30% of food due to poor inventory management"
   - Solution: "Smart inventory tracking system with AI predictions"

2. **AI Analysis Testing**
   - Generate a pitch deck
   - Click "Show AI Feedback" to see quality analysis
   - Review scores and improvement suggestions

3. **Export Functionality**
   - Create a pitch deck
   - Test both PDF and PowerPoint export
   - Verify professional formatting

## 🏗️ Project Structure

```
apps/
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── requirements.txt     # Python dependencies
│   └── user_data.json      # Demo data storage
├── frontend/
│   ├── app/                 # Next.js app directory
│   │   ├── dashboard/       # Dashboard page
│   │   ├── home/           # Landing page
│   │   ├── pitch-deck/     # Pitch deck builder
│   │   └── components/     # Reusable components
│   ├── types/              # TypeScript type definitions
│   └── package.json        # Node.js dependencies
└── services/
    └── user/               # Java user service (future)
```

## 🚀 Deployment

### Local Development
```bash
# Backend
cd apps/backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Frontend
cd apps/frontend
npm run dev
```

### Production Deployment
```bash
# Using Docker Compose
cd infra
docker-compose up -d

# Or deploy to cloud platforms
# - Vercel (Frontend)
# - Railway (Backend)
# - AWS/GCP/Azure
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

This project was created to demonstrate:
- **Full-stack development** skills with modern technologies
- **AI integration** and machine learning applications
- **Professional UI/UX** design and user experience
- **Scalable architecture** and best practices
- **Real-world problem solving** for startup founders

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Portfolio**: [Your Portfolio URL]
- **LinkedIn**: [Your LinkedIn]
- **Email**: [your.email@example.com]

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- FastAPI for the excellent web framework
- Next.js team for the React framework
- The startup community for inspiration

---

**⭐ Star this repository if you found it helpful!** 