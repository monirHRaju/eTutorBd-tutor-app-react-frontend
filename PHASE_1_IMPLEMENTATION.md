# Phase 1: Foundation & Architecture Enhancement - Detailed Implementation Guide

## Overview
This guide provides step-by-step instructions for implementing Phase 1 tasks that form the foundation for the entire project upgrade. Estimated duration: 2 weeks.

---

## Task 1: Project Environment Setup

### 1.1 Create Environment Configuration Files

#### Step 1: Create `.env.example`
```bash
# Create .env.example at project root
```

**File content** (`.env.example`):
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here

# API Configuration
VITE_API_BASE_URL=https://api.example.com
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_MESSAGING=true
VITE_ENABLE_PAYMENTS=true
VITE_ENABLE_RATINGS=true

# Analytics
VITE_GOOGLE_ANALYTICS_ID=

# Environment
VITE_ENV=development
```

#### Step 2: Create `.env.local` (local only - add to .gitignore)
Copy `.env.example` to `.env.local` and fill in actual credentials for local development.

#### Step 3: Update `.gitignore`
Add these lines to ensure sensitive files aren't committed:
```
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 1.2 Create Centralized Config Module

Create `src/config/` directory with the following structure:

#### `src/config/env.js`
```javascript
// Centralized environment variable access
export const env = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  },
  features: {
    messaging: import.meta.env.VITE_ENABLE_MESSAGING === 'true',
    payments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
    ratings: import.meta.env.VITE_ENABLE_RATINGS === 'true',
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
```

#### `src/config/constants.js`
```javascript
// Application-wide constants

export const APP_NAME = 'eTutorBd';
export const APP_VERSION = '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZES = [10, 25, 50];

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  TUTOR: 'tutor',
};

// Tuition Status
export const TUITION_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

// Application Status
export const APPLICATION_STATUS = {
  APPLIED: 'applied',
  SHORTLISTED: 'shortlisted',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_TUITION_TITLE_LENGTH: 200,
  MAX_BIO_LENGTH: 500,
};

// UI
export const TOAST_DURATION = 4000;
export const MODAL_ANIMATION_DURATION = 300;
```

#### `src/config/index.js`
```javascript
export * from './env.js';
export * from './constants.js';
```

---

## Task 2: Core Utilities Enhancement

### 2.1 Create HTTP Client

Create `src/utilities/httpClient.js`:

```javascript
import axios from 'axios';
import { env } from '../config/env.js';
import { getAuthToken } from './auth.js';
import toast from 'react-hot-toast';

const httpClient = axios.create({
  baseURL: env.api.baseUrl,
  timeout: env.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Add auth token
httpClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle errors
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      
      // Handle specific status codes
      if (status === 401) {
        // Unauthorized - clear auth and redirect to login
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action');
      } else if (status === 404) {
        toast.error('Resource not found');
      } else if (status >= 500) {
        toast.error('Server error occurred. Please try again later.');
      }
      
      return Promise.reject({
        message: error.response.data?.message || error.message,
        status,
        data: error.response.data,
      });
    }
    
    // Network error
    toast.error('Network error. Please check your connection.');
    return Promise.reject(error);
  }
);

export default httpClient;
```

#### `src/utilities/auth.js`
```javascript
import { auth } from '../firebase/firebase.config.js';

export const getAuthToken = async () => {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  }
  return null;
};
```

### 2.2 Create Error Handler

Create `src/utilities/errorHandler.js`:

```javascript
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

export const handleError = (error) => {
  if (error.response) {
    // Axios error with response
    return new AppError(
      error.response.data?.message || error.message,
      error.response.data?.code,
      error.response.status
    );
  }
  
  if (error.request) {
    // Request made but no response
    return new AppError('No response from server', 'NO_RESPONSE', 0);
  }
  
  if (error instanceof AppError) {
    return error;
  }
  
  // Unknown error
  return new AppError(error.message || 'An unexpected error occurred');
};

export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error instanceof AppError) return error.message;
  if (error.response?.data?.message) return error.response.data.message;
  return 'An unexpected error occurred';
};
```

### 2.3 Create Data Transformers

Create `src/utilities/transformers.js`:

