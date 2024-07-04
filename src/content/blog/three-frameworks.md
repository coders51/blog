---
title: "3 Frontend's frameworks"
description: "A battle between three of the most trending frontend frameworks at the moment"
author: Davide Dall'Olio a.k.a. DDL
keywords: ["js", "frontend", "ts", "elixir", "angular", "svelte", "liveview"]
pubDate: "07-01-2024 10:00"
updatedDate: "07-01-2024 12:00"
heroImage: "three-frameworks/hero.webp"
timeRead: "3"
---

### Intro

Here in Italy, for a certain period of time, a cooking reality show called "4 Ristoranti" was broadcast on TV, hosted by Alessandro Borghese. In this reality show, 4 restaurateurs competed for "the best restaurant in town." In each episode, the 4 participating restaurateurs visited each other's restaurants and, at the end of a meal, rated the restaurant in 4 categories: the location, the menu, the service, and the bill. At the end of the round of visits, the restaurant with the highest score was proclaimed the best in town.

During the company frontend training workshop (attended by DDL and ABJ), we wanted to replicate this format by having 3 trending frontend frameworks/libraries "compete" against each other. However, the final goal was not to find the best framework but to create a "ranking" to assess how viable it might be to adopt and use a particular framework/library for development. To analyze the frameworks/libraries, we decided to take a time-box of about 1 month per framework/library and to use a proof of concept (POC) consisting of a login page, a list of items retrieved in real-time from a server via SSE, and the ability to filter/search items in the said list. The frameworks/libraries in play were Svelte, Angular, and LiveView. Obviously, since the 4 rating categories could not be applied in the same way, we reinvented them a bit, trying to stay fairly true to the original categories.

- <strong>Location</strong> was, for us, the first contact with the framework/library. Specifically, how the documentation was presented, how dev-friendly the project initialization was, and everything that could form a first impression when approaching the framework/library.
- <strong>Menu</strong> was what the framework/library had to offer us. Essentially, the built-in features provided by the framework/library.
- <strong>Service</strong> is referred to the entire ecosystem of "accessories" we found. Toolkits, CLI, community, VS Code plugins.
- <strong>Bill</strong> was related to how costly the learning curve and the realization of the POC were compared to what the framework/library offers.

Under each rating, there will be a brief comment from the author describing the reason for the rating.
Now that the rules of the game have been explained, let's start with the first contender: Svelte!

In this review, we won't dwell on syntax but will go straight to the ratings, explaining the reasons for the ratings and how they were assigned. If you are interested in delving into syntax, this site https://component-party.dev/ is an excellent resource to start with. Unfortunately, LiveView is not included as the site only deals with JS frameworks/libraries.

### Svelte <img class='w-8 !my-0 mr-2 float-left' src="/posts/three-frameworks/svelte.png"/>

