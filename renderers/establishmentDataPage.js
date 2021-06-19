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
  // Setup the search functionality
  $('#searchInput').keyup( function () {
    let input = $('input#searchInput').val();
    
    $(`tbody tr:not(:contains('${input}'))`).hide();
    $(`tbody tr:contains('${input}')`).show();
  });


  
  let msg = "requesting estabishment data..";
  // Asks for data in the main process
  let result = await ipcRenderer.invoke('reqEstabData', msg);
  dataArr = JSON.parse(result);

  // add headers for the table
  for(const key of Object.keys(dataArr[0])){
    let addHeaders = `<th>${key}</th>`;
    $('#establishmentTBL thead th:last-child').after(addHeaders);
  }

  
  let counter = 1;
  for (const obj of Object.values(dataArr)) { // add rows 
    let addNewRow;
    
    let id = obj._id;// get the _id property of the object for use in tr element id
    
    addNewRow = `<tr id=${id}></tr>`// add new row for the current object
    $('#establishmentTBL > tbody').append(addNewRow);

    let addNumberColumn = `<td>${counter++}</td>`;// add new column for the number row
    $(`#establishmentTBL tbody tr#${id}`).append(addNumberColumn);

    
    // add the columns
    for(const [key, value] of Object.entries(obj)){// add columns for the object attributes
      // console.log(obj[key]);
      let addNewColumn;
      if (value){// if the property is not null
        if(key == 'dateRegistered'){// if date, format
          let date = new Date(value);
          let formattedDate = `${date.toDateString()} - ${date.toLocaleTimeString()}`;
          addNewColumn = `<td>${formattedDate}</td>`
        } else { // common case
          addNewColumn = `<td>${value}</td>`
        }
      } else { // display none
        addNewColumn = `<td>None</td>`
      }
      
      $(`#establishmentTBL tbody tr#${id}`).append(addNewColumn);
    }
  }

}); 


  
  // $('button#searchBtn').click( function () {
  //   let input = $('input#searchInput').val();
    
  //   $(`tbody tr:not(:contains('${input}'))`).hide();
  //   $(`tbody tr:contains('${input}')`).show();
  // });

  