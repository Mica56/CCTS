/*
  This file contains all the javascript codes for the navigation buttons of the data pages [establishment, visitor, visit]
*/

// @clar:add --> store all the buttons in a variable using jQuery and use that variables for adding the click events
let establishmentTblBtn = $('a#establishmentTableButton');
let visitorTblBtn = $('a#visitorTableButton');
let visitTblBtn = $('a#visitTableButton');

// @clar:add --> use the variable you made above and set up their click event for the "to establishment data page" button/link
establishmentTblBtn.click(function(event){
    event.preventDefault();
    alert('Establishment Table');
    // @micaela:add --> emit an event for directing the page to the establishment data page
});
    

// @clar:add --> use the variable you made above and set up their click event for the "to visitor data page" button/link
visitorTblBtn.click(function(event){
    event.preventDefault();
    alert('Visitor Table');
    // @micaela:add --> emit an event for directing the page to the visitor data page
});
    

// @clar:add --> use the variable you made above and set up their click event for the "to visit data page" button/link
visitTblBtn.click(function(event){
    event.preventDefault();
    alert('Visit Table');
    // @micaela:add --> emit an event for directing the page to the visit data page
});
