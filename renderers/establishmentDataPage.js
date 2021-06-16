/*
  This file contains all the javascript codes for the establishment data page
*/

/*
    *   @clar:add --> display all the establishment data to the table
    *       Tasks:
    *           @clar: 1. call the .ready method to ensure that the DOM is ready before trying to access it
    *               work on inside its function parameter
    *               @micaela:add --> emit an event just before clar iterate through the data,
    *                                    it would be an event that asks for the establishment data;
    *                                       use the ipcRenderer.invoke and check the documentation 
    *                                       for that to check its syntax (they have a good example there)
    *                               Store the data in a variable    
    * 
    *           @clar: 2. Use the dummy data below and display them on the table: (headers and data)
    *           Note: duplicate the data in the array to ensure that they are added 
    *                   row by row and not go in a horizontal way
    *               [
                        {
                            _id: 60b64d198873311ec41b43f3,
                            name: 'Jollibee',
                            address: 'Sta.Mesa',
                            owner: 'John Doe',
                            contactNumber: '09123456789',
                            email: 'info@email.com',
                            dateRegistered: 2021-06-01T15:07:05.655Z,
                            __v: 0
                        }
                    ]

*/