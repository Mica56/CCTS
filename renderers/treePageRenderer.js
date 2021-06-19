/*
  This file contains all the javascript codes for the tree page
*/

console.log('hello');
$( async function() {
  let datasource = await ipcRenderer.invoke('treePage:getData', '60b655e296f43737186a8fa8');
  console.log(datasource);
  // build the tree
  $('#chart-container').orgchart({
    'data' : datasource,
    'nodeContent': 'title'
  });

  // add handler for the click function of nodes
  $('#chart-container').find('.node').on('click', function () {
    alert(JSON.stringify($(this).data('nodeData')));
  });

});