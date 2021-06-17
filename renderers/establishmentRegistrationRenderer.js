/*
  #establishmentRegistrationForm
  * This file contains the javascript instructions for the activities in the visitor registration form page
  * Check out the elements in establishmentRegistration.ejs
*/


//  @clar:add --> Setup the submition of the form and collect all the inputs in an object
//      step1:  Store the form element in a variable. Get it using jQuery
  let formEstablishment = $('#establishmentForm');
  let nameEstablishment = $('#nameInput').val();
  let addressEstablishment = $('#addressInput').val();
  let ownerEstablishment = $('#ownerInput').val();
  let contactNumEstablishment = $('#contactNumberInput').val();
  let emailEstablishment = $('#emailInput').val();
  let userNameEstablishment = $('#usernameInput').val();
  let passwordEstablishment = $('#passwordInput').val();

//      step2:  Setup the submit event of the form. Then add the function parameter
//      step3:  Add the event.preventDefault() line in the function.
  formEstablishment.submit(function(event){
    event.preventDefault();
    alert('Establishment Form Submitted!');
  });
//      step4:  Get all the data from the input elements and create an object from them
//              It would be something like the statements below:
//              {
//                  name: $('input#nameInput').val(),
//                  email: $('input#emailInput').val(),
//                  .......(etc).
//              }
//              then store it in a variable. That would be used by @micaela.
  let establishmentCredentials = {
    name: nameEstablishment,
    address: addressEstablishment,
    owner: ownerEstablishment,
    contact: contactNumEstablishment,
    email: emailEstablishment,
    username: userNameEstablishment,
    password: passwordEstablishment
  };
//      @micaela:add --> setup the emitter for writing the data to the database
//                          and pass the object made by @clar as a parameter to the event.