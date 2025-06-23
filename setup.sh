#!/bin/bash

# FounderHQ.ai Setup Script
# This script automates the setup process for the FounderHQ.ai project

set -e  # Exit on any error

echo "🚀 Setting up FounderHQ.ai - AI-Powered Startup Pitch Deck Generator"
echo "================================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.8+ first."
        exit 1
    fi
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_success "All prerequisites are installed!"
}

# Setup OpenAI API key
setup_openai_key() {
    print_status "Setting up OpenAI API key..."
    
    cd apps/backend
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        print_warning "OpenAI API key not found!"
        echo ""
        echo "To use AI features, you need an OpenAI API key:"
        echo "1. Go to https://platform.openai.com/api-keys"
        echo "2. Create a new API key"
        echo "3. Copy .env.example to .env and update it:"
        echo "   cp .env.example .env"
        echo "   # Then edit .env with your actual API key"
        echo ""
        echo "Without an API key, AI features will not work."
        echo ""
        
        # Copy .env.example if it exists, otherwise create basic .env
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_status "Copied .env.example to .env. Please update it with your actual API key."
        else
            echo "OPENAI_API_KEY=your-api-key-here" > .env
            print_status "Created .env template file. Please update it with your actual API key."
        fi
    else
        # Check if API key is set
        if grep -q "OPENAI_API_KEY=your-api-key-here" .env || ! grep -q "OPENAI_API_KEY=" .env; then
            print_warning "OpenAI API key not properly configured in .env file!"
            echo "Please update apps/backend/.env with your actual OpenAI API key."
        else
            print_success "OpenAI API key found!"
        fi
    fi
    
    cd ../..
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd apps/backend
    
    # Create virtual environment
    if [ ! -d "venv" ]; then
        print_status "Creating Python virtual environment..."
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
    
    print_success "Backend setup complete!"
    cd ../..
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd apps/frontend
    
    # Install dependencies
    print_status "Installing Node.js dependencies..."
    npm install
    
    print_success "Frontend setup complete!"
    cd ../..
}

# Create start scripts
create_start_scripts() {
    print_status "Creating start scripts..."
    
    # Backend start script
    cat > start-backend.sh << 'EOF'
#!/bin/bash
cd apps/backend
source venv/bin/activate
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
EOF
    
    # Frontend start script
    cat > start-frontend.sh << 'EOF'
#!/bin/bash
cd apps/frontend
npm run dev
EOF
    
    # Make scripts executable
    chmod +x start-backend.sh start-frontend.sh
    
    print_success "Start scripts created!"
}

# Main setup function
main() {
    check_prerequisites
    setup_openai_key
    setup_backend
    setup_frontend
    create_start_scripts
    
    echo ""
    echo "🎉 Setup complete! Here's how to run the application:"
    echo ""
    echo "1. Start the backend server:"
    echo "   ./start-backend.sh"
    echo ""
    echo "2. In a new terminal, start the frontend:"
    echo "   ./start-frontend.sh"
    echo ""
    echo "3. Open your browser and go to:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8000"
    echo "   API Docs: http://localhost:8000/docs"
    echo ""
    echo "📚 For more information, see the README.md file"
    echo ""
    print_success "FounderHQ.ai is ready to use!"
}

# Run main function
main 