import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    timeRead: z.string().optional(),
    keywords: z.array(z.string()),
    draft: z.boolean().optional().default(false)
  })
});

export const collections = { blog };
