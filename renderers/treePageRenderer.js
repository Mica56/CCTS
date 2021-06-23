/*
  This file contains all the javascript codes for the tree page
*/

$(document).ready( function() {

  let root;
  let previouslySelected;
  let data;

  async function displayTree(obj, degree){
    let datasource = await getData(obj, degree);

    // build the tree
    createTree(datasource);

    // add handler for the click function of nodes
    $('#chart-container').find('.node').on('click', function () {
      alert(JSON.stringify($(this).data('nodeData')));
      console.log($(this).data('nodeData'));
    });

  }// end of display tree

  ipcRenderer.on('createTree', function (event, obj) {

    root = obj;
    displayTree(root, 1);
  });// end of on() method


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
  });// end of degree input submit() method

  $('#searchInputForm').submit( function (event) {
    event.preventDefault();
    let name = $('#searchInput').val();
    console.log(name);

    let found = searchName(name);
    console.log(found);
    if(found){
      $(found).css('background', 'blue');
    } else {
      // alert('Name does not exist!');
      console.log('does not exist');
    }
  });// end of search submit() method



  
  $('#searchInput').keyup( async function () {// select the element on keyup
    // alert('hey');
    let name = $('#searchInput').val();
    console.log(name);

    let selected = searchName(name);

    if(selected && selected.length != 0){
      $(getNode(selected)).css('background', 'blue');
      previouslySelected = selected;
    } else {
      // alert('Name does not exist!');
      $(getNode(previouslySelected)).css('background', '');
    }
  });//end of keyup() method

  async function getData (obj, degree) {
    // console.log(obj);
    let datasource = await ipcRenderer.invoke('treePage:getData', obj, degree);
    // console.log('result: ',datasource);
    data = datasource;
    datasource = JSON.parse(datasource);
    console.log(datasource);
    return datasource;
  }// end of getData()

  function createTree(datasource) {
    $('#chart-container').empty();// clear the div element
    $('#chart-container').orgchart({
      'data' : datasource,
      'nodeContent': 'title'
    });
  }// end of createTree()

  $('#traverseBtn').click( function () {
    // var $chart = $(".orgchart");
    // console.log($chart.children().children());
    // $chart.children().children().children(':nth-child(1)').css('background-color', 'green');
    // console.log($chart.children().children().children('ul').children('div'));

    // console.log($chart.children().children().children('ul').children());
    $()
    

  });


  function getChildren(element) {
    return $(element).children('ul').children('li').toArray();
  }// end of getChildren()


  function getName(element) {
    return $(element).children('div').children('div.title').text();
  }// end of getName();

  function getNode(element) {
    // console.log($(element).children('div').toArray());
    return $(element).children('div').toArray();
  }// end of getNode()


  function getRoot() {
    var $chart = $(".orgchart");
    return $chart.children().children()[0];
  }// end of getRoot()

  function searchName(name) {
    let root = getRoot();// get the root of the tree
    // let nodes = []
    let counter = 0;
    if(name != null && name != '') {
      let queue = [];
      queue.unshift(root);// add the root of the tree to the queue

      while(queue.length != 0) {// execute while there is a node in the queue
        let node = queue.shift()// get the node from the front of the queue

        if(getName(node) == name){// check if that current node is the one that is to be found
          // alert('ye');
          return node;
        }

        // nodes.push(node);
        let children = getChildren(node);// get the children of the current node
        for(let i = 0; i < children.length; ++i) {// push all the children to the queue
          queue.push(children[i]);
        }
      }
    }
    return [];

  }// end of searchName()

  $('button#tableBtn').click( function () {
    console.log('data:', data);
    ipcRenderer.send('reqTreeTable', data);

  })
})// end of ready method
