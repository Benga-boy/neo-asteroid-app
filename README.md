# Task -
1. Display a list of asteroids with fields of your choice. (10 items) - using *Neo - Browse*
2. Use the *Neo - Feed* api endpoint for creating a date component which takes start date and end date from the user. On selecting the dates you need to display a list of asteroids based on their closest approach date to Earth. (10 items in the list as per their closest approach)
3. Create a mechanism for searching a specific asteroid based on its ID.
4. Add user login/sign up and allow a user to save their favourite asteroids to their account

## Deployed project - 

## Tech Stack - React.js(hooks) and Firebase

## 3rd party Libraries - Bulma and CSS Animator

## Day one
* I Tested out all the api endpoints in Insomnia to make sure I was getting back the correct data and also to get familiar with the data.
* Create React app using the GA React template generator
* The next step is to fetch the data in Asteroids.js and console logging it the ensure I was getting back the correct data.
* To then complete task 1, displayed the the data in the UI using bulma cards. Also, add a feature that allows the to click on an Asteroid card, taking them to the single page for that Asteroid, displaying more info.
* Task 1 complete with added feature.
* To finish off on day one. Write the fuunction to fetch the data for Task 2 and Task 3, logging them unto the console. 

## Day two
* The function to fetch a list of Asteroids using a date range is in place in SearchAsteroids.js.
* Add in input tags for the start and end dates.
* Test out the the search search function to ensure it is coming back witht the correct data.
* Convert the data into an array so that it can be filtered through by closest date range, sorted by nearest date and sliced to return only the first 10.
* Add some styling to SearchAsteroids.js.
* Work on Task 3
* Function is in place to allow the user to be able to search by the the Asteroid Id
* Add Input tag to take user input and reuse html from single Asteroid to display the data
* Task 2 and 3 now complete

## Day three
* Work on task 4 - Starting with user signup and login, referring to previous firebase projects if needed
* Create user sign up function and test it out to ensure it works by checking in the firebase console
* Create a users collection in the firebase cloud firestore
* Add function that creates a record for that user that just signed up with name, email and array of favourite asteroids
* Once again test out to ensure it works as expected.
* Also create the user login function.
* User signup and login completed. Move on to creating function to allow user add an asteroid to their favourite asteroids array.
* Firstly check to make sure the user is logged in. If they are, set the logged in user to a user-state
* Create a function that searches for that users record in the collection of users then update the favAsteroids array. 
* Found userful resource that explains how to push a new item into an array in firebase without replacing the useful element. Link - https://fireship.io/lessons/firestore-array-queries-guide/

