---
title: 'ENDU: Frontend Project setup - how to start working on it'
description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex fugit suscipit illum excepturi repellat vel, itaque nostrum debitis inventore veritatis recusandae, animi distinctio at voluptates ratione consequuntur minus voluptate eum!"
author: Andrea Junior Berselli
pubDate: '03-25-2024 10:00'
updatedDate: '04-05-2024 12:00'
heroImage: 'blog-placeholder-about.jpg'
timeRead: '3'
---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Getting Started

  

First, setup docker:

  

launch

```bash

postgres && sleep  2 && docker  exec  postgres  /bin/bash  -c  "createdb -U postgres ms_athlete_dev" && docker  exec  postgres  /bin/bash  -c  "createdb -U postgres ms_athlete_test"

```

  

and

```bash

docker  rm  -f  rabbitmq && docker  run  -d  --hostname  local-rabbitmq  --name  rabbitmq  -p  15672:15672  -p  5672:5672  rabbitmq:3-management

```

  

Second, run the backend server:

download the project `ms-athlete` and launch on it

  

```bash

npm  run  start

```

  

This should run on localhost:3000

  

in another terminal, run the seed

  

```bash

npm  run  seed

```

  

---

  

Third, run the development server for this project:

  

```bash

npm  run  dev

```

  

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

Set a valid `jwt` cookie on the Application in the browser to let the login works correctly.

  

You can start editing the page by modifying `app/[lang]/page.tsx`. The page auto-updates as you edit the file.

  

This project uses [`next/font/local`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load SourceSansPro.

## App structure

The project follow the structure of the new `app router` by NextJs --> [NextJs App Router](https://nextjs.org/docs/app/building-your-application/routing#the-app-router)

Under the `app` dir is specified a `[lang]` dir to handle the internationalization between italian and english languages.
Inside the `locales` folder there are two sub-folders: one for `en` and one for `it` containing the keys to provide text all around the entire app.

How to use inside a React component:

```jsx {3}
const { t } =  useTranslation('common')
...
<div>{t('somethingWentWrong')}</div>
```

"common.json" is the file where is defined the key: `somethingWentWrong`
To enable a specific translation file for an url, see the `i18n.js` file configuration. 

Everything is under the `app` folder and contains a `page.tsx` file is a route.
for example: `app/[lang]/profile/page.tsx` is the component that render on the `/it/profile` url.

Every `page.tsx` file can have a `layout.tsx` file aside. This file is used to give a generic layout to the page, is a sort of wrapper.

Each components or pages have a `xxx.test.tsx` file in order to have some unit test that guarantee the internal functionalities of the component.

The app use `vitest` to run tests, it's defined a `setup-test-env.tsx` where it can be found the standard setup/mocks for all the tests.

to run unit tests:
```bash
npm run test
```

Instead, to run e2e tests with Cypress:
```bash
npm run test:e2e

#or

npm run test:e2e:ui
```

## CSS

`tailwindcss` is the standard

Inside `globals.css` you can find some custom classes.
Inside the `tailwind.config.ts` it's possible to override or extends some tailwind rules and keywords.
Useful to set the entire color design system.

## GraphQL

There is a `graphql` folder with `mutation.graphql` and `schema.graphql`
Inside the mutation file you can find all the mutations used in the app
Inside the schema file you can find the shape of your available data, see the `codegen.ts` file to know how it's built

Inside some folders is possible to find some `query.graphql` file that it needs to define the relative query to use in that component/page

Follow [this link](https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/) to see how it's configured Apollo Server with Next Js

## Context

There is a `context` folder that contains some context component in order to share state between the entire app
(like the jwt token)

## Learn More

  

To learn more about Next.js, take a look at the following resources:

  

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

  

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
