Replace Client ID and client secret in .env of frontend/api folder
### Brief
1. Create a web app which enables a user to view his github profile details after authorizing the Github application the user has created.
2. Create a page where the user can see his public and private repositories, filter and sort them.
## Requirements
### * Make sure your repository is private and add us as collaborators. You can invite us using the following usernames: rbagrin, elgutierrez
### ** Please don't push any changes to your main branch. Checkout a new branch and push your changes on that branch, then open a Pull Request. 
* Create the Github OAuth application.
* Create a start page with a form containing a button which will be used to initiate the Github OAuth flow.
* On clicking the button you should start the OAuth flow and be redirected to the Github Authorization page.
* After the user accepts the Authorization, store the credentials so you can use the Github API.
* Using the credentials call the Github API to get the needed information and list it on the /results page of the application.
* Use the .env file to store the Github Client Id and Client Secret.
#### * Listing user's repositories is required (Preferably both Public and Private repositories)
### Needed information
* Authenticated user's login, id, link to user's github page (on click redirect to the user's profile) and email (if available - email is available if listed as public on github page).
* login, id, link to user's github page and email of the octocat user.

### The tech stack
#### Frontend
* React
* Tailwindcss

#### Backend
* Node JS 15.7.0
* Express framework

#### Database
* sqlite3

## Run locally

Clone the repository. Then from 2 different terminals set up the backend and the frontend of the app.
### Compile the web-api:
```
$ cd api
$ npm install
$ ./node_modules/.bin/sequelize-cli db:migrate
$ ./node_modules/.bin/sequelize-cli db:seed:all
$ npm run dev
```
### Compile the web-app:
```
$ cd frontend
$ npm install
$ npm start
```
You should be able to access the app inside the browser using ```localhost:3000```.
The web api should be running on port ```5000```.
If everything went as expected, on the homepage of the app you should see the ```Hello World from API!```.
You also can access `/debug` from the browser to see a list with the users and the credentials that are now stored in the database.


## Quick tips
* Use the existent credentials table to save the credentials.
* You don't need to implement user authetication and you don't need to save multiple records of credentials for different users, just save the credentials once (use the exitent github credentials record). 
* The focus should be on implementing the OAuth flow and querying the asked information using the Github API.
* There are no limitations on how the app should work as long as you get the asked information using the Github API. Feel free to change the databse structure or to add new features if you need to.

## Wireframe
![alt text](/Wireframe.png)
