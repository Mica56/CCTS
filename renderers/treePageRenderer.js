/*
  This file contains all the javascript codes for the tree page
*/
let root;
ipcRenderer.on('createTree', function (event, obj) {
  // alert('hey')
  // console.log(obj);
  root = obj;
  displayTree(root, 1);
  // alert('hey');
});

async function displayTree(obj, degree){
  let datasource = await getData(obj, degree);
  // build the tree
  createTree(datasource)
  // add handler for the click function of nodes
  $('#chart-container').find('.node').on('click', function () {
    alert(JSON.stringify($(this).data('nodeData')));
  });

}// end of display tree

// console.log('hello');
// $( function () {
//   displayTree(1);
//  });



$('#degreeInputForm').submit( function (event) {
  event.preventDefault();
  let degree = $('#degreeInput').val();
  if(degree < 1 || degree >5){
    // alert("invalid input")
    ipcRenderer.send('invalidDegreeInput', degree);
    return;
  }
  displayTree(root, degree);
})


async function getData (obj, degree) {
  // console.log(obj);
  let datasource = await ipcRenderer.invoke('treePage:getData', obj, degree);
  // console.log('result: ',datasource);
  datasource = JSON.parse(datasource);
  console.log(datasource);
  return datasource;
}

function createTree(datasource) {
  $('#chart-container').empty();// clear the div element
  $('#chart-container').orgchart({
    'data' : datasource,
    'nodeContent': 'title'
  });
}