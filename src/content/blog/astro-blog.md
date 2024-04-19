---
title: 'Astro JS - the birth of the coders51 blog'
description: "Our company needed a blog, what better opportunity to experiment with Astro? Let's see how it was made and why we chose this SSG"
author: Andrea Junior Berselli
keywords: ["astro", "blog", "markdown", "SSG", "framework"]
pubDate: '03-25-2024 10:00'
updatedDate: '04-05-2024 12:00'
heroImage: 'astro-blog/hero.png'
timeRead: '18'
---

## What is Astro?

Astro is a popular static site generator (SSG) designed for those who want to create fast and lightweight content-rich sites.

It's particular interesting for developers thanks to its low learning curve and intuitive structure. Astro is also equipped with powerful tools that increase flexibility, for example programmers can work with their preferred frameworks together with it.

In a few words, Astro is a new kind of static site builder that delivers **lightning-fast performance with a modern developer experience**!

Here are some special features that make Astro stand out in a noticeable way:

- 🏝️ **Island architecture**: Astro can divide the UI into small and isolated elements. These elements are called *"Astro Islands"* and are incredibly powerful and flexible as they can be used on any page.
Build your site using React, Vue, Svelte, Solid, Preact or plain HTML and Javascript.
- 🙅🏻‍♂️ **No Javascript by default**: it's 100% static HTML, without Js. Astro renders your pages to static HTML removing all Js from your final build.
- ✨ **Component Js needed**: But if you need some Js? Astro can hydrate (automatically) interactive components when they become visible on the page. The magic happens when Astro never load something that user never see.
- 🛠️ **Featured**: Astro supports Ts, Scoped CSS, Css modules, Sass, Tailwind Css, Markdown, MDX, and so on...
- 🕸️ **SEO**: RSS feeds, sitemaps, paginations and collections.
- ✏️ **Content collections**: Organize, validate and provide TypeScript type-safety for Markdown contents.
- ⚔️ **SSG and SSR**: Astro is born as a static site generator, but now, this framework gives the option to adopt both the static site generation (SSG) and the server-side generation (SSR).
- 📦 **Edge-Ready**: Astro can be deployed anywhere, anytime.

## So, why Astro?

