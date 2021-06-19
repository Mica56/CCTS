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

  $('visitor.ejs').ready(async function(){
    let msg = "requesting visitor data..";
    let result = await ipcRenderer.invoke('reqVisitorData', msg);
    console.log(result);

    let addHeaders;
    let addNewRow;
    let data = [
      {
        _id: '60b655e296f43737186a8fa8',
        name: 'Joseph Karl',
        address: 'infanta, quezon',
        contactNumber: '09991374692',
        email: 'jk.email.com',
        covidStatus: 'NONE',
        vaccine: 'Pfizer',
        dateRegistered: '2021-06-01T15:44:34.597Z',
        __v: 0
      },
      {
        _id: '60b655e296f43737186a8fa8',
        name: 'Macey Villanueva',
        address: 'antipolo, rizal',
        contactNumber: '09123456789',
        email: 'mv.email.com',
        covidStatus: 'NONE',
        vaccine: 'AstraZeneca',
        dateRegistered: '2021-06-01T15:44:34.597Z',
        __v: 0
      },
      {
        _id: '60b655e296f43737186a8fa8',
        name: 'RA Inocencio',
        address: 'pasig, somwer',
        contactNumber: '09099997893',
        email: 'ra.email.com',
        covidStatus: 'NONE',
        vaccine: 'Pfizer',
        dateRegistered: '2021-06-01T15:44:34.597Z',
        __v: 0
      }
    ];
    let keys = data.flatMap(Object.keys)

    for(i=0;i<9;i++){
      addHeaders = "<th>"+ keys[i] +"</th>";
      $('#visitorTBL thead th:last-child').after(addHeaders);
    }

    for(i=1;i<=data.length;i++){
      addNewRow = "<tr id='"+ data[i-1]._id +"'><td>"+ i +"</td><td>"+ data[i-1]._id +"</td><td>"+ data[i-1].name+"</td><td>"+ data[i-1].address+"</td><td>"+ data[i-1].contactNumber+"</td><td>"+ data[i-1].email+"</td><td>"+ data[i-1].covidStatus+"</td><td>"+ data[i-1].vaccine +"</td><td>"+ data[i-1].dateRegistered +"</td><td>"+ data[i-1].__v +"</td></tr>";
      $('#visitorTBL > tbody:last-child').append(addNewRow);
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