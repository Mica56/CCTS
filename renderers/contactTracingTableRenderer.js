


$(document).ready( function () {

    ipcRenderer.on('contactTracingData', function (event, datasource) {
        // alert(datasource);
        buildTable(datasource);
    });


    function getChildren(node) {
        console.log(node.children);
        return node.children;
    }
    
    function hasChildren(node) {
        return true && node.children;
    }

    function buildTable (root) {
        
        if(root) {// if there is an element
            let counter = 1;// initialize a counter for the numbering of table
            
            let headers = ['_id', 'establishment', 'visitor', 'entered', 'exited'];
            for(let i = 0; i < headers.length; ++i){// setup the header for the table
                let addHeaders = `<th>${headers[i]}</th>`;
                $('#visitTBL thead th:last-child').after(addHeaders);
            }
            // alert('hey');
            let stack = [];// initialize a stack for the traversal
            stack.push(root);// push the initial node

            while(stack.length != 0) {// while there is a node in the stack
                let node = stack.pop();// get the node from the top of the stack
                console.log(node);
                let id = node._id; // get the id of the object for the id of the row
        
                let addNewRow = `<tr id=${id}></tr>`// add new row for the current object
                $('#visitTBL > tbody').append(addNewRow);
        
                let addNumberColumn = `<td>${counter++}</td>`
                $(`#visitTBL > tbody tr#${id}`).append(addNumberColumn);

                for(let i = 0; i < headers.length; ++i){// display all the properties of the object to the table
                    // console.log(obj[key]);
                    let addNewColumn;
                    if(node[headers[i]]){
                        if(headers[i] == 'establishment' || headers[i] == 'visitor'){
                          addNewColumn = `<td>${node[headers[i]].name}</td>`;
                        } else if (headers[i] == 'entered' || headers[i] == 'exited') {
                          let date = new Date(node[headers[i]]);
                          let formattedDate = `${date.toDateString()} - ${date.toLocaleTimeString()}`;
                          addNewColumn = `<td>${formattedDate}</td>`;
                        } else {
                          addNewColumn = `<td>${node[headers[i]]}</td>`;
                        }
                    }else {
                    addNewColumn = `<td>None</td>`;
                    }
      
                    $(`#visitTBL tbody tr#${id}`).append(addNewColumn);
                }
                
                if(hasChildren(node)){
                    let children = getChildren(node);// get the children of the node
                
                    for(let i = children.length - 1; i >= 0; --i) {// push all the children of the current node to the stack
                        stack.push(children[i]);
                        console.log('hey');
                    }
                }
                
            }
        }
    }// end of build table;
});