# SnapNotes AI - Development Todo List

> **Goal**: Build MVP in 1-day sprint ready for competition submission  
> **Timeline**: Phases organized for systematic development without blockers

---

## 📋 Phase 0: Pre-Development Setup (30 minutes)

### Environment & Dependencies
- [ ] Install Node.js (v18+ recommended)
- [ ] Install Git (verify with `git --version`)
- [ ] Create Tambo AI account and get API key
- [ ] Set up code editor (VS Code recommended)
- [ ] Install browser dev tools extensions

### Project Initialization
- [ ] Initialize Vite + React project
  ```bash
  npm create vite@latest . -- --template react
  ```
- [ ] Install core dependencies
  ```bash
  npm install
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- [ ] Install Tambo AI SDK
  ```bash
  npm install @tambo/react-sdk
  ```
- [ ] Install utility libraries
  ```bash
  npm install pdfjs-dist jspdf file-saver
  ```

### Configuration Files
- [ ] Configure `tailwind.config.js` with custom colors
- [ ] Update `vite.config.js` for optimal dev experience
- [ ] Create `.env.local` for Tambo API key
  ```
  VITE_TAMBO_API_KEY=your_api_key_here
  ```
- [ ] Update `.gitignore` (already done ✓)
- [ ] Set up ESLint and Prettier (optional but recommended)

---

## 🏗️ Phase 1: Project Structure & Foundation (45 minutes)

### Directory Setup
- [ ] Create folder structure:
  ```
  src/
  ├── components/
  ├── hooks/
  ├── pages/
  ├── utils/
  └── styles/
  ```

### Tailwind CSS Setup
- [ ] Configure `src/styles/globals.css` with Tailwind directives
- [ ] Define custom color palette (primary, accent, neutral)
- [ ] Add custom font imports (Inter from Google Fonts)
- [ ] Create utility classes for common patterns

### Tambo AI Integration Setup
- [ ] Create `src/config/tambo.js` for SDK configuration
- [ ] Initialize Tambo client with API key
- [ ] Test connection with simple API call
- [ ] Create error handling wrapper for API calls

---

## 🎨 Phase 2: Core Components Development (2 hours)

### Input Components
- [ ] **TextInput.jsx** - Text area component
  - [ ] Character counter (max 50,000)
  - [ ] Clear button functionality
  - [ ] Input validation
  - [ ] Placeholder text
  - [ ] Auto-resize on input

- [ ] **PDFUploader.jsx** - File upload component
  - [ ] Drag-and-drop zone
  - [ ] File size validation (max 10MB)
  - [ ] File type validation (.pdf only)
  - [ ] Upload progress indicator
  - [ ] Preview uploaded file name
  - [ ] Remove file button

- [ ] **FormatSelector.jsx** - Note format selection
  - [ ] Radio buttons for 3 formats (Bullet/Q&A/Flashcards)
  - [ ] Visual icons for each format
  - [ ] Active state styling
  - [ ] Default selection (Bullet Notes)

### Output Components
- [ ] **NotesOutput.jsx** - Display generated notes
  - [ ] Formatted text rendering (bullets, Q&A, flashcards)
  - [ ] Syntax highlighting for key terms
  - [ ] Loading skeleton during generation
  - [ ] Empty state placeholder
  - [ ] Copy-friendly formatting

- [ ] **LoadingSpinner.jsx** - Loading indicator
  - [ ] Animated spinner component
  - [ ] Loading message variants
  - [ ] Progress percentage (if available)

### Action Components
- [ ] **ActionButtons.jsx** - Refinement controls
  - [ ] "Shorter" button with icon
  - [ ] "More Detailed" button with icon
  - [ ] "Convert to Q&A" button
  - [ ] "Make Flashcards" button
  - [ ] Disabled state during processing
  - [ ] Tooltip hints

- [ ] **ExportButtons.jsx** - Export options
  - [ ] Copy to clipboard button
  - [ ] Download as TXT button
  - [ ] Download as PDF button
  - [ ] Success/error toast notifications

---

## 🔧 Phase 3: Utility Functions (1 hour)

### PDF Processing
- [ ] **utils/pdfParser.js**
  - [ ] Initialize PDF.js worker
  - [ ] Extract text from PDF pages
  - [ ] Handle multi-page PDFs
  - [ ] Error handling for corrupt files
  - [ ] Progress callback for large files

### Export Functionality
- [ ] **utils/exportNotes.js**
  - [ ] `copyToClipboard()` - Clipboard API implementation
  - [ ] `downloadTXT()` - Create and download .txt file
  - [ ] `downloadPDF()` - Generate styled PDF with jsPDF
  - [ ] Preserve formatting in exports
  - [ ] Add metadata (timestamp, format type)

### Local Storage
- [ ] **utils/localStorage.js**
  - [ ] Save note history
  - [ ] Retrieve recent notes
  - [ ] Clear storage function
  - [ ] Storage quota management

---

## 🤖 Phase 4: Tambo AI Integration (1.5 hours)

### Custom Hooks
- [ ] **hooks/useTamboAI.js** - Main AI integration hook
  - [ ] `generateNotes()` - Initial note generation
  - [ ] `refineNotes()` - Shorter/More detailed
  - [ ] `convertFormat()` - Format conversion
  - [ ] Loading state management
  - [ ] Error handling and retry logic
  - [ ] Response parsing and formatting

### Generative Components
- [ ] Configure note generation prompts
  - [ ] Bullet notes prompt template
  - [ ] Q&A format prompt template
  - [ ] Flashcard format prompt template
  - [ ] Optimize for exam-focused content
  - [ ] Test with sample inputs

### Interactable Components
- [ ] Implement refinement actions
  - [ ] Condense/shorten transformation
  - [ ] Expand/detail transformation
  - [ ] Format conversion logic
  - [ ] Maintain context across transformations

---

## 🎯 Phase 5: Main Application Assembly (1 hour)

### Pages
- [ ] **pages/Home.jsx** - Main application page
  - [ ] Two-panel layout (input left, output right)
  - [ ] Responsive breakpoints (mobile stack vertically)
  - [ ] State management for notes
  - [ ] Workflow orchestration (input → generate → refine → export)
  - [ ] Error boundaries

### App Component
- [ ] **App.jsx** - Root component
  - [ ] Tambo SDK provider wrapper
  - [ ] Global state context (if needed)
  - [ ] Toast notification provider
  - [ ] Error boundary wrapper

### Header & Footer
- [ ] Create Header component
  - [ ] App logo/name
  - [ ] Tagline: "Turn Long Content into Exam-Ready Micro-Notes"
  - [ ] GitHub link (optional)

- [ ] Create Footer component (optional)
  - [ ] Credits
  - [ ] Links to docs/support

---

## 🎨 Phase 6: UI/UX Polish (1 hour)

### Styling & Responsive Design
- [ ] Apply Tailwind classes to all components
- [ ] Ensure mobile responsiveness (320px+)
- [ ] Test tablet view (768px - 1023px)
- [ ] Test desktop view (1024px+)
- [ ] Add hover states to interactive elements
- [ ] Add focus states for accessibility

### Animations & Transitions
- [ ] Smooth transitions for state changes
- [ ] Fade-in for generated notes
- [ ] Button hover animations
- [ ] Loading spinner animation
- [ ] Toast notification animations

### Accessibility
- [ ] Add ARIA labels to all interactive elements
- [ ] Ensure keyboard navigation works
- [ ] Test with screen reader
- [ ] Verify color contrast ratios (4.5:1 minimum)
- [ ] Add focus indicators

---

## ✅ Phase 7: Testing & Debugging (1.5 hours)

### Unit Testing
- [ ] Test PDF parser with sample PDFs
- [ ] Test export functions (clipboard, TXT, PDF)
- [ ] Test input validation logic
- [ ] Test format conversion accuracy

### Integration Testing
- [ ] Test full workflow: paste text → generate → refine → export
- [ ] Test PDF upload workflow
- [ ] Test all format conversions
- [ ] Test error handling (API failures, invalid inputs)
- [ ] Test with long documents (edge cases)

### Cross-Browser Testing
- [ ] Test on Chrome/Edge
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Verify export features work on all browsers

### Performance Testing
- [ ] Measure page load time (target: < 2s)
- [ ] Measure note generation time (target: < 10s)
- [ ] Test with maximum input sizes
- [ ] Check for memory leaks

### Bug Fixing
- [ ] Fix any critical bugs
- [ ] Address UI inconsistencies
- [ ] Improve error messages
- [ ] Optimize slow operations

---

## 📦 Phase 8: Documentation & Deployment Prep (45 minutes)

### README.md
- [ ] Project overview and features
- [ ] Screenshots/GIFs of the app
- [ ] Installation instructions
- [ ] Environment variable setup guide
- [ ] Usage guide
- [ ] Technology stack explanation
- [ ] Tambo AI feature showcase
- [ ] Contributing guidelines (optional)
- [ ] License information

### Demo Video
- [ ] Record screen recording of full workflow
- [ ] Show text input → generation
- [ ] Show PDF upload → generation
- [ ] Demonstrate all refinement features
- [ ] Show export functionality
- [ ] Highlight Tambo AI integration points
- [ ] Keep video under 3 minutes

### Code Comments
- [ ] Add JSDoc comments to key functions
- [ ] Document complex logic
- [ ] Add inline comments for Tambo integration points

---

## 🚀 Phase 9: Build & Deployment (30 minutes)

### Production Build
- [ ] Run production build: `npm run build`
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all features work in production mode
- [ ] Check bundle size and optimize if needed
- [ ] Ensure environment variables are properly configured

### Deployment Options
Choose one of the following:

#### Option A: Vercel (Recommended)
- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run `vercel` in project directory
- [ ] Configure environment variables in Vercel dashboard
- [ ] Test deployed app
- [ ] Get deployment URL

#### Option B: Netlify
- [ ] Create `netlify.toml` configuration
- [ ] Deploy via Netlify CLI or drag-and-drop
- [ ] Configure environment variables
- [ ] Test deployed app

#### Option C: GitHub Pages
- [ ] Configure `vite.config.js` for GitHub Pages
- [ ] Install `gh-pages`: `npm install -D gh-pages`
- [ ] Add deploy script to `package.json`
- [ ] Run `npm run deploy`

### Post-Deployment
- [ ] Test all features on live URL
- [ ] Verify Tambo API works in production
- [ ] Check mobile responsiveness on real devices
- [ ] Share URL for feedback

---

## 🎁 Phase 10: Submission Preparation (30 minutes)

### Competition Submission Checklist
- [ ] Verify all Tambo AI features are highlighted:
  - [ ] Generative components clearly labeled
  - [ ] Interactable components demonstrated
  - [ ] Local tools integration shown
  - [ ] React SDK usage documented

- [ ] Prepare submission materials:
  - [ ] Live demo URL
  - [ ] GitHub repository link
  - [ ] Demo video (< 3 min)
  - [ ] README with Tambo integration explanation
  - [ ] Screenshots of key features

- [ ] Quality checks:
  - [ ] No console errors
  - [ ] All features functional
  - [ ] Professional UI/UX
  - [ ] Fast performance

### Final Git Commit
- [ ] Stage all changes: `git add .`
- [ ] Commit: `git commit -m "feat: complete SnapNotes AI MVP"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Create release tag: `git tag v1.0.0 && git push --tags`

