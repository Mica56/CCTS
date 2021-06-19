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

  $('establishment.ejs').ready(async function(event){
    let msg = "requesting estabishment data..";
    let result = await ipcRenderer.invoke('reqEstabData', msg);
    console.log(result);

    let addHeaders;
    let addNewRow;
    let data = [
    {
      _id: '60b64d198873311ec41b43f3', 
      name: 'Jollibee',
      address: 'Sta.Mesa',
      owner: 'John Doe',
      contactNumber: '09123456789',
      email: 'info@email.com',
      dateRegistered: '2021-06-01T15:07:05.655Z',
      __v: 0
    },
    {
      _id: 'test1', 
      name: 'Mcdo',
      address: 'Marikina',
      owner: 'Mary Jane',
      contactNumber: '09123456789',
      email: 'maryjane@email.com',
      dateRegistered: '2021-06-01T15:07:05.655Z',
      __v: 0
    },
    {
      _id: 'test2', 
      name: 'KFC',
      address: 'Mandaluyong',
      owner: 'Erica Mae',
      contactNumber: '09123456789',
      email: 'ericamae@email.com',
      dateRegistered: '2021-06-01T15:07:05.655Z',
      __v: 0
    }
  ];
    let keys = data.flatMap(Object.keys)

    for(i=0;i<8;i++){
      addHeaders = "<th>"+ keys[i] +"</th>";
      $('#establishmentTBL thead th:last-child').after(addHeaders);
    }

    for(i=1;i<=data.length;i++){
      addNewRow = "<tr id='"+ data[i-1]._id +"'><td>"+ i +"</td><td>"+ data[i-1]._id +"</td><td>"+ data[i-1].name+"</td><td>"+ data[i-1].address+"</td><td>"+ data[i-1].owner+"</td><td>"+ data[i-1].contactNumber+"</td><td>"+ data[i-1].email+"</td><td>"+ data[i-1].dateRegistered +"</td><td>"+ data[i-1].__v +"</td></tr>";
      $('#establishmentTBL > tbody:last-child').append(addNewRow);
    }

  });


  $('button#searchBtn').click( function () {
    let input = $('input#searchInput').val();
    
    $(`tbody tr:not(:contains('${input}'))`).hide();
    $(`tbody tr:contains('${input}')`).show();
  });

  $('#searchInput').keyup( function () {
    let input = $('input#searchInput').val();
    
    $(`tbody tr:not(:contains('${input}'))`).hide();
    $(`tbody tr:contains('${input}')`).show();
  });