Personally, i think that the most interesting thing is how Astro has perfected the technique based on the [**island architecture**](https://docs.astro.build/en/concepts/islands/).

In other full-stack web frameworks this level of per-component optimization would be impossible without loading the entire page in JavaScript, delaying interactivity. In Astro, this kind of hydration (called partial or selective hydration) is built into the tool itself.

For example, Astro gives you some powerful modifiers like `:visible`, that automatically defer components to only load once they are visible on the page.

To answer the question, in a few words, like the Astro's guide say itself:

>Astro is the web framework for building content-driven websites like blogs, marketing, and e-commerce [...] If you need a website that loads fast and has great SEO, then Astro is for you.

### Performance Boost

A website built with Astro loads in a fraction of the time compared to traditional dynamic sites. It transforms your website into static HTML, CSS, and JavaScript files, ready to be served directly from a CDN or static file server. As a result, users enjoy faster page loading, leading to increased engagement and improved SEO rankings.

### UI - Flexible

The flexibility to incorporate components from different JavaScript frameworks like React, Vue, or Svelte within a single project. Reuse of existing code and integration with third-party tools can be incredible easy.

### For devs

Astro is dev-oriented! 🧑🏻‍💻

Thanks to the component-based approach, enhancing code reusability and maintainability. This method allows for a more intuitive and efficient development process. Creating a new page with Astro involves concise and consistent syntax, boosting developer productivity.

### Easy migration

You can migrate your existing app or website to Astro without rewrite entire new applications! If you have another app written with another framework you can gradually move to Astro without the standard development efforts but with an incredible faster transition.

### SEO Friendly

Search engines can easily crawl and index static HTML content. This improves your website's visibility in search engine results, generating more organic traffic. Astro automatically ensures that your content is easily accessible to search engine bots, resulting in higher rankings and greater discoverability.

### Great community

You can find tutorials, supports, blogs and a lot of other resources on the web.

## How to build a blog with Astro

My idea was to have a fast blog, ease to maintain, ease to custom, ease to update and ease to deploy on GitHub Pages.

Simply by creating a new Pull Request on GitHub, we can easily add a brand new post on our blog.

### Node.js

In order to run Astro on your system, you have to install Node.js, version `v18.14.1` or later.

Note: to check your current version on the terminal

```bash
node -v
```

### Setup Astro

Astro has its own setup wizard to follow:

```bash
# create a new project with npm
npm create astro@latest
```

I've follow these instructions to setup:

1. "Include sample files" template
2. using TypeScript
3. installed dependencies
4. init new git repo

If you use VS Code, I recommend to use the [Astro language support extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) to have syntax highlighting and autocomplentions for Astro code.

You are ready to start the dev server running this command:

```bash
npm run dev
```

Now you should see confirmation in the terminal that Astro is running in dev mode on `http://localhost:4321` 🚀 (by default, if `4321` port is available)

You can now edit your home page in `src/pages/index.astro` and check into the browser preview if the content of the page was updated.

Create a new repository on GitHub and commit your first changes.

### Astro's Structure

Before going into the deep, it's better to take a look at Astro's core file structure:

```text
├── dist/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   └── pages/
│       └── index.astro
├── astro.config.mjs
└── package.json
```

The structur looks pretty simple:

- `src/`: you can organize your project folders here, like components, layouts, pages.
- `public/`: it contains all the files that lives outside of the build process, like fonts, images and so on...
- `dist/`: it contains the content that you want to deploy on your prod server (available when you run `npm run build`).

#### Components

Components are reusable code available all over your website. An Astro component, by default, has the file extension `.astro` but as we already said before, we can create components in different languages like React, Svelte or Vue.

Inside `/src/components` you can see an example of a `Card` component, written in Astro:

```astro title="/src/components/Card.astro" showLineNumbers
---
interface Props {
  title: string;
  body: string;
  href: string;
}

const { href, title, body } = Astro.props;
---

<li class="link-card">
  <a href={href}>
    <h2>
      {title}
      <span>&rarr;</span>
    </h2>
    <p>
      {body}
    </p>
  </a>
</li>
<style>
...
</style>
```

#### Layouts

Layouts are components too, but works as code wrappers. Let's go to see the example in `/src/layouts`:

```astro title="/src/layouts/Layout.astro" showLineNumbers
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Astro description" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
<style is:global>
...
</style>
```

Remember the `<slot />` tag here, it will makes the trick.

```astro title="/src/pages/index.astro" showLineNumbers
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Welcome to Astro.">
  <main>
    ...
    <h1>Welcome to <span class="text-gradient">Astro</span></h1>
    <p class="instructions">
      To get started, open the directory <code>src/pages</code> in your project.<br />
      <strong>Code Challenge:</strong> Tweak the "Welcome to Astro" message above.
    </p>
    ...
  </main>
</Layout>
```

As you can see the `<slot />` tag was replaced by the HTML.
When you have to do with some global contents and designs, layouts components simplifying your lifes and comes to your rescue.

#### Pages

The last but not the least, pages are always components but special. They are responsible for routing, loading data and the template.

Astro adopt the file-based routing to generate pages, here some examples:

```text
src/pages/index.astro => blog.coders51.com
src/pages/first-blog.md => blog.coders51.com/first-blog
src/pages/a-page/subpage => blog.coders51.com/a-page/subpage
```

But Astro can also adopt the *dynamic routing* method.

You can instruct an Astro page file to automatically create multiple pages with the same structure, useful when you have to build the same page but for different data (e.g. user profiles).

The difference is that adopting the static output mode these pages are generated at build time and you need to create the list of "something" (in this case, blog's articles) who will receive a matching file.

Adopting the dynamic mode pages are generated on demand for any matching path. Let's see an example:

```text
src/pages/index.astro => blog.coders51.com
src/pages/[slug].astro => blog.coders51.com/first-blog
src/pages/[slug].astro => blog.coders51.com/second-blog
```

### Clean extra code

Due to we started from a template, maybe it's better to clean all the code we don't need anymore. Astro provide us an index with some Cards, a global style and so on, we can delete that code.

It's important to maintain almost this structure of directories:

```text
├── src/
│   ├── components/
│   ├── layouts/
│       └── Layout.astro
│   └── pages/
│       └── index.astro
```

Personally, I recommend to implement 3 different layout components.

1. a `Layout` that contains the `<html />` tag and something like some global script, header and footer.
2. a `BaseLayout` that contains only the things for basic pages, like the home page or the about page.
3. a `BlogPostLayout` that contains the html structure for each blog post.

### Content Collections

To manage your blog posts at the best, you can use the **Content Collection** available from the *version 2.0* of Astro.

Thanks to this powerful way to handle your posts, Collections help to organize your document, validate the YAML frontmatter and provide TypeScript type-safety for all your content.

This is the most significant part, in my opinion, because moving your blog posts to the special `src/content/` folder will allow you to use more powerful and performant APIs to generate your blog post index and display your individual blog posts. And, another important thing, you can create a **schema** to define the common structure of each of your posts.

You can read more in details about this on the [Astro Content Collection official guide](https://docs.astro.build/en/guides/content-collections/).

How you can start? First of all, create a `src/content` folder, and inside of it, an `src/content/blog` folder.

⚠️ *Only content collections are allowed inside the `src/content` directory. This directory cannot be used for anything else.*

#### Schema

You can define the schema as you wish, based on your preference and on what you want to include inside of your frontmatter on each blog post. You can create an `src/content/config.ts` like this:

```ts title="/src/content/config.ts" showLineNumbers
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
  })
});

export const collections = { blog };
```

As you can see Astro uses [Zod](https://github.com/colinhacks/zod) to power its content schemas.

#### Generate pages from collection

Now you're ready to put some contents inside your blog. For the moment, you can create two different files: `src/content/blog/first-post.md` and `src/content/blog/second-post.md`. You have to add inside of these two files the right frontmatter schema that you have defined before:

```text title="/src/content/blog/first-post.md"
---
title: 'First Post'
description: '...'
author: 'Andrea Junior Berselli'
pubDate: '03-25-2024'
---

## Heading 2
```

```text title="/src/content/blog/second-post.md"
---
title: 'Second Post'
description: '...'
author: 'Andrea Junior Berselli'
pubDate: '03-25-2024'
---

## Heading 2
```

Good to go, ready to generate dynamic pages from the collection 🚀

First of all, create a page file called `src/pages/[...slug].astro`. You need to create a responsible page for generating each blog post because now your `md | mdx` files are **inside a collection** and they are no longer automatically become pages with the Astro file-based routing method. Doing this you will create a dynamic route to generate HTML pages from your collection entries.

But here's the trick, you can **query the collection** to get the content from each `md | mdx` file and make it available on each page that it will be generated ✨

Let's see how this can be done:

- #### Building for static output

The right method for generating routes will depend on your **build output mode** that can be `static` or `server` (if you want a server-side rendering).

We chose the static one, we're building a static website. So, you have to use the `getStaticPaths()` function to create pages from a single `src/pages` component during your build.

- #### Querying collection

Astro provides `getCollection()` function to query a collection and return one or more content entries.
Accepts a string that must match the name of the folder within `/src/content/`. In our case is `blog`. Mapping the entries, you'll create your new URl paths using the **slug** property.

- #### Pass content as props (Type-Safety)

You can see that you can correctly type your component props with the `CollectionEntry` utility provided by `astro:content`. Also this utility takes a string argument that matches the name of your collection schema, and will inherit all of the properties of that collection’s schema.

- #### Render content as HTML

Once queried, you can **render Markdown or MDX entries to HTML** using the `render()` function property. Calling this function gives you access to rendered content and metadata, including a `<Content />` component.

Let's see the final code:

```astro title="src/pages/[...slug].astro" showLineNumbers
---
import { type CollectionEntry, getCollection } from "astro:content";
import BlogPost from "../layouts/BlogPost.astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({
    params: { slug: post.slug },
    props: post
  }));
}

type Props = CollectionEntry<"blog">;

const post = Astro.props;
const { Content } = await post.render();
---
```

You can render the `<Content />` component wrapped in a `<BlogPost />` specific layout for each blog post that you're going to write. It may be useful to create a layout capable of dynamically displaying all the common data to any blog post you are going to write (e.g. the title, date, author and so on... ). Passing the `post` as a prop you can have access of all of this data.

```astro title="/src/pages/[...slug].astro" {19,20,21} showLineNumbers
---
import { type CollectionEntry, getCollection } from "astro:content";
import BlogPost from "../layouts/BlogPost.astro";

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({
    params: { slug: post.slug },
    props: post
  }));
}

type Props = CollectionEntry<"blog">;

const post = Astro.props;
const { Content } = await post.render();
---

<BlogPost post={post}>
  <Content />
</BlogPost>
```

Now you are ready to write your content, just create Markdown or MDX files and put it inside the `/src/content/blog` folder. Astro takes care of the rest! 💪

### Blog list - Home page

In the home of your project, inside the `src/pages/index.astro`, you can therefore create a list of links that lead to the blogs you will make.

As you can see here below, you can get the `posts` using the `getCollection()` function. Here the result is ordered by the publication date, so you can understand how much handling of the data we can have available.

Mapping the `posts` array, each post provide us all the data that we expect like title, description, author and so on...

Clicking on a link, you should be able to go to the right URL that contains your Markdown or MDX post.

```astro title="src/pages/index.astro" showLineNumbers
---
import { getCollection } from "astro:content";
import FormattedDate from "../components/FormattedDate.astro";
import BaseLayout from "../layouts/BaseLayout.astro";
import Author from "src/components/Author.astro";
import { SITE_TITLE, SITE_DESCRIPTION } from "src/consts";

const posts = (await getCollection("blog")).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<BaseLayout>
  <main>
    <section>
      {
        posts.map(post => (
          <div>
            <a href={`/${post.slug}/`}>
              <h3>
                {post.data.title}
              </h3>
            </a>
            <p>
              {post.data.description}
            </p>
            <div>
              <FormattedDate date={post.data.pubDate} />
              <Author author={post.data.author} />
            </div>
          </div>
        ))
      }
    </section>
  </main>
</BaseLayout>
```

## SEO - Create a common head for meta tags

As we said before, Astro is **SEO-friendly**.

You have to take advantage of this and you can easily do. How? For example, creating a single common component to manage your meta tags.

Inside your `src/components` folder, create a new `BaseHead.astro` file (choose the name that you want, of course). The goal is to put this component inside your main layout in `src/layouts/Layout.astro`, into the `<head />` tag.

Assuming that we have added inside our `src/content/config.ts` a new property to define the hero image for each blog post.

```ts title="src/content/config.ts" {11} showLineNumbers
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
  })
});

export const collections = { blog };
```

Getting the props from an Astro page (in this case: `src/pages/[...slug].astro`, where we render each blog post), you can pass them to your new component.

```astro title="src/layouts/Layout.astro"
---
import BaseHead from "../components/BaseHead.astro";

const { title, description, heroImage, author } = Astro.props;
---

<html lang="en">
  <head>
    <BaseHead
      title={title}
      description={description}
      heroImage={heroImage}
      author={author}
    />
  </head>
  <body>
    ...
  </body>
</html>
```

Now, you can create dynamically the meta tag for your posts. For example, for the hero image:

```astro title="src/components/BaseHead.astro" {10,19} showLineNumbers
---
interface Props {
  title: string;
  description: string;
  author: string;
  heroImage?: string;
}

// the URL must be the path to the image inside your /public folder.
const heroImageURL = new URL(`posts/${heroImage}`, Astro.site);
---

<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
...
<!-- Open Graph / Facebook -->
...
<meta property="og:image" content={heroImageURL} />
...

<!-- Twitter -->
...
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={heroImageURL} />
<meta name="author" content={author} />
...
```

When you want to share your brand new post on X to your friend, you can make a great impression ✨

Here the final result for this post:

![Preview post](/posts/astro-blog/preview.png)

## Handling images

Inside the `/public` folder you can manage the images you want to use in your posts as you wish.
I strongly advise you to keep them organized so as not to create a single large pit where it will then be impossible to manage them in the future. You can create a subfolder called, for example, `/posts`

For each post, create a subfolder called the same as the file relating to your new post. Inside it, put the hero image and all the other images you want to use. For example, for this post I've created a `/public/posts/astro-blog` folder, which contains the hero image and some other files.

## Styling with TailwindCss

It has never been easier to install Tailwind in my entire life, just follow these simple steps suggested by the official [Tailwind guide](https://tailwindcss.com/docs/guides/astro). 💅

## Astro configuration

Let's see some Astro configuration inside the `/astro.config.mjs` file. Inside of it you can change the most of the configuration for your Astro app.

As you can see, the `integrations` part is handled easily. I've handled the dark toggle theme button with a React component, and for doing that I've to integrate React in Astro.

You can find more on how to install React on the [official guide](https://docs.astro.build/en/guides/integrations-guide/react/)

🚨 SPOILER: it's very very easy!

I've used `rehype-pretty-code` to magae the style of my markdown, in order to change the css and make beautify it for the lettors. You can findo more about it from these links:

- [Official guidelines for plugins](https://docs.astro.build/it/guides/markdown-content/#markdown-plugins)
- [Rehype pretty code guide](https://rehype-pretty.pages.dev)

```js title="/astro.config.mjs" showLineNumbers
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import rehypePrettyCode from "rehype-pretty-code";

const options = {
  keepBackground: false
};

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, options]]
  },
  site: "https://blog.coders51.com",
  integrations: [mdx(), sitemap(), tailwind(), react()],
  output: "static", // render website output static, change to "server" for SSR
  server: {
    host: true
  }
});
```

## Deploy on Github Pages

coming soon...

## Conclusions

I had to create a blog for the company I work for and I was very undecided about which framework to use initially, given the incredible vastness of possibilities that the web offers today. After experimenting with Astro, however, I was immediately struck by its intuitive and simple approach for a front end developer like me. It is easily maintainable and deployable, which makes it even more attractive.

🤝 **Astro is truly tailor-made for hosting a blog**.