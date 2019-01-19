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

## Credit

As noted in `reset.scss`, credits to Eric Meyer for [reset-styling](http://meyerweb.com/eric/tools/css/reset/) for the sake of reducing browser differences.

Logo made by [Jamshid Xoliqulov](https://thenounproject.com/x.jamshid/) under Creative Commons

Icons made by Freepik from [Flaticon](www.flaticon.com)

Credits to [Kornil](https://github.com/Kornil) for [simple-react-app](https://github.com/Kornil/simple-react-app) that was initially used, but later replaced by the Vue CLI.
