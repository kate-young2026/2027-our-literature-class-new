import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const revisions = sqliteTable('lesson_revisions', {
 id: integer('id').primaryKey({autoIncrement:true}), lessonId: integer('lesson_id').notNull(),
 content: text('content').notNull(), status: text('status').notNull().default('draft'),
 createdAt: text('created_at').notNull(),
});
