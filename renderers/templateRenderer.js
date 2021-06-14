/*
  #navigationBar
  * This file contains all the handlers that is similar to all the page like the navigation bar 
  * Check out the elements in the header page
*/

// Note: you may want to modify the id's of the elements

// @clar:add --> get all the buttons and store them in variables

// @clar:note --> follow the same setup with the test code that I made below

// @clar:add --> setup the click event for the "to index page" button
  //@micaela:add --> emit an event for directing the page to the index page


// @clar:add --> setup the click event for the "to data page" button
  //@micaela:add --> emit an event for directing the page to the data page


// @clar:add --> get the link button for the tree page and setup the click event
  //@micaela:add --> emit an event for directing the page to the tree page


/*
  *@micaela --> this is your area to test the handlers if it works, put your code inside the function below
*/

$('a#testButton').click(function (event) {
  event.preventDefault();// @clar:note always add this line inside the function of the click event
  alert('It works!');
  // place your event emitters here
})




