import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    sourceUrl: z.string().url(),
    tags: z.array(z.string()).default([]),
    summary: z.string(),
    memeImage: z.string().optional(),
    memeCaption: z.string().optional(),
  }),
});

export const collections = { posts };
