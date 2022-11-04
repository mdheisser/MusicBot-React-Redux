# MusicBot Radio App

This is a single page web app built using Rails backend and react and redux frontend. Using spotify web API and widget player, this app gives user track recommendations based on a single user input, and adjust track recommendation based on user's most recent likss of existing song recommendations.

User can create profile and access her history of likes and connect with spotify to create her own playlist using tracks recommendations received from this app.

## Getting Started

Clone this repo to your local machine, and run
```
bundle install && rake db:migrate
```
Go to the client folder and run
```
npm nstall
```

### Prerequisites

Ruby, Rails, npm, node.


### Installing

First, delete or comment out .env.development file at the root directory.

Second, change Profile to be the same as Procfile.dev

Then run rake start and go to localhost:3000

## Deployment

This app is deployed with Heroku.

## Built With

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Rails](https://api.rubyonrails.org/)
* [React-Router](https://reacttraining.com/react-router/web/guides/quick-start)
