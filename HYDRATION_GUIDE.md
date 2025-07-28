# Hydration Mismatch Guide

## What is Hydration?

Hydration is the process where React takes over the HTML rendered on the server and makes it interactive on the client. This is a key feature of Server-Side Rendering (SSR) in Next.js.

### The Process:
1. **Server**: Renders HTML with data
2. **Client**: React "hydrates" this HTML by attaching event listeners
3. **Problem**: When server HTML doesn't match client expectations → Hydration Mismatch

## Common Causes of Hydration Mismatches

### 1. Browser Extensions
- **Problem**: Extensions like ColorZilla add attributes (`cz-shortcut-listen="true"`)
- **Solution**: Use `suppressHydrationWarning={true}` on body element

### 2. Dynamic Content
- **Problem**: `Date.now()`, `Math.random()`, `Math.random()`
- **Solution**: Use `useEffect` to render dynamic content after hydration

### 3. Client/Server Differences
- **Problem**: `typeof window !== 'undefined'` checks
- **Solution**: Use `useState` + `useEffect` pattern

### 4. Date/Time Formatting
- **Problem**: Different locales between server and client
- **Solution**: Use consistent formatting or client-side only rendering

## Solutions Implemented

### 1. Body Element Suppression
```tsx
<body className="antialiased" suppressHydrationWarning={true}>
```

### 2. Improved HydrationProvider
```tsx
export function HydrationProvider({ children, fallback }: HydrationProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isHydrated && fallback) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
```

### 3. Viewport Configuration
```tsx
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};
```

## Best Practices

### 1. Use suppressHydrationWarning Sparingly
- Only use on elements that are modified by external factors (browser extensions)
- Don't use on elements with dynamic content you control

### 2. Handle Dynamic Content Properly
```tsx
function DynamicComponent() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return <div>{Date.now()}</div>;
}
```

### 3. Use Client Components When Needed
```tsx
'use client';

import { useEffect, useState } from 'react';

export function ClientOnlyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch data or perform client-side operations
  }, []);
  
  return <div>{/* Your component */}</div>;
}
```

## Testing Hydration Issues

### 1. Check Browser Console
- Look for hydration mismatch warnings
- Identify which elements are causing issues

### 2. Disable Browser Extensions
- Test in incognito mode
- Disable extensions one by one

### 3. Use React DevTools
- Check component tree for hydration issues
- Look for mismatched attributes

## Common Patterns

### Pattern 1: Conditional Rendering
```tsx
function ConditionalComponent() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient ? <ClientContent /> : <ServerContent />;
}
```

### Pattern 2: Dynamic Imports
```tsx
import dynamic from 'next/dynamic';

const ClientOnlyComponent = dynamic(() => import('./ClientComponent'), {
  ssr: false,
});
```

### Pattern 3: Hydration Provider
```tsx
<HydrationProvider fallback={<LoadingSpinner />}>
  <YourComponent />
</HydrationProvider>
```

## Debugging Tips

1. **Check the exact attribute causing the mismatch**
2. **Look for browser extensions in the stack trace**
3. **Use React DevTools Profiler**
4. **Test in different browsers**
5. **Check for timezone/locale differences**

## Resources

- [React Hydration Documentation](https://react.dev/link/hydration-mismatch)
- [Next.js SSR Documentation](https://nextjs.org/docs/app/building-your-application/rendering)
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 