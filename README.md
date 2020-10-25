# OBJECTIVES -
1. Display a list of asteroids with fields of your choice
2. Create a date component which takes start date and end date from the user. On selecting the dates you need to display a list of asteroids based on their closest approach date to Earth.
3. Allow a user to search for a single asteroid by its ID.
4. Add user login/sign up and allow a user to save their favourite asteroids to their account. I will be using Google Firebase for this

## Deployed project - https://neo-interview-assessment.web.app/


## Tech Stack - React.js(hooks) and Firebase

## 3rd party Libraries - Bulma and CSS Animator

## Day one
* I Tested out all the api endpoints in Insomnia to make sure I was getting back the correct data and also to get familiar with the data.
* Create React app using the GA React template generator
* The next step is to fetch the data in Asteroids.js and console logging it the ensure I was getting back the correct data.
* I decided not to use axios to fetch my data just to keep things a bit vanilla.
* To then complete task 1, displayed the the data in the UI using bulma cards. Also, add a feature that allows the to click on an Asteroid card, taking them to the single page for that Asteroid, displaying more info.
* Data has no image property, so append image property at random to the returned data
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
* Found userful resource that explains how to push a new item into an array in firebase without replacing the useful element. Link - https://fireship.io/lessons/firestore-array-queries-guide/. See code below -
```
  const favouriteAsteroid = item => {
    if (!user) {
      window.alert('You must sign up or login to add Asteroid to favourites!')
    }
    const arrayUnion = firebase.firestore.FieldValue.arrayUnion
    db.collection('users').where('user_id', '==', user.uid).get()
      .then(snapshot => {
        snapshot.forEach((doc) => {
          const usersArray = doc.data().favAsteroids.findIndex(ast => ast.id === item.id)
          if (usersArray === -1) {
          db.collection('users').doc(doc.id).update({
            favAsteroids: arrayUnion(item)
          })
          toast.success('Added to favourites')
          } else {
            toast.warning('Already in your favourites')
          }
        })
      }).catch(err => {
        console.log(err)
      })
  }
```
* All 4 tasks completed and MVP reached. Spend some some work on the UI

## Day four
* Add a favourites page to display the users favourite astroid *Additional feature. 
* Handle errors and display the error messages to the user.
* I noticed that the catch block is not returning error messages especially in the search by date component
* Manually handle errors myself
* Make sure the user is not adding duplicate Asteroids into favourites
* Add another feature to allow the user remove an Asteroid from their favourites * used firebase docs for deleting data - https://firebase.google.com/docs/firestore/manage-data/delete-data. 
```
  const removeFavourite = item => {
    const arrayDelete = firebase.firestore.FieldValue.arrayRemove
    db.collection('users').where('user_id', '==', user.uid).get()
    .then(snapshot => {
      snapshot.forEach((doc) => {
        const favToRemove = doc.data().favAsteroids.findIndex(ast => ast.id === item.id)
        if (favToRemove === -1) {
          toast.warning('Asteroid not found')
        } else {
          db.collection('users').doc(doc.id).update({
            favAsteroids: arrayDelete(item)
          })
          toast.success('Asteroid removed from favourites')
          fetchData()
        }
      })
    })
  }
```
* Add more styling and media query for mobile * Additional feature
* Make the navbar responsive also
* Revise code and refactor where possible.

