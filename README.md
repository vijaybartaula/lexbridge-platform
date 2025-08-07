# **LexBridge – Legal Translation Platform**

<div align="center">

**Bridging Languages, Empowering Lives**

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black)](https://vercel.com)

</div>

---

## Overview

LexBridge is an AI-powered legal translation platform designed for **refugees, asylum seekers, and legal professionals**. It enables contextually-aware, accurate translations of legal documents while maintaining the highest standards of **security and confidentiality**.

---

## Key Features

* **AI-Powered Legal Translation**
  Fine-tuned models for asylum and immigration law

* **Enterprise-Grade Security**
  End-to-end encryption and GDPR compliance

* **Multi-Language Support**
  Support for 10+ languages including Arabic, Dari, Pashto

* **Real-Time Processing**
  Instant text extraction and translation

* **Responsive Design**
  Optimized for mobile, tablet, and desktop

* **Modern UI/UX**
  Built with `shadcn/ui` components and Tailwind CSS

---

## ⚙Quick Start

### Prerequisites

* Node.js 18+
* npm / yarn / bun
* Google AI API Key

### Installation

```bash
git clone https://github.com/vijaybartaula/lexbridge-platform.git
cd lexbridge-platform
```

Install dependencies:

```bash
npm install     # or yarn install / bun install
```

Set up environment variables:

```bash
cp .env.example .env.local
```

Update `.env.local`:

```env
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_GENAI_API_KEY=your_google_genai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Run development server:

```bash
npm run dev     # or yarn dev / bun dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## System Architecture

### Tech Stack

* **Frontend**: Next.js 15, React 18, TypeScript
* **Styling**: Tailwind CSS, `shadcn/ui`
* **AI/ML**: Google Generative AI (Gemini 1.5 Flash)
* **Document Processing**: `pdf-parse`, `mammoth` (coming soon)
* **State Management**: React Hooks
* **Deployment**: Vercel

---

## Usage Guide

### Basic Translation

1. Select source & target languages
2. Paste text or use sample input
3. Click **Translate**
4. Review and verify translation
5. Download final output

### Document Upload *(Coming Soon)*

* Drag & drop or select files
* Automatic text extraction and language detection
* Translate and export

### Supported Formats *(Coming Soon)*

* `.pdf` (PDF)
* `.docx`, `.doc` (Word)
* `.txt` (Text)

---

## Supported Languages

| Language       | Code |
| -------------- | ---- |
| English        | en   |
| Spanish        | es   |
| French         | fr   |
| Arabic         | ar   |
| Persian (Dari) | fa   |
| Pashto         | ps   |
| Somali         | so   |
| Swahili        | sw   |
| Amharic        | am   |
| Tigrinya       | ti   |

*(Additional languages in progress)*

---

## Security & Privacy

### Data Protection

* Documents are **not stored**
* HTTPS/TLS encryption
* **No personal data collected**
* Fully **GDPR compliant**

### App-Level Security

* File validation
* Rate-limiting on endpoints
* Secure error handling
* CSP and modern security headers

---

## Testing

### Commands

```bash
npm run test              # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e          # End-to-end tests
npm run test:coverage     # Coverage report
```

### Test Structure

* **Unit**: Utilities, components
* **Integration**: API endpoints
* **E2E**: Full user scenarios

---

## Deployment

### Vercel (Recommended)

1. Connect GitHub repo to Vercel
2. Add `.env.local` variables in Vercel dashboard
3. Deploy – automatic on every push to `main`

### Manual

```bash
npm run build
npm run start
```

### Docker

```bash
docker build -t lexbridge-platform .
docker run -p 3000:3000 lexbridge-platform
```

---

## Contributing

We welcome all contributions. Please follow the standard workflow:

### Workflow

1. Fork the repository
2. Create a branch:
   `git checkout -b feature/my-feature`
3. Commit:
   `git commit -m 'Add feature'`
4. Push:
   `git push origin feature/my-feature`
5. Open a Pull Request

### Standards

* TypeScript strict mode
* ESLint & Prettier
* Conventional commits

### Issue Templates

* Bug Reports
* Feature Requests
* Documentation Fixes

---

## Performance

| Metric                    | Target             |
| ------------------------- | ------------------ |
| Translation Speed         | < 2 seconds        |
| Doc Processing Time       | < 5 seconds (10MB) |
| Uptime                    | 99.9%              |
| Lighthouse Score (Mobile) | > 90               |

### Optimization Techniques

* Code splitting
* Image optimization
* CDN caching
* Lazy loading & dynamic imports

---

## Roadmap

### Phase 1 (Now)

* Core translations
* Responsive UI
* Multi-language support

### Phase 2 (Q2 2025)

* User auth
* Translation history
* Batch document processing
* Rate-limit dashboard

### Phase 3 (Q3 2025)

* Legal form auto-fill
* NGO portal
* Real-time collaboration
* Analytics & insights

### Phase 4 (Q4 2025)

* Mobile app
* Offline translation
* OCR capabilities
* Custom AI model training

---

## License

Licensed under the **MIT License**. See [LICENSE](LICENSE) for full text.

---

## Acknowledgments

* **Google AI** – Generative AI platform
* **Vercel** – Hosting and deployment
* **shadcn/ui** – UI components
* **Open Source Community** – For tools and inspiration

---

<div align="center">

**Made for refugees, asylum seekers, and legal advocates.**
© 2024–2025 LexBridge. Empowering lives through technology.

</div>
