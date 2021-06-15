/*
  #navigationBar
  * This file contains all the handlers that is similar to all the page like the navigation bar 
  * Check out the elements in the header page
*/

// Note: you may want to modify the id's of the elements

// @clar:add --> get all the buttons and store them in variables
let indexPageBtn = $('a#indexPageButton');
let dataPageBtn = $('a#dataPageButton');
let treePageBtn = $('a#treePageButton');

let testBtn = $('a#testButton');


// @clar:add --> setup the click event for the "to index page" button
indexPageBtn.click(function(event){
  event.preventDefault();
  // @micaela:add --> emit an event for directing the page to the index page
});


// @clar:add --> setup the click event for the "to data page" button
dataPageBtn.click(function(){
  event.preventDefault();
  //@micaela:add --> emit an event for directing the page to the data page
});
  

// @clar:add --> get the link button for the tree page and setup the click event
treePageBtn.click(function(){
  event.preventDefault();
  //@micaela:add --> emit an event for directing the page to the tree page
});



// @sep,@micai fr @clar :: search button click event [for data page]
// searchBtn.click(function(){
//   var searchTextField = $('#searchInput').val();
//   alert(searchTextField);
// });

/*
  *@micaela --> this is your area to test the handlers if it works, put your code inside the function below
*/

// $('a#testButton').click(function (event) {
//   event.preventDefault();// @clar:note always add this line inside the function of the click event
//   alert('It works!');
//   // place your event emitters here
// })




