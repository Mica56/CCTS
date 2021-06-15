/*
  This file contains all the javascript codes for the visit data page
*/

/*
    *   @clar:add --> display all the visit data to the table
    *       Tasks:
    *           @clar: 1. call the .ready method to ensure that the DOM is ready before trying to access it
    *               work on inside its function parameter
    *               @micaela:add --> emit an event just before clar iterate through the data,
    *                                    it would be an event that asks for the visit data;
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
                            _id: 60b66aa4b13db43de4d86e20,
                            establishment: 60b64d198873311ec41b43f3,
                            visitor: 60b655e296f43737186a8fa8,
                            entered: 2021-06-01T17:13:08.640Z,
                            __v: 0,
                            exited: 2021-06-01T17:31:08.962Z
                        }
                    ]

*/