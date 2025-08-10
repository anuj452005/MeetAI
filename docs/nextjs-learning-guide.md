# Next.js 15 Learning Guide for Meet AI Platform

## Core Concepts for This Project

### App Router (Next.js 13+)

- **File-based routing**: Pages are created by adding files to the `app` directory
- **Layout system**: Shared UI components across routes using `layout.tsx`
- **Server Components**: Default server-side rendering for better performance
- **Client Components**: Use `'use client'` directive for interactive components

### Key Features We'll Use

#### 1. Server Actions

```typescript
// app/actions/agent-actions.ts
"use server";

import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";

export async function createAgent(formData: FormData) {
  const name = formData.get("name") as string;
  const personality = formData.get("personality") as string;

  const newAgent = await db
    .insert(agents)
    .values({
      name,
      personality,
      userId: getCurrentUserId(),
    })
    .returning();

  return newAgent[0];
}
```

#### 2. Route Handlers (API Routes)

```typescript
// app/api/calls/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { agentId } = await request.json();
  // Handle call creation logic

  return NextResponse.json({ callId: "new-call-id" });
}
```

#### 3. Streaming and Suspense

```typescript
// app/dashboard/page.tsx
import { Suspense } from "react";
import { RecentCalls } from "@/components/recent-calls";
import { CallsSkeleton } from "@/components/skeletons";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<CallsSkeleton />}>
        <RecentCalls />
      </Suspense>
    </div>
  );
}
```

### Project Structure

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── agents/
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── new/
│   │       └── page.tsx
│   ├── calls/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── settings/
│       └── page.tsx
├── api/
│   ├── auth/
│   ├── agents/
│   ├── calls/
│   └── webhooks/
├── globals.css
└── layout.tsx
```

## Essential Next.js 15 Features

### 1. React 19 Integration

- **Server Components by default**: Better performance and SEO
- **Automatic batching**: Improved state updates
- **Concurrent features**: Better user experience with Suspense

### 2. Turbopack (Development)

- **Faster builds**: Significantly faster than Webpack in development
- **Hot reloading**: Instant updates during development

### 3. Partial Prerendering (PPR)

- **Hybrid rendering**: Static and dynamic content in the same page
- **Better performance**: Faster initial page loads

## Learning Resources

### Official Documentation

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

### Video Tutorials

- [Next.js 15 Complete Course](https://www.youtube.com/watch?v=wm5gMKuwSYk)
- [App Router Deep Dive](https://www.youtube.com/watch?v=gSSsZReIFRk)

### Practice Projects

1. Build a simple blog with App Router
2. Create a todo app with Server Actions
3. Implement authentication with NextAuth.js

## Common Patterns for Our Project

### 1. Protected Routes

```typescript
// app/(dashboard)/layout.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
```

### 2. Data Fetching

```typescript
// app/(dashboard)/agents/page.tsx
import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { getCurrentUserId } from "@/lib/auth";

async function getAgents() {
  const userId = await getCurrentUserId();
  return db.select().from(agents).where(eq(agents.userId, userId));
}

export default async function AgentsPage() {
  const userAgents = await getAgents();

  return (
    <div>
      <h1>Your AI Agents</h1>
      {userAgents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
```

### 3. Real-time Components

```typescript
// components/call-interface.tsx
"use client";

import { useEffect, useState } from "react";
import { StreamVideoClient } from "@stream-io/video-react-sdk";

export function CallInterface({ callId }: { callId: string }) {
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  useEffect(() => {
    // Initialize Stream Video client
    const initClient = async () => {
      const streamClient = new StreamVideoClient({
        apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
        user: { id: "user-id" },
        token: "user-token",
      });
      setClient(streamClient);
    };

    initClient();
  }, []);

  if (!client) return <div>Loading...</div>;

  return <div className="call-interface">{/* Stream Video components */}</div>;
}
```
