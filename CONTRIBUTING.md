# Contributing to FounderHQ.ai

Thank you for your interest in contributing to FounderHQ.ai! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork and Clone
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/yourusername/FounderHubAI.git
   cd FounderHubAI
   ```

### 2. Set Up Development Environment
Follow the setup instructions in the [README.md](README.md) to get your development environment running.

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Follow the existing code style and patterns
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 5. Commit Your Changes
```bash
git add .
git commit -m "feat: add your feature description"
```

### 6. Push and Create a Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with a clear description of your changes.

## 📋 Development Guidelines

### Code Style

#### Python (Backend)
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Add docstrings to functions and classes
- Keep functions small and focused

#### TypeScript/JavaScript (Frontend)
- Use TypeScript for type safety
- Follow ESLint configuration
- Use functional components with hooks
- Keep components small and reusable

#### General
- Write clear, descriptive commit messages
- Add comments for complex logic
- Use meaningful variable and function names
- Follow the existing project structure

### Testing

#### Backend Testing
```bash
cd apps/backend
python -m pytest tests/
```

#### Frontend Testing
```bash
cd apps/frontend
npm test
```

### Documentation
- Update README.md for significant changes
- Add inline comments for complex code
- Update API documentation if endpoints change
- Include examples for new features

## 🎯 Areas for Contribution

### High Priority
- **Bug fixes** - Any issues you encounter
- **Performance improvements** - Optimize API calls, reduce bundle size
- **UI/UX enhancements** - Improve user experience
- **Test coverage** - Add more comprehensive tests

### Medium Priority
- **New AI features** - Enhance AI capabilities
- **Export formats** - Add more export options
- **Analytics** - Add usage analytics and insights
- **Mobile responsiveness** - Improve mobile experience

### Low Priority
- **Documentation** - Improve existing docs
- **Code refactoring** - Clean up existing code
- **Accessibility** - Improve accessibility features
- **Internationalization** - Add multi-language support

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment details** (OS, browser, versions)
5. **Screenshots** if applicable
6. **Console errors** if any

## 💡 Suggesting Features

When suggesting new features:

1. **Clear description** of the feature
2. **Use case** and why it's valuable
3. **Implementation approach** if you have ideas
4. **Mockups** or examples if applicable

## 📝 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console errors
- [ ] Feature works as expected

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have made corresponding changes to documentation
```

## 🏷️ Issue Labels

We use the following labels to categorize issues:

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issues
- `priority: low` - Low priority issues

## 🎉 Recognition

Contributors will be recognized in:
- The project README
- Release notes
- GitHub contributors page

## 📞 Getting Help

If you need help with contributing:

1. Check existing issues and discussions
2. Join our community discussions
3. Create an issue for questions
4. Reach out to maintainers

## 📄 License

By contributing to FounderHQ.ai, you agree that your contributions will be licensed under the MIT License.

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Node.js 18+
- Git
- OpenAI API Key (for AI features)

### Setup Instructions

1. **Fork and Clone:**
   ```bash
   git clone https://github.com/your-username/FounderHubAI.git
   cd FounderHubAI
   ```

2. **Install Dependencies:**
   ```bash
   # Backend
   cd apps/backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   
   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure OpenAI API Key:**
   ```bash
   # Create .env file in apps/backend/
   cd apps/backend
   echo "OPENAI_API_KEY=your-api-key-here" > .env
   ```
   
   **Get an API Key:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Add it to your `.env` file
   
   **Note:** AI features won't work without a valid API key.

4. **Run the Application:**
   ```bash
   # Backend (Terminal 1)
   cd apps/backend
   source venv/bin/activate
   python -m uvicorn main:app --reload
   
   # Frontend (Terminal 2)
   cd apps/frontend
   npm run dev
   ```

5. **Access the Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

---

Thank you for contributing to FounderHQ.ai! 🚀 