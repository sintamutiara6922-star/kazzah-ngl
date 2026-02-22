# Contributing to Takok OPO?

First off, thank you for considering contributing to Takok OPO! It's people like you that make this project such a great tool for the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Project Structure](#project-structure)
- [Testing](#testing)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be respectful** - Treat everyone with respect and kindness
- **Be collaborative** - Work together towards common goals
- **Be inclusive** - Welcome newcomers and diverse perspectives
- **Be constructive** - Provide helpful and actionable feedback
- **Be patient** - Remember that everyone was a beginner once

---

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 11, macOS 14]
 - Browser: [e.g. Chrome 120, Safari 17]
 - Node Version: [e.g. 20.10.0]
 - Package Manager: [e.g. pnpm 8.15.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

**Enhancement Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of the problem. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### First Time Contributors

Looking for a way to contribute? Look for issues tagged with:

- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Improvements or additions to documentation

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ (recommended 20+)
- pnpm (preferred) or npm/yarn
- Git
- Code editor (VS Code recommended)

### Setup Steps

1. **Fork and Clone**
   ```bash
   # Fork the repo on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/takok-opo.git
   cd takok-opo
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/YilziiHCT/takok-opo.git
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   ```

4. **Set Up Environment Variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your credentials
   ```

5. **Start Development Server**
   ```bash
   pnpm dev
   ```

6. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Recommended VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- GitLens

---

## 🔄 Pull Request Process

### Before Submitting

1. **Check existing PRs** - Avoid duplicates
2. **Create an issue first** - Discuss major changes
3. **Follow coding standards** - See below
4. **Test thoroughly** - Ensure no regressions
5. **Update documentation** - If needed

### PR Steps

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments for complex logic

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

4. **Keep branch updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template
   - Submit!

### PR Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested on multiple browsers
- [ ] No console errors
- [ ] Lighthouse score maintained

## Screenshots (if applicable)
Add screenshots here.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code sections
- [ ] Updated documentation
- [ ] No new warnings/errors
- [ ] Tested thoroughly
```

---

## 📝 Coding Standards

### TypeScript/JavaScript

- Use **TypeScript** for type safety
- Use **functional components** with hooks
- Use **async/await** over promises
- Use **const** over let/var
- Prefer **arrow functions** for inline functions
- Use **destructuring** where appropriate

**Example:**

```typescript
// ✅ Good
export async function submitQuestion(data: QuestionData) {
  const { name, message } = data;
  return await saveToDatabase({ name, message });
}

// ❌ Bad
export function submitQuestion(data) {
  return saveToDatabase(data.name, data.message);
}
```

### React/Next.js

- Use **Server Components** by default
- Add `'use client'` only when needed
- Use **App Router** conventions
- Prefer **composition** over inheritance
- Keep components **small and focused**
- Use **proper hooks** (useState, useEffect, etc.)

**Example:**

```tsx
// ✅ Good - Small, focused component
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// ❌ Bad - Too many responsibilities
function MegaComponent() {
  // 500 lines of code...
}
```

### Styling (Tailwind CSS)

- Use **Tailwind utility classes**
- Follow **responsive-first** approach
- Use **semantic class names** for custom CSS
- Prefer **flexbox** over grid for simple layouts
- Use **design tokens** (bg-background, text-foreground)
- Keep classes **organized and readable**

**Example:**

```tsx
// ✅ Good
<div className="flex items-center justify-between gap-4 rounded-lg bg-background p-4 shadow-md">
  <h2 className="text-xl font-bold text-foreground">Title</h2>
  <button className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
    Click me
  </button>
</div>

// ❌ Bad
<div className="d-flex jc-between p-4 bg-gray-900 rounded-lg shadow">
  <h2 className="font-bold text-xl white-text">Title</h2>
  <button className="btn btn-primary">Click me</button>
</div>
```

### File Organization

- **One component per file**
- **Co-locate related files**
- **Use barrel exports** (index.ts) sparingly
- **Group by feature**, not by type

```
components/
├── question-form/
│   ├── question-form.tsx
│   ├── form-field.tsx
│   └── form-validation.ts
└── question-table/
    ├── question-table.tsx
    └── table-row.tsx
```

---

## 📋 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting, missing semi-colons, etc)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Examples

```bash
feat(question-form): add character counter
fix(navbar): correct mobile menu alignment
docs(readme): update installation instructions
style(components): format with prettier
refactor(api): simplify error handling
perf(images): optimize webp compression
test(moderation): add unit tests for censoring
chore(deps): update dependencies
```

### Best Practices

- Use **imperative mood** ("add" not "added")
- Keep **first line under 72 characters**
- Capitalize first letter
- No period at the end
- Reference issues/PRs in body
- Explain **why**, not just **what**

---

## 🏗️ Project Structure

Understanding the project structure helps you find the right place for your changes:

```
takok-opo/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (server-side)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── ui/               # Reusable UI primitives
│   ├── hero-section.tsx  # Page sections
│   ├── question-form.tsx # Feature components
│   └── ...
│
├── lib/                  # Utilities & helpers
│   ├── db.ts            # Database operations
│   ├── moderation.ts    # Content filtering
│   └── utils.ts         # Generic utilities
│
├── public/              # Static assets
│   ├── images/         # Images (optimized webp)
│   └── ...
│
└── middleware.ts       # Edge middleware (rate limiting)
```

### Where to Add Code

- **New page?** → `app/[page-name]/page.tsx`
- **New API endpoint?** → `app/api/[endpoint]/route.ts`
- **New component?** → `components/[component-name].tsx`
- **New utility?** → `lib/[utility-name].ts`
- **New styles?** → `app/globals.css` or inline Tailwind

---

## 🧪 Testing

### Manual Testing Checklist

Before submitting a PR, test the following:

- [ ] **Desktop browsers** (Chrome, Firefox, Safari)
- [ ] **Mobile browsers** (iOS Safari, Chrome Mobile)
- [ ] **Different screen sizes** (mobile, tablet, desktop)
- [ ] **Dark/light mode** (if applicable)
- [ ] **Form submissions** work correctly
- [ ] **Navigation** works as expected
- [ ] **No console errors** or warnings
- [ ] **Performance** is acceptable
- [ ] **Accessibility** (keyboard navigation, screen readers)

### Testing Tools

- **Lighthouse** - Performance, accessibility, SEO
- **React DevTools** - Component inspection
- **Network tab** - API calls and loading
- **Console** - Errors and warnings

### Writing Tests (Future)

We plan to add automated testing. If you'd like to contribute:

- Unit tests with **Jest**
- Component tests with **React Testing Library**
- E2E tests with **Playwright**

---

## 🎨 Design Guidelines

### Colors

- Use **design tokens** from `globals.css`
- Stick to **cyan/teal** accent color (#00D4AA)
- Use **neutral grays** for backgrounds
- Maintain **high contrast** for accessibility

### Typography

- **Headings:** Bold, clear hierarchy
- **Body text:** 16px minimum, readable line-height
- **Use font-sans** for consistency

### Spacing

- Use **Tailwind spacing scale** (4, 8, 16, 24, 32...)
- Consistent **padding and margins**
- Proper **gap** in flex/grid layouts

### Animations

- Keep animations **subtle and smooth**
- Use **Framer Motion** for complex animations
- Respect **prefers-reduced-motion**

---

## 🐛 Debugging Tips

### Common Issues

1. **Dependency issues**
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **Environment variables not loading**
   - Restart dev server after changing `.env.local`
   - Check variable names (NEXT_PUBLIC_ prefix for client-side)

3. **TypeScript errors**
   ```bash
   pnpm type-check
   ```

4. **Styling not applying**
   - Clear `.next` folder
   - Check Tailwind class names
   - Verify import order in `globals.css`

### Debug Mode

Add debug logs:

```typescript
console.log('[alue:', myVariable);
```

Remove before committing!

---

## 📞 Getting Help

Stuck? Here's where to get help:

- **GitHub Issues** - Ask questions with `question` label
- **GitHub Discussions** - General discussions
- **Code Review** - Request review in PR
- **Documentation** - Check README and docs/

---

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

Happy coding! 🚀

---

**Made with ❤️ by the Takok OPO community**
