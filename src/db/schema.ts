import { pgTable, serial, text, timestamp, boolean, integer, json } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  date: timestamp('date').notNull(),
  venue: text('venue').notNull(),
  suburb: text('suburb').notNull(),
  eventType: text('event_type').notNull(),
  shortDescription: text('short_description'),
  longDescription: text('long_description'),
  lineup: json('lineup').$type<string[]>().default([]),
  yourKindUrl: text('your_kind_url'),
  ticketStatus: text('ticket_status').notNull().default('AVAILABLE'),
  coverImage: text('cover_image'),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull(),
  price: integer('price').notNull(),
  description: text('description'),
  sizes: json('sizes').$type<string[]>().default([]),
  stock: integer('stock').default(0),
  images: json('images').$type<string[]>().default([]),
  isFeatured: boolean('is_featured').default(false),
  isNew: boolean('is_new').default(false),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const gallery = pgTable('gallery', {
  id: serial('id').primaryKey(),
  cloudinaryUrl: text('cloudinary_url').notNull(),
  cloudinaryPublicId: text('cloudinary_public_id').notNull(),
  eventTag: text('event_tag'),
  eventDate: text('event_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  stripeSessionId: text('stripe_session_id').notNull().unique(),
  customerEmail: text('customer_email'),
  items: json('items').$type<{
    productId: number;
    name: string;
    qty: number;
    price: number;
    size?: string;
  }[]>(),
  totalAmount: integer('total_amount'),
  status: text('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Gallery = typeof gallery.$inferSelect;
export type NewGallery = typeof gallery.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
