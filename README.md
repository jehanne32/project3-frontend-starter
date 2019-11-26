Technologies used: HTML, CSS, JavaScript, React, SQL, Sequelize

User stories:

1. As a user I want to be able to find information about all of the major candidates in one place.

2. As a user I want to be able to compare the candidates positions on major issues in one place.

3. As a user I want to be able to see the candidate’s photos along with their names for easy recognition.

4. As a user, I want to be able find a brief synopsis of the important achievements in their political careers.

5. As a user I want to be able to get factual, unbiased information on the candidates and their positions.

6. As a user I want to be able to find links to all of the candidates web sites. 

7. As a user I want to be able to find out who has endorsed the candidates.

8. As a user I want to be able to find out information about the election process itself, for instance, when are the primaries?

9. As a user I want to be able to fact check the candidates claims against their stated positions on major issues. 

10. As a user I want to be able to have a candidate’s position on major issues explained in simple terms.

11. As a user I want an app that loads quickly, is easy to use and navigate and most of all, provides its information in an easy to read and understand format. 

12. As a user I want an app that is responsive so I can read it with the same ease on my desktop, laptop, tablet or phone, regardless of the screen size. 

13. As a user I want a brief summary of the candidate’s major accomplishments so I can have an idea of what they have done and how that would qualify them to be president.  

Our team wanted to create an app that showed all of the leading candidates for the 2020 presidential election. One of our main goals was to make an app that would show the major candidates, their names and photos together, their positions and what have they done recently in their careers that would reflect their qualifications for being president. Another of our ambitions with this project was to gather the information in one place, make it readily and easily accessible and also to objectively present that information in as clear and succinct a manner as possible. Through the concision of our presentation, we wished to provide the candidate’s information in as uncomplicated format as possible. We strove to achieve a lightweight, rapidly loading and easy to navigate app. 

As future goals, we would like to be able to expand the database of the candidate’s information. Additionally, we want to make it more responsive. Another goal would be to redesign the site’s appearance and make it look a little less basic. 





# ![GA Logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) 

# Project 3 Frontend Starter Code

#### Project 3 Starter Code Links

- [Node/Express Backend Starter App](https://git.generalassemb.ly/Interapt/project3-backend-starter)
- [React Frontend Starter App](https://git.generalassemb.ly/Interapt/project3-frontend-starter)

<br>

## Express Backend Set-up

#### To Install

- Fork and clone `https://git.generalassemb.ly/Interapt/project3-backend-starter`
- `cd` into the app and `npm install`
- From the command line run `createdb project3-backend-dev`
- Run `npm start`. 


#### Starter End Points

You have two starter endpoints:

- `GET` `api/users`
- `POST` `api/users`

- Your `config/config/json` is set-up to access the Heroku Postgres production database instance.

```js
{
  "development": {
    "database": "project3-backend-dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  }
}
```

- This app also has `cors` and `nodemon` installed.
- [Sequelize Cheatsheet](https://gist.github.com/vapurrmaid/a111bf3fc0224751cb2f76532aac2465)


#### Test the endpoints with Postman

![](https://i.imgur.com/MhV0c4U.png)

<br>

## React Frontend Set-up

#### To Install

- Fork and clone `https://git.generalassemb.ly/Interapt/project3-frontend-starter`
- `cd` into the app and `npm install`
- Run `npm start`. You should see this in the browser:

![](https://i.imgur.com/7CLkUI4.png)


#### Axios

The app has axios installed. You have one method called `getUsers` that hits your Express backend `api/users`. Check the browser console for the response.


<br>

# Heroku 

## Create Free Heroku Account

[Heroku Homepage](https://devcenter.heroku.com/)

![](https://i.imgur.com/hPAtUfN.png)

## Install the Heroku CLI

[Install Docs](https://devcenter.heroku.com/articles/heroku-cli)

[Heroku Node/Express Deployment Docs](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)


- Also syncing the Sequelize models so that the tables will automatically be created:

```js
var db = require('./models');
db.sequelize.sync();
```

<br>
## Connect Heroku DB to PG Admin

#### Heroku Stuff

- Right click on `Servers` and select Create > Server...

![](https://i.imgur.com/JWvG2Nz.png)

- On your Heroku App dashboard, click on Heroku Postgres

![](https://i.imgur.com/5l5Gq6s.png)

- On the next screen choose Settings, then View Database Credentials

![](https://i.imgur.com/iikLgfj.png)

#### Database URL

For security, we'll add the Heroku Postgres URL add heroku env variable to heroku dashboard

#### PG Admin Stuff

- In the `Name` field, enter the name of your database.

![](https://i.imgur.com/Lzp0zlC.png)

- In the `Connection` Tab:
	
	- `Hostname/Address` is your Heroku Postgres `Host`
	- `Maintenance Database` is your Heroku Postgres `Database`
	- `Username` is your Heroku Postgres `User`

![](https://i.imgur.com/hQQB2MM.png)


<br>

#### Connect to your production server Terminal

Run this command from your back end app folder: `heroku run bash`

From here you can run commands like `sequelize db:migrate` or `sequelize db:seed:all`

https://project3-backend-test.herokuapp.com/users

## Additional Resources


- [React Relative Paths](https://create-react-app.dev/docs/deployment#building-for-relative-paths)
