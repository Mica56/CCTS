/*
  This file contains all the javascript codes for the visitor data page
*/

/*
    *   @clar:add --> display all the visitor data to the table
    *       Tasks:
    *           @clar: 1. call the .ready method to ensure that the DOM is ready before trying to access it
    *               work on inside its function parameter
    *               @micaela:add --> emit an event just before clar iterate through the data,
    *                                    it would be an event that asks for the visitor data;
    *                                       use the ipcRenderer.invoke and check the documentation 
    *                                       for that to check its syntax (it have a good example there)
    *                               Store the data in a variable 
    * 
    *           @clar: 2. Use the dummy data below and display them on the table: (headers and data)
    *                       and store it in a variable
    *           Note: duplicate the data in the array to ensure that they are added 
    *                   row by row and not go in a horizontal way
    *               [
                        {
                            _id: 60b655e296f43737186a8fa8,
                            name: 'Joseph Karl',
                            address: 'infanta, quezon',
                            contactNumber: '09991374692',
                            email: 'jk.email.com',
                            covidStatus: 'NONE',
                            vaccine: 'Pfizer',
                            dateRegistered: 2021-06-01T15:44:34.597Z,
                            __v: 0
                        }
                    ]

*/