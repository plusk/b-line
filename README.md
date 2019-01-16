# B-Line

Prototype bus route application for [WebInt 2018Fall](http://www.eurecom.fr/en/course/WebInt-2018Fall) at EURECOM

Our group consists of:

- [Ina Rekk Bjørnestad](https://github.com/iinus)
- [Hannah Miklin](https://github.com/hffmiklin)
- [Anders Larsen](https://github.com/sardred)

## Getting started

`git clone git@github.com:sardred/b-line.git` to clone the repository with Git. Here's a [guide](https://help.github.com/articles/connecting-to-github-with-ssh/) to connecting with SSH

`cd b-line` navigate to the freshly cloned repository

`npm install` install dependencies with npm

`npm start` start the dev server

You are now ready to develop! The server is available at `localhost:8080` in your browser, with hot reloading and everything!

For map routing, you need to get a [Mapbox API key](https://www.mapbox.com/signup/). It's limited to a couple of thousand requests per day. When you have your key, make a file named `.env.local` at the root of the project, then add the following line to the file: `VUE_APP_API_KEY="INSERT YOUR KEY HERE"`
Also make sure your add block is not on for this page. 

If desired, `npm run lint` will lint and fix files

## Project structure

```none
*root*
|
├── */src/*
│   ├── */assets/* where images are stored
│   ├── */components/* jsx components
│   |   ├── *App.jsx* main layout
│   |   ├── *App.scss* main layout styling
│   |   ├── */Home/* example component
│   |   |   ├── *Home.jsx* component definition
│   |   |   └── *Home.scss* component styling
│   ├── *Routes.jsx* front-end routes (add a Route for each new page)
│   ├── *index.html* entry point (no changes needed)
│   ├── *index.jsx* javascript entry point (no changes needed)
│   └── *global.scss* styling for the application as a whole
├── *package.json* the whole package.json with every dependency and script, nothing is kept hidden
├── *.eslintrc* eslint config
├── *.babelrc* babel config (polyfills)
├── *webpack.config.js* webpack config, it has a dev and prod environment
└── *README.md* this file
```

## Linting

This project follows the [AirBnB Javascript](https://github.com/airbnb/javascript) style guide. Check your favorite editor for a plugin or extension for ESLint.

## Credit

Credits to [Kornil](https://github.com/Kornil) for [simple-react-app](https://github.com/Kornil/simple-react-app) so we didn't have to spend hours setting up webpack for a nice development environment. We've modified the structure from there to make it even simpler.

As noted in `reset.scss`, credits to Eric Meyer for [reset-styling](http://meyerweb.com/eric/tools/css/reset/) for the sake of reducing browser differences.

Logo made by [Jamshid Xoliqulov](https://thenounproject.com/x.jamshid/) under Creative Commons

Icons made by Freepik from www.flaticon.com
