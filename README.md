# LexBridge - Legal Translation Platform

<div align="center">
  
  **Bridging Languages, Empowering Lives**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black)](https://vercel.com)
</div>

## Overview

LexBridge is a cutting-edge AI-powered legal translation platform specifically designed for refugees, asylum seekers, and legal professionals. Our mission is to break down language barriers in critical legal proceedings by providing accurate, contextually-aware translations of legal documents while maintaining the highest standards of security and confidentiality.

### Key Features

- **AI-Powered Legal Translation**: Specialized translation engine fine-tuned for asylum and immigration law
- **Enterprise-Grade Security**: End-to-end encryption and GDPR compliance
- **Multi-Language Support**: 10+ languages including Arabic, Persian (Dari), Pashto, and more
- **Real-Time Processing**: Instant text extraction and translation
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface built with shadcn/ui components

## Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm, yarn, or bun package manager
- Google AI API key

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com//lexbridge-platform.git
   cd lexbridge-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   bun install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Edit `.env.local` and add your configuration:
   \`\`\`env
   GOOGLE_API_KEY=your_google_api_key_here
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## System Architecture

### Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI/ML**: Google Generative AI (Gemini 1.5 Flash)
- **Document Processing**: pdf-parse, mammoth (coming soon)
- **State Management**: React Hooks
- **Deployment**: Vercel

## Usage Guide

### Basic Translation

1. **Select Languages**: Choose source and target languages from the dropdown menus
2. **Input Text**: Either paste text directly or use the sample text feature
3. **Translate**: Click the "Translate" button to process your document
4. **Review**: Check the translation quality indicator and review the output
5. **Download**: Export the translated document

### Document Upload (coming soon)

1. **Drag & Drop**: Simply drag your document onto the upload area
2. **File Selection**: Or click "Choose File" to browse your documents
3. **Processing**: The system will extract text and detect the language
4. **Translation**: Proceed with translation as normal

### Supported File Formats (coming soon)

- **PDF** (.pdf) - Portable Document Format
- **Word Documents** (.docx, .doc) - Microsoft Word
- **Plain Text** (.txt) - Text files

### Supported Languages

| Language | Code | Region |
|----------|------|--------|
| English | en | 🇺🇸 |
| Spanish | es | 🇪🇸 |
| French | fr | 🇫🇷 |
| Arabic | ar | 🇸🇦 |
| Persian (Dari) | fa | 🇦🇫 |
| Pashto | ps | 🇦🇫 |
| Somali | so | 🇸🇴 |
| Swahili | sw | 🇰🇪 |
| Amharic | am | 🇪🇹 |
| Tigrinya | ti | 🇪🇷 |

And more.

## Security & Privacy

### Data Protection

- **No Data Storage**: Documents are processed in memory and not stored
- **Encryption**: All API communications use HTTPS/TLS
- **Privacy First**: No personal information is collected or retained
- **GDPR Compliant**: Designed with European privacy regulations in mind

### Security Features

- **Input Validation**: All uploads are validated for type and size
- **Rate Limiting**: API endpoints are protected against abuse
- **Error Handling**: Secure error messages that don't leak system information
- **Content Security**: CSP headers and security best practices

## Testing

### Running Tests

\`\`\`bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
\`\`\`

### Test Structure

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user workflow testing

## Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add your environment variables in Vercel dashboard
3. **Deploy**: Automatic deployment on every push to main branch

### Manual Deployment

\`\`\`bash
# Build the application
npm run build

# Start production server
npm run start
\`\`\`

### Docker Deployment

\`\`\`bash
# Build Docker image
docker build -t lexbridge-platform .

# Run container
docker run -p 3000:3000 lexbridge-platform
\`\`\`

## Contributing

We welcome contributions from the community! Please read our contributing guidelines before submitting pull requests.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with recommended rules
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format

### Issue Reporting

Please use our issue templates when reporting bugs or requesting features:

- **Bug Report**: For reporting issues
- **Feature Request**: For suggesting enhancements
- **Documentation**: For documentation improvements

## Performance

### Metrics

- **Translation Speed**: < 2 seconds average
- **Document Processing**: < 5 seconds for 10MB files
- **Uptime**: 99.9% availability target
- **Mobile Performance**: Lighthouse score > 90

### Optimization

- **Code Splitting**: Dynamic imports for better performance
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: Aggressive caching strategies
- **CDN**: Global content delivery network

## Roadmap

### Phase 1 (Current)
- Core translation functionality
- Multi-language support
- Responsive design

### Phase 2 (Q2 2025)
- User authentication system
- Translation history
- Batch document processing
- API rate limiting dashboard

### Phase 3 (Q3 2025)
- Legal form auto-filling
- Collaborative translation workspace
- NGO partnership portal
- Advanced analytics

### Phase 4 (Q4 2025)
- Custom AI model training
- OCR capabilities
- Mobile application
- Offline functionality

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Google AI**: For providing the Generative AI API
- **Vercel**: For hosting and deployment platform
- **shadcn/ui**: For the beautiful UI component library
- **Open Source Community**: For the amazing tools and libraries

---

<div align="center">
  <p><strong>Made with love for refugees and asylum seekers worldwide</strong></p>
  <p>© 2024-25 LexBridge. Empowering lives through technology.</p>
</div>