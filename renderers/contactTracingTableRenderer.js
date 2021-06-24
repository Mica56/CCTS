
ipcRenderer.on('contactTracingData', function (event, datasource) {
    let data = treeToArray(datasource);// translate the tree to array
    quicksort(data, 0, data.length-1);// sort the array;
    buildTable(data);// build the table
});


function getChildren(node) {// get the children of the node
    return node.children;
}

function hasChildren(node) {// returns true is the node has a children; Otherwise, false
    return true && node.children;
}

function buildTable(dataArr) {

    let headers = ['_id', 'establishment', 'visitor', 'entered', 'exited'];

    for(let i = 0; i < headers.length; ++i){// setup the header for the table
        let addHeaders = `<th>${headers[i]}</th>`;
        $('#visitTBL thead th:last-child').after(addHeaders);
    }
  
    
    let counter = 1;
    for (const node of Object.values(dataArr)) { // add rows 
        let id = node._id; // get the id of the object for the id of the row

        let addNewRow = `<tr id=${id}></tr>`// add new row for the current object
        $('#visitTBL > tbody').append(addNewRow);

        let addNumberColumn = `<td>${counter++}</td>`
        $(`#visitTBL > tbody tr#${id}`).append(addNumberColumn);

        for(let i = 0; i < headers.length; ++i){// display all the properties of the object to the table
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
    }
}


function treeToArray (root) {
    let nodes = [];// initialize an array for storage of nodes to return

    if(root) {// if there is an element
        let stack = [];// initialize a stack for the traversal
        
        stack.push(root);// push the initial node

        while(stack.length != 0) {// while there is a node in the stack
            let node = stack.pop();// get the node from the top of the stack

            nodes.push(node);// push the visited node to the array;

            if(hasChildren(node)){// if the node has children
                let children = getChildren(node);// get the children of the node

                for(let i = children.length - 1; i >= 0; --i) {// push all the children of the current node to the stack
                    stack.push(children[i]);
                }
            }
            
        }
    }
    return nodes;
}// end of build table;


function quicksort (arr, l, r) {
    if(l >= r)    return;// exit if there is only one element or no element

    let p = partition(arr, l, r);// partition the array into two

    quicksort(arr, l, p-1);// do the quick sort for the elements less than the pivot
    quicksort(arr, p+1, r);// do the quick sort for the elements greater than or equal to the pivot
    
}

function partition (arr, l , r) {
    pivot = arr[r];// get the pivot
    i = l - 1;// less the i by 1 to make it less than j

    for (let j = l; j < r; ++j) {// navigate through the array
        if (arr[j].name.toUpperCase() < pivot.name.toUpperCase()){// if the current element is less than the pivot
            i += 1;// increment the index i
            [arr[i], arr[j]] = [arr[j], arr[i]];// swap elements in index i and j
        }
    }

    [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];// place the pivot in the center of the array;
    return i + 1;// return the index of the pivot
}
