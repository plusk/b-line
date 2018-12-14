# B-Line

Prototype bus route application for [WebInt 2018Fall](http://www.eurecom.fr/en/course/WebInt-2018Fall) at EURECOM

Our group consists of:

- [Ina Rekk Bjørnestad](https://github.com/iinus)
- [Hannah Miklin](https://github.com/hffmiklin)
- [Anders Larsen](https://github.com/sardred)

## Getting started

`git clone git@github.com:sardred/b-line.git` to clone the repository with Git. Here's a [guide](https://help.github.com/articles/connecting-to-github-with-ssh/) to connecting with SSH

`cd b-line` navigate to the freshly clones repository

`npm install` install dependencies with npm

`npm start` start the dev server

You are now ready to develop! The server is available at `localhost:3000` in your browser, with hot reloading and everything!

## Project structure

```none
*root*
|
├── */src/*
│   ├── */assets/* where images are stored
│   ├── */components/* jsx components
│   ├── *App.jsx* main layout
│   ├── *Routes.jsx* front-end routes
│   ├── *index.html* entry point
│   ├── *index.jsx* javascript entry point
│   └── *style.scss* styling
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
