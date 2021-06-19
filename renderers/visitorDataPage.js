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
    // console.log(result);
    let dataArr = JSON.parse(result);
    // add the headers for the table
    for(const key of Object.keys(dataArr[0])){
      let addHeaders = `<th>${key}</th>`;
      $('#visitorTBL thead th:last-child').after(addHeaders);
    }

  
    let counter = 1;
    for (const obj of Object.values(dataArr)) { // add rows 
      // console.log(obj._id);

      let id = obj._id; // get the id of the object (for element id and qrcode)
      let name = obj.name;// get the name of the object (for the qrcode)

      let addNewRow = `<tr id=${id}></tr>`// add new row for the current object
      $('#visitorTBL > tbody').append(addNewRow);

      let addNumberColumn = `<td>${counter++}<a id=${'qr-'+ id} href='#'>Print QR</a></td>`
      $(`#visitorTBL > tbody tr#${id}`).append(addNumberColumn);

      $(`#qr-${id}`).click( function () { // set the click function for generating qr code
        ipcRenderer.send('reqPrintQr', id, name);// emit an event for generating the qr code
      }) ;

      // add the columns
      for(const [key, value] of Object.entries(obj)){
        // console.log(obj[key]);
        let addNewColumn;
        if (value) {// if not null
          if(key == 'dateRegistered'){// if date
            let date = new Date(value);
            let formattedDate = `${date.toDateString()} - ${date.toLocaleTimeString()}`;
            addNewColumn = `<td>${formattedDate}</td>`;
          } else {// common case
            addNewColumn = `<td>${value}</td>`;
          }
        } else {// if property has null value
          addNewColumn = `<td>None</td>`;
        }
        
        
        $(`#visitorTBL tbody tr#${id}`).append(addNewColumn);
      }
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