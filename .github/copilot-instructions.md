# GitHub Copilot Instructions

## Routing and Navigation

### Use Link for Internal Navigation

Always use `Link` from react-router for internal navigation. Avoid raw `<a>` tags.

```tsx
// Good
import { Link } from '@remix-run/react'
<Link to="/settings/profile">Profile</Link>

// Bad
<a href="/settings/profile">Profile</a>
```

### Use NavLink for Navigation with Active States

Use `NavLink` when you need active state styling:

```tsx
<NavLink
  to="/settings"
  className={({ isActive }) => (isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900')}
>
  Settings
</NavLink>
```

## Forms and Data Mutations

### Use Form Component for Data Mutations

Always use Remix's `Form` component for data mutations:

```tsx
import { Form } from '@remix-run/react'

// Good
<Form method="post">
  <input type="text" name="title" />
  <button type="submit">Save</button>
</Form>

// Bad
<form onSubmit={handleSubmit}>
  <input type="text" onChange={handleChange} />
  <button>Save</button>
</form>
```

### Use useFetcher for Non-Navigation Mutations

When you need to mutate data without navigation, use `useFetcher`:

```tsx
const fetcher = useFetcher()

// For optimistic UI
<fetcher.Form method="post">
  <button
    disabled={fetcher.state !== 'idle'}
    className={fetcher.state !== 'idle' ? 'opacity-50' : ''}
  >
    {fetcher.state !== 'idle' ? 'Saving...' : 'Save'}
  </button>
</fetcher.Form>
```

## Data Loading

### Use loader for Data Fetching

Handle data loading in loader functions:

```tsx
// route.tsx
export async function loader({ request, params }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  })
  return json({ user })
}

// Use in component
export default function UserProfile() {
  const { user } = useLoaderData<typeof loader>()
  return <div>{user.name}</div>
}
```

## Error Handling

### Use Error Boundary Pattern

Implement error boundaries for route error handling:

```tsx
export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1>Error {error.status}</h1>
          <p>{error.data.message}</p>
        </div>
      </div>
    )
  }

  return <GenericError />
}
```

## Styling

### Use Tailwind CSS Classes

Follow Tailwind's utility-first approach:

```tsx
// Good
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
  <img className="w-10 h-10 rounded-full" src={avatar} alt={name} />
  <span className="text-gray-900 font-medium">{name}</span>
</div>

// Bad
<div style={{ display: 'flex', padding: '1rem' }}>
  <img style={{ width: '2.5rem', borderRadius: '50%' }} src={avatar} />
  <span style={{ color: '#111' }}>{name}</span>
</div>
```

### Use shadcn/ui Components

When using shadcn/ui components, import from @/components/ui:

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

;<Button variant="outline" size="sm">
  Click me
</Button>
```

## Authentication and Authorization

### Use Auth Helpers

Use built-in auth helpers for user authentication:

```tsx
export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request)
  // ... rest of the loader
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request)
  // ... handle action
}
```

## Type Safety

### Use Zod for Schema Validation

Use Zod for form and data validation:

```tsx
const SchemaObject = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const result = await SchemaObject.safeParseAsync(Object.fromEntries(formData))

  if (!result.success) {
    return json({ errors: result.error.flatten() }, { status: 400 })
  }
  // ... handle valid data
}
```

## Session Handling

### Use Session Storage Pattern

Handle sessions using the session storage pattern:

```tsx
export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  session.set('key', value)

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  )
}
```

## Database Operations

### Use Prisma for Database Access

Always use Prisma client for database operations:

```tsx
// Good
const user = await prisma.user.findUnique({
  where: { id: userId },
  select: { id: true, email: true },
})

// Bad
const user = await db.query('SELECT id, email FROM users WHERE id = ?', [userId])
```

## Testing

### Write E2E Tests with Playwright

Write end-to-end tests using Playwright:

```tsx
test('users can update their profile', async ({ page, login }) => {
  const user = await login()
  await page.goto('/settings/profile')

  await page.getByRole('textbox', { name: /name/i }).fill('New Name')
  await page.getByRole('button', { name: /save/i }).click()

  await expect(page.getByText('Profile updated')).toBeVisible()
})
```

## Performance

### Use Prefetch for Navigation

Implement prefetch on important navigation links:

```tsx
<Link to={`/users/${user.id}`} prefetch="intent">
  View Profile
</Link>
```

### Use Resource Routes

Use resource routes for data endpoints:

```tsx
// app/routes/resources.notes.$noteId.tsx
export async function loader({ params }: LoaderFunctionArgs) {
  const note = await getNoteById(params.noteId)
  return json(note)
}
```

## File Organization

### Follow Route Convention

Follow the flat-routes convention for file organization:

```
routes/
  _app/
    root.tsx
  _auth+/
    login.tsx
    signup.tsx
  settings+/
    profile.tsx
    security.tsx
  resources+/
    search.tsx
```

## Accessibility

### Follow A11y Best Practices

Always include proper ARIA attributes and roles:

```tsx
<button type="button" aria-label="Close modal" aria-expanded={isOpen} onClick={onClose}>
  <span className="sr-only">Close</span>
  <XIcon className="h-6 w-6" />
</button>
```

## Context

### Create Context with Utils Pattern

Implement context with a utils hook pattern for complex state management:

```tsx
// Context definition
const MyContext = createContext<ReturnType<typeof useMyUtils> | undefined>(undefined)

// Utils hook
function useMyUtils() {
  const fetcher = useFetcher()
  const remixFormMethods = useRemixForm()
  // ... other state management

  return {
    fetcher,
    remixFormMethods,
    // ... other utilities
  }
}

// Provider component
const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const utils = useMyUtils()
  return <MyContext.Provider value={utils}>{children}</MyContext.Provider>
}
```

### Use Context Consumer Hook

Create a typed consumer hook with error boundary:

```tsx
export const useMyContext = () => {
  const context = useContext(MyContext)
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider')
  }
  return context
}
```

### Implement HOC Pattern

Use HOC pattern for component wrapping:

```tsx
export const withMyContext = <P extends object>(Component: React.ComponentType<P>) => {
  return function WithMyContext(props: P) {
    return (
      <MyProvider>
        <Component {...props} />
      </MyProvider>
    )
  }
}

// Usage
export const MyWrappedComponent = withMyContext(MyComponent)
```
