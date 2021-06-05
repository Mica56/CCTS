

/*
  Handles the search event
  @! THE SEARCH INSIDE THE DATA PAGE IS NOT WORKING
*/

let searchForm          = document.getElementById('searchForm');
let searchInput         = document.getElementById('searchInput');
let treeBtn         = document.getElementById('treeBtn');

searchForm.addEventListener('submit', function (event) {
    console.log("hello");
    console.log(searchInput);
    console.log(searchInput.value);
    ipcRenderer.send('request:search', searchInput.value);
    console.log('request:search');
    // event.preventDefault();
});

treeBtn.addEventListener('click', function (event) {
  ipcRenderer.send('page:tree');
  console.log("sent: page:tree");
  
});

