# TypeScript Guide for Meet AI Platform

## TypeScript Configuration for Next.js 15

### tsconfig.json Setup

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Core Type Definitions for Our Project

### 1. User and Authentication Types

```typescript
// types/auth.ts
export interface User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  subscription?: Subscription;
}

export interface Session {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}
```

### 2. AI Agent Types

```typescript
// types/agent.ts
export interface AgentConfig {
  name: string;
  personality: string;
  knowledgeBase: string[];
  responseStyle: "formal" | "casual" | "technical";
  voiceSettings: VoiceConfig;
  capabilities: AgentCapability[];
}

export interface VoiceConfig {
  voice: "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";
  speed: number; // 0.25 to 4.0
  pitch: number; // -20 to 20
}

export interface AgentCapability {
  type: "knowledge_base" | "web_search" | "code_execution" | "file_analysis";
  enabled: boolean;
  config?: Record<string, any>;
}

export interface Agent {
  id: string;
  userId: string;
  name: string;
  personality: string;
  knowledgeBase: string[];
  voiceSettings: VoiceConfig;
  capabilities: AgentCapability[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. Call and Meeting Types

```typescript
// types/call.ts
export interface CallSession {
  id: string;
  userId: string;
  agentId: string;
  streamCallId: string;
  status: "active" | "ended" | "failed";
  startedAt: Date;
  endedAt?: Date;
  durationSeconds?: number;
  recordingUrl?: string;
}

export interface CallParticipant {
  id: string;
  type: "user" | "agent";
  name: string;
  isConnected: boolean;
  isMuted: boolean;
  hasVideo: boolean;
}

export interface ChatMessage {
  id: string;
  callId: string;
  senderId: string;
  senderType: "user" | "agent";
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}
```

### 4. Transcription and Processing Types

```typescript
// types/transcript.ts
export interface Transcript {
  id: string;
  callId: string;
  content: string;
  summary?: string;
  keyPoints: string[];
  processedAt: Date;
  confidence: number;
}

export interface TranscriptSegment {
  speaker: "user" | "agent";
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

export interface MeetingSummary {
  id: string;
  callId: string;
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  sentiment: "positive" | "neutral" | "negative";
  topics: string[];
  generatedAt: Date;
}
```

### 5. Subscription and Billing Types

```typescript
// types/subscription.ts
export interface SubscriptionPlan {
  id: string;
  name: string;
  priceMonthly: number; // in cents
  callLimit?: number;
  storageLimitGb?: number;
  features: string[];
  isActive: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  polarSubscriptionId: string;
  status: "active" | "canceled" | "past_due" | "unpaid";
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
}

export interface UsageMetrics {
  callsThisMonth: number;
  minutesThisMonth: number;
  storageUsedGb: number;
  transcriptsGenerated: number;
}
```

## Advanced TypeScript Patterns

### 1. Generic API Response Types

```typescript
// types/api.ts
export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Usage example
export type GetAgentsResponse = APIResponse<Agent[]>;
export type CreateAgentResponse = APIResponse<Agent>;
```

### 2. Form Validation Types

```typescript
// types/forms.ts
import { z } from "zod";

export const AgentConfigSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  personality: z.string().min(10, "Personality description too short"),
  responseStyle: z.enum(["formal", "casual", "technical"]),
  voiceSettings: z.object({
    voice: z.enum(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]),
    speed: z.number().min(0.25).max(4.0),
    pitch: z.number().min(-20).max(20),
  }),
});

export type AgentConfigFormData = z.infer<typeof AgentConfigSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
```

### 3. Database Schema Types (Drizzle)

```typescript
// lib/db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  subscriptionId: uuid("subscription_id").references(() => subscriptions.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const agents = pgTable("agents", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  personality: text("personality").notNull(),
  knowledgeBase: jsonb("knowledge_base").default([]),
  voiceSettings: jsonb("voice_settings").notNull(),
  capabilities: jsonb("capabilities").default([]),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Infer types from schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;
```

### 4. tRPC Router Types

```typescript
// lib/trpc/routers/agent.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { AgentConfigSchema } from "@/types/forms";

export const agentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(AgentConfigSchema)
    .mutation(async ({ ctx, input }) => {
      const agent = await ctx.db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();

      return agent[0];
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(agents)
      .where(eq(agents.userId, ctx.session.user.id));
  }),

  get: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const agent = await ctx.db
        .select()
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.session.user.id))
        )
        .limit(1);

      if (!agent[0]) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found",
        });
      }

      return agent[0];
    }),
});
```

### 5. React Component Props Types

```typescript
// components/agent-card.tsx
import { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
  onEdit?: (agent: Agent) => void;
  onDelete?: (agentId: string) => void;
  className?: string;
}

export function AgentCard({
  agent,
  onEdit,
  onDelete,
  className,
}: AgentCardProps) {
  return (
    <div className={className}>
      <h3>{agent.name}</h3>
      <p>{agent.personality}</p>
      {onEdit && <button onClick={() => onEdit(agent)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(agent.id)}>Delete</button>}
    </div>
  );
}
```

## TypeScript Best Practices for This Project

### 1. Strict Type Checking

```typescript
// Enable strict mode in tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### 2. Utility Types

```typescript
// types/utils.ts
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Usage
export type CreateAgentRequest = Optional<
  Agent,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateAgentRequest = Partial<Omit<Agent, "id" | "userId">>;
```

### 3. Type Guards

```typescript
// lib/type-guards.ts
export function isAgent(obj: any): obj is Agent {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.personality === "string"
  );
}

export function isCallSession(obj: any): obj is CallSession {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    ["active", "ended", "failed"].includes(obj.status)
  );
}
```

### 4. Environment Variables

```typescript
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  OPENAI_API_KEY: z.string().min(1),
  STREAM_API_KEY: z.string().min(1),
  STREAM_SECRET: z.string().min(1),
  POLAR_ACCESS_TOKEN: z.string().min(1),
});

export const env = envSchema.parse(process.env);
```

## Learning Resources

### Official Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript with Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

### Advanced Topics

- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)

### Practice Exercises

1. Create type-safe API clients
2. Build form validation with Zod
3. Implement generic data fetching hooks
4. Practice with complex type transformations
