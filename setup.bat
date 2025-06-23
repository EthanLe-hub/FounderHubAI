@echo off
setlocal enabledelayedexpansion

echo 🚀 Setting up FounderHQ.ai - AI-Powered Startup Pitch Deck Generator
echo ================================================================

echo Checking prerequisites...

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [SUCCESS] All prerequisites are installed!

REM Setup OpenAI API key
echo [INFO] Setting up OpenAI API key...
cd apps\backend

REM Check if .env file exists
if not exist ".env" (
    echo [WARNING] OpenAI API key not found!
    echo.
    echo To use AI features, you need an OpenAI API key:
    echo 1. Go to https://platform.openai.com/api-keys
    echo 2. Create a new API key
    echo 3. Copy .env.example to .env and update it:
    echo    copy .env.example .env
    echo    # Then edit .env with your actual API key
    echo.
    echo Without an API key, AI features will not work.
    echo.
    
    REM Copy .env.example if it exists, otherwise create basic .env
    if exist ".env.example" (
        copy .env.example .env >nul
        echo [INFO] Copied .env.example to .env. Please update it with your actual API key.
    ) else (
        echo OPENAI_API_KEY=your-api-key-here > .env
        echo [INFO] Created .env template file. Please update it with your actual API key.
    )
) else (
    REM Check if API key is set
    findstr /C:"OPENAI_API_KEY=your-api-key-here" .env >nul 2>&1
    if not errorlevel 1 (
        echo [WARNING] OpenAI API key not properly configured in .env file!
        echo Please update apps\backend\.env with your actual OpenAI API key.
    ) else (
        echo [SUCCESS] OpenAI API key found!
    )
)

cd ..\..

:: Setup backend
echo [INFO] Setting up backend...
cd apps\backend

:: Create virtual environment
if not exist "venv" (
    echo [INFO] Creating Python virtual environment...
    python -m venv venv
)

:: Activate virtual environment and install dependencies
echo [INFO] Installing Python dependencies...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt

echo [SUCCESS] Backend setup complete!
cd ..\..

:: Setup frontend
echo [INFO] Setting up frontend...
cd apps\frontend

:: Install dependencies
echo [INFO] Installing Node.js dependencies...
npm install

echo [SUCCESS] Frontend setup complete!
cd ..\..

:: Create start scripts
echo [INFO] Creating start scripts...

:: Backend start script
echo @echo off > start-backend.bat
echo cd apps\backend >> start-backend.bat
echo call venv\Scripts\activate.bat >> start-backend.bat
echo python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000 >> start-backend.bat

:: Frontend start script
echo @echo off > start-frontend.bat
echo cd apps\frontend >> start-frontend.bat
echo npm run dev >> start-frontend.bat

echo [SUCCESS] Start scripts created!

echo.
echo 🎉 Setup complete! Here's how to run the application:
echo.
echo 1. Start the backend server:
echo    start-backend.bat
echo.
echo 2. In a new command prompt, start the frontend:
echo    start-frontend.bat
echo.
echo 3. Open your browser and go to:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8000
echo    API Docs: http://localhost:8000/docs
echo.
echo 📚 For more information, see the README.md file
echo.
echo [SUCCESS] FounderHQ.ai is ready to use!
pause 