import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()),
  devToUrl: z.string().url(),
  coverImage: z.string().url().optional(),
});

const articulos = defineCollection({
  type: 'content',
  schema: articleSchema,
});

const articulosEn = defineCollection({
  type: 'content',
  schema: articleSchema,
});

export const collections = { articulos, articulosEn };
