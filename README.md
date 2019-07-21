# THAT

THAT Conference Monorepo

## Welcome to _Building a Full Stack Web App_!

Today we are going to build a Single Page Application (SPA) using NextJS. Our application is inspired by THAT Conference and will involve a speakers, schedule, and about page in addition to a GraphQL API. NextJS will allow us to build a performant application out-of-the-box by utiliziing code splitting and server-side rendering.

### Getting Started

Our first step is to setup our development environment and perform a systems check. Please execute the following commands from your terminal:

```
$ node -v
v12.5.0
```

```
$ npm -v
6.9.0
```

Once you have confirmed that your environment is ready, you are ready to setup your application by installing dependencies and starting your application:

```
$ npm install
```

```
$ now dev
```

We will be test-driving our project using Cypress. Our final systems check will be to open Cypress and ensure the sample tests are passing:

```
npm run cypress:open
```

### About

Visitors to our application will need to know who we are and how we can help. Our first feature will be an "About" page.

Here is copy for you to use on your "About" page:

```
THAT Conference

We're glad you're here! Please contact us if we can be of assistance:

matt@headway.io
tim@headway.io
```

### Layout

Our next goal will be to create a consistent layout between pages within our application. Additionally, navigating between pages within our application will require a navigation bar.

We can accomplish this with a shared layout component and header component.
