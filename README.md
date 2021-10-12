# Getting Started with Weather App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This Weather App is a small project to get weather in search.
THis Weather App supports user search city.
![image](https://user-images.githubusercontent.com/12287251/136886904-a6b9fb2e-fb45-47dd-a01d-732caf2a8f28.png)

## Installation

Please see the appropriate guide for your environment for choice:
  - npx comes with npm 5.2+ and higher, see instructions for older npm versions.
  - docker (support to build image in docker) (optional).

## Get Started Immediately

In this Weather App, I have Frontend and Backend.
In the project directory, you can run:

### `npm dev`

![image](https://user-images.githubusercontent.com/12287251/136879992-dc562b6f-24d7-4a3a-88f0-36c0a63448c5.png)

This command will run Frontend and Backend.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Backend will run in  [http://localhost:8080](http://localhost:8080)

### `npm start`

Runs the Frontend app.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm server`

Runs the Backend.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
![image](https://user-images.githubusercontent.com/12287251/136881398-d912fe8d-4252-4122-999b-c1c560f41fa2.png)

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Docker
I have Dockerfile to support run it in Docker.

### `docker compose up`
I have docker-compose.yml to support run-container Docker applications.
With a single command, you create and start all the services from your configuration.

If you want run one by one service. I have Dockerfile for each service.
- Frontend: in directive folder weather-app.
- Backend: in api folder.
  

## What’s Included?

- React, JSX, ES6, TypeScript and Flow syntax support.
- ExpressJS, NodeJS.
- Dockerfile to support build in multi environment.

