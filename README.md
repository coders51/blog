# 🛠️ Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
│   ├── assets/
│   ├── fonts/
│   ├── posts/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── utils/
├── astro.config.mjs
├── README.md
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

Astro looks for `.astro` or `.md|.mdx` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema (defined in `src/content/config.ts`). See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `/public/assets` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 How to add a new post

Follow these `supa-easy` steps to add a brand new post!

First of all, clone this repo in your local machine and create a new branch from `main`.

We can follow this convention to call our brand new branches: `post/my-new-post`, where `my-new-post` should be a sort of an **unique** "id".

1. Create a new `.md|.mdx` file inside `src/content/blog` directory. In our case: `my-new-post.md`
2. As a convention, create a folder inside `/public/posts` called the same as the `.md|mdx` file you've just created. In our example, we'll create `/public/posts/my-new-post` folder. Here we can paste all the images that we need to put in our new blog post. Is important to follow this step in order to keep the files structure clean ✨
3. Now you can start writing your post, but first, let's build our frontmatter attributes in order to specify some info about the new post. Here is an example to follow, these are the first lines of your blog post:

```js
---
title: 'My New Post!'
description: 'a description of your post...'
author: 'Rick Sanchez Prime'
pubDate: '04-12-2024 10:00' // MM-DD-YYYY HH:MM
updatedDate: '04-05-2024 12:00' // MM-DD-YYYY HH:MM (optional)
heroImage: 'my-new-post/hero.jpg' // (optional)
timeRead: '3' // minutes (optional)
---
```

4. You are ready to start writing your post using `md|mdx` language under these lines 🤙🏻
5. When you have done, you should have some changes to commit:

    - a new `.md|mdx` file inside `src/content/blog`
    - a new folder ( called the same as your new `.md` file ) inside `/public/posts` containing all the images that you've put in your post.

6. Commit your changes, leave a *wonderful* message like `post: my-new-post added to the blog`
7. Push your commit and open a new **Pull Request** to the `main` branch. Please add [abjunior92](https://github.com/abjunior92) as a reviewer and waiting his approval for merging.

## ✏️ Markdown Extension for VSCode

In order to write markdown at the best, I suggest to install in your vscode this extension:

Name: markdownlint

Description: Markdown linting and style checking for Visual Studio Code

Publisher: David Anson

VS Marketplace Link: <https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint>
