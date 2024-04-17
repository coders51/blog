---
title: 'Astro JS - the birth of the coders51 blog'
description: "Our company needed a blog, what better opportunity to experiment with Astro? Let's see how it was made and why we chose this SSG"
author: Andrea Junior Berselli
keywords: ["astro", "blog", "markdown"]
pubDate: '03-25-2024 10:00'
updatedDate: '04-05-2024 12:00'
heroImage: 'astro-blog/hero.png'
timeRead: '3'
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

1. "Empty" template
2. using TypeScript
3. installed dependencies
4. init new git repo

If you use VS Code, I recommend to use the [Astro language support extension](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) to have syntax highlighting and autocomplentions for Astro code.

You are ready to start the dev server, running this command:

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
- `dist/`: it contains the content that you want to deploy on your prod server.

#### Components

Components are reusable code available all over your website. An Astro component, by default, has the file extension `.astro` but as we already said before, we can create components in different languages like React, Svelte or Vue.

Here an example of a `Author` component, written in Astro:

```astro
---
interface Props {
  author: string;
}

const { author } = Astro.props;
---

<i class="text-sm">{author}</i>

```

#### Layouts

Layouts are components too, but works as code wrappers. Let's try to see an example:

```astro
---
// src/layouts/BaseLayout.astro
const { pageTitle = 'Hello world' } = Astro.props
---

<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>{pageTitle}</title>
  </head>
  <body>
    <main>
      <slot />
    </main>
  </body>
</html>
```

Remember the `<slot />` tag here, it will makes the trick.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Hello world">
  <div>
    <p>Some text...</p>
  </div>
</BaseLayout>
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

coming soon...