---

## 🔮 Post-MVP Enhancements (Future Phases)

### Phase 11: User Feedback & Iteration
- [ ] Collect user feedback via form
- [ ] Add analytics tracking (Google Analytics/Plausible)
- [ ] Monitor error logs
- [ ] Implement most-requested features

### Phase 12: Advanced Features
- [ ] User accounts and authentication
- [ ] Save multiple note sets
- [ ] Note history and management
- [ ] Custom formatting preferences
- [ ] Share notes via link
- [ ] Collaborative notes

### Phase 13: AI Enhancements
- [ ] Multi-language support
- [ ] Subject-specific templates
- [ ] Diagram extraction from PDFs
- [ ] AI-powered practice quizzes
- [ ] Smart highlighting of key terms

### Phase 14: Mobile App
- [ ] React Native version
- [ ] Offline mode
- [ ] Mobile-optimized UI
- [ ] Native share functionality

---

## 📊 Progress Tracking

### Development Velocity
- **Target**: Complete Phases 0-9 in 12-14 hours (1-day sprint)
- **Current Phase**: Phase 0
- **Completed Tasks**: 3
- **Remaining Tasks**: ~80

### Time Allocation
| Phase | Estimated Time | Status |
|-------|----------------|--------|
| Phase 0 | 30 min | ⏳ Not Started |
| Phase 1 | 45 min | ⏳ Not Started |
| Phase 2 | 2 hours | ⏳ Not Started |
| Phase 3 | 1 hour | ⏳ Not Started |
| Phase 4 | 1.5 hours | ⏳ Not Started |
| Phase 5 | 1 hour | ⏳ Not Started |
| Phase 6 | 1 hour | ⏳ Not Started |
| Phase 7 | 1.5 hours | ⏳ Not Started |
| Phase 8 | 45 min | ⏳ Not Started |
| Phase 9 | 30 min | ⏳ Not Started |
| Phase 10 | 30 min | ⏳ Not Started |
| **Total** | **12 hours** | |

---

## 🚨 Common Pitfalls to Avoid

1. ❌ **Skipping PDF Parser Testing** → Test with various PDF formats early
2. ❌ **Hardcoding API Keys** → Always use environment variables
3. ❌ **Ignoring Mobile Layout** → Test responsive design continuously
4. ❌ **Over-complicating State** → Keep state management simple for MVP
5. ❌ **Not Testing Export Features** → Verify exports work in different browsers
6. ❌ **Weak Tambo Integration Docs** → Clearly document where Tambo is used
7. ❌ **No Error Handling** → Always handle API failures gracefully

---

## 📞 Quick Reference Links

- **Tambo AI Docs**: [Insert Link]
- **PDF.js Documentation**: https://mozilla.github.io/pdf.js/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vite Guide**: https://vitejs.dev/guide/
- **React Docs**: https://react.dev/

---

## ✅ Daily Standup Template

```markdown
### What I completed today:
- [ ] List completed tasks

### What I'm working on next:
- [ ] Next task

### Blockers:
- None / [describe blocker]
```

---

**Last Updated**: February 8, 2026  
**Status**: Ready for Development 🚀