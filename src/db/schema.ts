import { pgTable, text, timestamp, jsonb, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Matches Clerk User ID
  email: text('email').notNull(),
  username: text('username').unique().notNull(), // This is the subdomain (e.g., 'asik')
  createdAt: timestamp('created_at').defaultNow(),
});

export const resumes = pgTable('resumes', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => users.id).notNull().unique(), // One resume per user for now
  data: jsonb('data').notNull(), // Stores the entire JSON Resume object
  updatedAt: timestamp('updated_at').defaultNow(),
});