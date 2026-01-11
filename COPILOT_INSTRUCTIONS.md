# eTutorBd Frontend - Copilot Instructions

## Quick Reference

### Tech Stack
- **React 19.2** + **Vite 7** (bundler)
- **Tailwind CSS 4** + **DaisyUI 5.5** (styling)
- **Firebase** (auth, Firestore, hosting)
- **TanStack Query 5** (data fetching)
- **React Router 7** (routing)
- **React Hook Form 7** (form management)
- **Axios** (HTTP client)

### Color Palette
- Primary: `#495bed` (Blue)
- Secondary: `#EDDB49` (Yellow)
- Accent: `#495bed` (Blue)

### Project Structure
```
src/
├── components/          # Reusable components (UI, Form, Home, Dashboard, Modal, Shared)
├── pages/              # Page components organized by feature
├── layouts/            # MainLayout, DashboardLayout
├── routes/             # Route definitions and guards (PrivateRoute, AdminRoute, StudentRoute, TutorRoute)
├── providers/          # AuthProvider, AuthContext
├── firebase/           # Firebase config
├── hooks/              # Custom React hooks
├── utilities/          # Helper functions
├── main.jsx            # Entry point
└── index.css           # Global styles
```

### Key Routes
- **Main**: `/` (Home), `/tuitions`, `/tutors`, `/contact`, `/login`, `/signup`
- **Dashboard**: `/dashboard/*` (statistics, profile, payment, manage tuitions/applications)
  - **Admin**: manage-users, manage-tuitions
  - **Student**: post-tuition, my-tuitions, ongoing-tutors
  - **Tutor**: my-applications, ongoing-tuitions

### User Roles
- **Admin**: Full platform control (user management, content moderation)
- **Student**: Post tuitions, manage applications, find tutors
- **Tutor**: Apply to tuitions, manage sessions, receive payments

---

## Development Patterns

### 1. Creating a Component
```jsx
import React from 'react';

export default function MyComponent({ title, children }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}
```

### 2. Using Auth Context
```jsx
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';

export function UserProfile() {
  const { user, loading, logOut } = useContext(AuthContext);
  
  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <div>Not authenticated</div>;
  
  return (
    <div>
      <h2>{user.email}</h2>
      <button className="btn btn-error" onClick={logOut}>Logout</button>
    </div>
  );
}
```

### 3. Fetching Data (TanStack Query)
```jsx
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

// Query (reading data)
function TuitionsList({ filters }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tuitions', filters],
    queryFn: () => axios.get('/tuitions', { params: filters })
      .then(res => res.data)
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.map(t => <div key={t.id}>{t.title}</div>)}</div>;
}

// Mutation (writing data)
function PostTuition() {
  const mutation = useMutation({
    mutationFn: (data) => axios.post('/tuitions', data),
    onSuccess: () => {
      toast.success('Tuition posted!');
      queryClient.invalidateQueries({ queryKey: ['tuitions'] });
    }
  });
  
  return <button onClick={() => mutation.mutate(formData)}>Post</button>;
}
```

### 4. Forms (React Hook Form)
```jsx
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  
  const onSubmit = async (data) => {
    try {
      // API call
      toast.success('Login successful!');
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email@example.com"
          className="input input-bordered"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <span className="text-error">{errors.email.message}</span>}
      </div>
      
      <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
        {isSubmitting ? <span className="loading loading-spinner"></span> : 'Login'}
      </button>
    </form>
  );
}
```

### 5. Route Protection
```jsx
// For private routes (all authenticated users)
<PrivateRoute>
  <Dashboard />
</PrivateRoute>

// For role-based routes
<AdminRoute>
  <ManageUsers />
</AdminRoute>

<StudentRoute>
  <PostTuition />
</StudentRoute>

<TutorRoute>
  <MyApplications />
</TutorRoute>
```

### 6. Notifications
```jsx
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

// Toast (non-blocking)
toast.success('Success!');
toast.error('Error occurred');
toast.loading('Processing...');

// Alert (blocking)
Swal.fire({
  title: 'Confirm',
  text: 'Are you sure?',
  icon: 'warning',
  confirmButtonText: 'Yes'
}).then(result => {
  if (result.isConfirmed) {
    // Do something
  }
});
```

### 7. Styling with DaisyUI
```jsx
// Buttons
<button className="btn">Default</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-outline">Outline</button>
<button className="btn btn-sm">Small</button>
<button className="btn btn-lg">Large</button>

// Cards
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Title</h2>
    <p>Content</p>
  </div>
</div>

// Badges
<div className="badge">Default</div>
<div className="badge badge-primary">Primary</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* cards */}
</div>
```

---

## Common Tasks

### Add a New Page
1. Create `src/pages/MyPage/MyPage.jsx`
2. Add route in `src/routes/Routes.jsx`:
   ```jsx
   { path: 'my-page', element: <MyPage /> }
   ```
3. Import and style using DaisyUI

### Add a New Component
1. Create `src/components/MyCategory/MyComponent.jsx`
2. Export as default
3. Use in pages with props

### Add API Endpoint
1. Create service function (or use axios directly)
2. Use with useQuery (GET) or useMutation (POST/PUT/DELETE)
3. Show loading/error states

### Add Role-Based Feature
1. Create page component
2. Wrap route with appropriate guard (AdminRoute, StudentRoute, TutorRoute)
3. Check user role in AuthContext if needed

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `TuitionCard.jsx`, `Dashboard.jsx` |
| Pages | PascalCase | `AllTuitions.jsx`, `UserProfile.jsx` |
| Functions | camelCase | `fetchTuitions()`, `handleSubmit()` |
| Files | PascalCase (components) or kebab-case (utils) | `utils/api-client.js` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL`, `MAX_RETRIES` |

---

## Scripts

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Check code quality
npm run lint --fix # Auto-fix linting issues
```

---

## Performance Tips

- Use React.lazy for route-level code splitting
- Memoize expensive computations with useMemo
- Use useCallback for stable function references
- Implement pagination for large lists
- Optimize images and use modern formats
- Run `npm run build` and check bundle size regularly

---

## Debugging

- **React DevTools**: Browser extension for component inspection
- **Network Tab**: Check API calls and responses
- **Console**: Watch for errors and warnings
- **Lighthouse**: Browser DevTools for performance audits
- **React Query DevTools**: Add `import { ReactQueryDevtools } from '@tanstack/react-query-devtools'`

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Auth not persisting | Check Firebase config is correct |
| Styles not applying | Clear browser cache, check Tailwind config |
| API calls fail | Check API_BASE_URL, auth headers |
| Component not re-rendering | Check useEffect dependencies |
| Forms not submitting | Verify form validation, check console for errors |

---

## Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [DaisyUI Components](https://daisyui.com)
- [React Router](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com)
- [Firebase Docs](https://firebase.google.com/docs)

---

**Last Updated**: 2026-01-11
**Version**: 1.0