```javascript
// Normalize API response format
export const normalizeResponse = (data) => {
  if (!data) return null;
  
  return {
    id: data.id || data._id,
    ...data,
  };
};

// Format date for display
export const formatDate = (date, format = 'MMM DD, YYYY') => {
  if (!date) return '';
  
  const d = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return format
    .replace('YYYY', d.getFullYear())
    .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
    .replace('MMM', months[d.getMonth()])
    .replace('DD', String(d.getDate()).padStart(2, '0'));
};

// Format currency
export const formatCurrency = (amount, currency = 'BDT') => {
  const symbols = {
    BDT: '৳',
    USD: '$',
    EUR: '€',
  };
  
  return `${symbols[currency] || currency} ${parseFloat(amount).toFixed(2)}`;
};

// Truncate text
export const truncateText = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Validate email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### 2.4 Create Common Hooks

Create `src/hooks/useApi.js`:

```javascript
import { useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import httpClient from '../utilities/httpClient.js';

export const useApi = (method = 'get') => {
  return useCallback((url, data = null, config = {}) => {
    if (method === 'get' || method === 'delete') {
      return httpClient[method](url, config);
    }
    return httpClient[method](url, data, config);
  }, [method]);
};
```

Create `src/hooks/useLocalStorage.js`:

```javascript
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('localStorage error:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('localStorage error:', error);
    }
  };

  return [storedValue, setValue];
};
```

---

## Task 3: Create Project Documentation

### 3.1 Update README.md

Enhance the root `README.md` with:

```markdown
# eTutorBd Frontend

Modern React-based tuition posting and hiring platform.

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Firebase account with project set up

### Installation

1. Clone and install:
\`\`\`bash
git clone <repo>
cd frontend
npm install
\`\`\`

2. Set up environment:
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your Firebase credentials
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
# Opens at http://localhost:5173
\`\`\`

## Available Scripts

- \`npm run dev\` - Start Vite dev server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint
- \`npm run lint --fix\` - Auto-fix linting issues

## Project Structure

See [COPILOT_INSTRUCTIONS.md](COPILOT_INSTRUCTIONS.md) for detailed structure and patterns.

## Implementation Roadmap

See [ACTION_PLAN.md](ACTION_PLAN.md) for 12-week feature implementation plan.

## Contributing

1. Create feature branch: \`git checkout -b feature/feature-name\`
2. Follow code style: \`npm run lint --fix\`
3. Commit with messages: \`git commit -m "feat: description"\`
4. Push and create PR

## Technologies

- React 19.2, Vite 7
- Tailwind CSS 4 + DaisyUI 5.5
- Firebase (Auth, Firestore, Hosting)
- React Router 7, TanStack Query 5
- React Hook Form 7, Axios

## Support

For implementation help, refer to COPILOT_INSTRUCTIONS.md
\`\`\`

---

## Task 4: Setup Git Workflow

### 4.1 Create `.github/workflows/lint.yml`

Create `.github/workflows/lint.yml`:

```yaml
name: Lint

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
```

---

## Task 5: Add Initial Custom Hooks

Create `src/hooks/index.js`:

```javascript
export { useApi } from './useApi.js';
export { useLocalStorage } from './useLocalStorage.js';
export { useAuth } from './useAuth.js';
```

Create `src/hooks/useAuth.js`:

```javascript
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext.jsx';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
};
```

---

## Completion Checklist

### Week 1
- [ ] Create `.env.example` and `.env.local`
- [ ] Create `src/config/` directory with env.js, constants.js, index.js
- [ ] Create HTTP client with interceptors
- [ ] Create error handler utility
- [ ] Create data transformers
- [ ] Create custom hooks (useApi, useLocalStorage, useAuth)

### Week 2
- [ ] Create/update COPILOT_INSTRUCTIONS.md
- [ ] Create ACTION_PLAN.md
- [ ] Update README.md with project info
- [ ] Create GitHub Actions workflow
- [ ] Document all utilities in code comments
- [ ] Verify all linting passes (`npm run lint`)
- [ ] Test environment configuration works
- [ ] Test HTTP client with sample API call

---

## Testing Phase 1 Setup

### Verify Configuration
```javascript
// In browser console or test component
import { env } from './config/env.js';
console.log(env); // Should show all config values
```

### Test HTTP Client
```javascript
import httpClient from './utilities/httpClient.js';

// Should work if API is available
httpClient.get('/health').then(console.log).catch(console.error);
```

### Test Custom Hooks
```jsx
import { useAuth } from './hooks';

function TestComponent() {
  const { user } = useAuth();
  return <div>{user?.email}</div>;
}
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `env.js` not found | Ensure `src/config/` directory exists and is at correct path |
| Import errors | Check that all exports match import statements |
| HTTP 401 errors | Verify Firebase credentials in `.env.local` are correct |
| Linting errors | Run `npm run lint --fix` to auto-correct style issues |

---

## Next Steps

Once Phase 1 is complete:
1. Begin Phase 2: UI/UX Overhaul
2. Create global component library
3. Implement responsive design
4. Design and build dashboard layouts

---

**Created**: 2026-01-11
**Duration**: 2 weeks
**Priority**: Critical Path
