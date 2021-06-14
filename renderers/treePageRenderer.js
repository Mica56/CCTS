/*
  This file contains all the javascript codes for the tree page
*/

console.log('hello');
$( async function() {
  let datasource = await ipcRenderer.invoke('treePage:getData', '60b64d198873311ec41b43f3');
  // datasource = JSON.parse(datasource);
  // console.log(datasource);

  // var datasource = {
  //   'name': 'Lao Lao',
  //   'title': 'general manager',
  //   'children': [
  //     { 'name': 'Bo Miao', 'title': 'department manager' },
  //     { 'name': 'Su Miao', 'title': 'department manager',
  //       'children': [
  //         { 'name': 'Tie Hua', 'title': 'senior engineer' },
  //         { 'name': 'Hei Hei', 'title': 'senior engineer',
  //           'children': [
  //             { 'name': 'Dan Dan', 'title': 'engineer' }
  //           ]
  //         },
  //         { 'name': 'Pang Pang', 'title': 'senior engineer' }
  //       ]
  //     },
  //     { 'name': 'Hong Miao', 'title': 'department manager' }
  //   ]
  // };

  $('#chart-container').orgchart({
    'data' : datasource,
    'nodeContent': 'title'
  });

});