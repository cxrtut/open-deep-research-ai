CREATE TYPE "public"."status" AS ENUM('questions', 'pending', 'processing', 'completed');--> statement-breakpoint
CREATE TABLE "chats" (
	"id" varchar PRIMARY KEY NOT NULL,
	"clerkUserId" varchar,
	"initialUserMessage" varchar NOT NULL,
	"questions" jsonb,
	"answers" jsonb,
	"researchTopic" varchar,
	"researchStartedAt" timestamp,
	"status" "status" DEFAULT 'questions' NOT NULL,
	"title" varchar,
	"report" varchar,
	"completedAt" timestamp,
	"coverUrl" varchar,
	"sources" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
