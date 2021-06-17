/*
    #registration
    This file contains all the javascript codes for the buttons in the registration page [establishment, visitor, admin]
    See registration.ejs for the html elements
*/

// @clar:add --> store all the buttons in a variable using jQuery and use that variables for adding the click events
let visitorRegiBtn = $('a#visitorRegistrationButton'); 
let establishmentRegiBtn = $('a#establishmentRegistrationButton'); 
let adminRegiBtn = $('a#adminRegistrationButton'); 


// @clar:add --> use the variable you made above and set up their click event for the "to visitor registration page" button/link
visitorRegiBtn.click(function(event){
    event.preventDefault();
    alert('Visitor Registration Button');
    // @micaela:add --> emit an event for directing the page to the visitor registration page
});

// @clar:add --> use the variable you made above and set up their click event for the "to establishment registration page" button/link
establishmentRegiBtn.click(function(event){
    event.preventDefault();
    alert('Establishment Registration Button');
    // @micaela:add --> emit an event for directing the page to the establishment registration page
});

// @clar:add --> use the variable you made above and set up their click event for the "to admin registration page" button/link
adminRegiBtn.click(function(event){
    event.preventDefault();
    alert('Admin Registration Button');
    // @micaela:add --> emit an event for directing the page to the admin registration page
});