Created by Rich Harris, it is a frontend framework born in 2016 from Reactive.js. Its particularity is that it does not use a Virtual DOM to add interactivity to web pages but directly manipulates the DOM, guaranteeing, according to them, very high performance. What struck us about Svelte is the simplicity with which you can start writing code and how concise the code is. To manipulate the state of a component/application, you just need to create variables and manipulate them, remembering to use the $ to make them reactive. Obviously, there is much more to it, but we were really impressed, coming from React, by how easy it is to develop a proof of concept without getting lost in state/effect management as happens with React. The documentation is very well written (https://svelte.dev/) and the framework they recommend using (SvelteKit - https://kit.svelte.dev/) is solid and adds those additional functionalities that the vanilla library does not include, such as routing.

### Svelte Ratings

![Svelte](/posts/three-frameworks/svelte-background.jpeg)

#### DDL

Location: <strong>9</strong>

The documentation and website are super clear and modern, immediately guiding you on what to do to "get your hands dirty." Project initialization is immediate, and you're up and ready in no time. The only downside is that they push you to use SvelteKit instead of Svelte because it's "more complete."

Menu: <strong>7</strong>

Having to analyze Svelte, and not the complete package with SvelteKit, for me the rating is 7 because, to develop an application, Svelte almost necessarily requires using SvelteKit to manage routing and all the more "structured" parts that are needed in almost all web applications today.

Service: <strong>8</strong>

As the community is growing very rapidly, it is becoming well established, and finding materials to learn the framework is easy. Moreover, the documentation is so well written and complete that you will hardly need to look for other resources. The VS Code plugins work well, and everything the framework offers (including SvelteKit) is simple to learn and apply.

Bill: <strong>10</strong>

It deserves the highest rating because it was really easy to start using it and hard to stop wanting to use it. I managed to create the POC quickly and without major issues. It was almost a shame to "get up from the table," and I wanted to keep working on it to delve even deeper into the already excellent experience.

Total: <strong>34</strong>

#### ABJ

Location: <strong>9</strong>

Menu: <strong>8</strong>

Service: <strong>9</strong>

Bill: <strong>10</strong>

Total: <strong>36</strong>

### Angular <img class='w-8 !my-0 mr-2 float-left' src="/posts/three-frameworks/angular.png"/>

Born first as Angular.js and later becoming Angular from version 2 onwards, it has been developed by Google since 2016. It is widely used in enterprise environments due to the presence of a CLI that structures the code in a "formal" way and because its syntax and code-writing style are very verbose and structured. This means we end up writing constructors, classes, and everything that closely resembles the backend JS environment. The documentation (https://angular.dev/) has been recently revised but remains very enterprise-focused with a lot of content. Its strengths include two-way data binding, which allows synchronizing data between the model and the view, and dependency injection, which allows managing and injecting dependencies into components and services, thus promoting modularity. The framework provides a built-in series of features, such as routing, so it is not necessary to write or search for libraries to manage the standard web development stack.

### Angular Ratings

![Angular](/posts/three-frameworks/angular-background.jpeg)

#### DDL

Location: <strong>5</strong>

Unfortunately, the volume of documentation was overwhelming. It was difficult to sit down and read all the documentation to understand how to get started with the project. Additionally, the site is not very user-friendly (although they have improved with version 18). The CLI is daunting at first because it's an additional step to learn, and seeing tons of files generated with each command is overwhelming. These are surely short-term "problems," but the purpose of this rating is to give an indication of how the framework presents itself at first contact and how "intimidating" it is at first access.

Menu: <strong>9</strong>

The menu is extensive; it truly has everything. From routing to state management, you really don't need anything else, and it covers all the needs a developer might have in creating a web app (perhaps even too much).

Service: <strong>8</strong>

The CLI, once you get past the initial "problem" of figuring out which commands to use to create components, is useful and helps keep the project structured, allowing, if working with multiple people, to have a "strict" structure on where and how to do things. I understand why many enterprise-level companies appreciate Angular for this strength. Having been around for a while, the community is well-established, although one must be careful when searching for resources because, having evolved from AngularJS which is very different, you might come across documentation/StackOverflow posts related to the old framework that can mislead you.

Bill: <strong>4</strong>

Unfortunately, the downside is that the learning curve is steep, and the framework is very verbose/tedious. Writing everything in classes/object-oriented style is very appreciated by those accustomed to that world, but coming from React, I struggled a lot. The extensive documentation doesn't help, and many times I found myself having to search multiple resources online to do even the most basic things. Surely, in the long run, the rating would improve as the learning curve levels out, but just like a meal at a restaurant, the dishes were extremely expensive and not even that elaborate. With more in-depth study and more time, I might have reached at least a 6, but given the time we had, I often found myself wanting to say "that's enough for me," and I will likely be reluctant to return to that "restaurant."

Total: <strong>26</strong>

#### ABJ

Location: <strong>3</strong>

Menu: <strong>7</strong>

Service: <strong>6</strong>

Bill: <strong>4</strong>

Total: <strong>20</strong>

### LiveView <img class='w-10 !m-0 mr-2 float-left' src="/posts/three-frameworks/liveview.png"/>

It originated as a feature of Phoenix, a well-known framework written in Elixir, comparable to Express in the JavaScript world, and reached maturity at the beginning of 2024. It allows for creating real-time user experiences through server-rendered HTML sent to the browser via WebSocket. Its uniqueness, besides being written in Elixir, lies in shifting much of the development to the server side, as all interactive functionalities are managed on the Elixir side rather than in the client browser. This brings backend development much closer to frontend development (and vice versa). (https://hexdocs.pm/phoenix_live_view/1.0.0-rc.6/Phoenix.LiveView.html)

### LiveView Ratings

![LiveView](/posts/three-frameworks/liveview-background.jpeg)

#### DDL

Location: <strong>9</strong>

The documentation and website are super clear and modern, immediately guiding you on what to do to "get your hands dirty." Project initialization is immediate, and you're up and ready in no time. The only downside is that they push you to use SvelteKit instead of Svelte because it's "more complete."

Menu: <strong>7</strong>

Having to analyze Svelte, and not the complete package with SvelteKit, for me the rating is 7 because, to develop an application, Svelte almost necessarily requires using SvelteKit to manage routing and all the more "structured" parts that are needed in almost all web applications today.

Service: <strong>8</strong>

As the community is growing very rapidly, it is becoming well established, and finding materials to learn the framework is easy. Moreover, the documentation is so well written and complete that you will hardly need to look for other resources. The VS Code plugins work well, and everything the framework offers (including SvelteKit) is simple to learn and apply.

Bill: <strong>10</strong>

It deserves the highest rating because it was really easy to start using it and hard to stop wanting to use it. I managed to create the POC quickly and without major issues. It was almost a shame to "get up from the table," and I wanted to keep working on it to delve even deeper into the already excellent experience.

Total: <strong>34</strong>

#### ABJ

Location: <strong>7</strong>

Menu: <strong>8</strong>

Service: <strong>6</strong>

Bill: <strong>8</strong>

Total: <strong>29</strong>

### Final results

Thus, we come to the end of this journey that saw the contenders compete in various categories. Below is the ranking:

#### DDL

1. Svelte - 34 points
2. LiveView - 30 points
3. Angular - 26 points

#### ABJ

1. Svelte - 36 points
2. LiveView - 29 points
3. Angular - 20 points

The winner is:

<h2>Svelte!</h2>
