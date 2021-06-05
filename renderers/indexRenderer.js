

const QrScanner = require('qr-scanner');
QrScanner.WORKER_PATH = path.normalize(path.normalize(__dirname + '/../node_modules/qr-scanner/qr-scanner-worker.min.js'));

// cache all the elements needed
let videoElement        = document.getElementById('video');
let entryScanBtn        = document.getElementById('entryScanBtn');
let exitScanBtn         = document.getElementById('exitScanBtn');
let stopScanBtn         = document.getElementById('stopScanBtn');
let queryVisitorsBtn    = document.getElementById('queryVisitorsBtn');
let reloadBtn           = document.getElementById('reloadBtn');

let getDataBtn          = document.getElementById('getDataBtn');
let printBtn            = document.getElementById('printBtn');
let searchBtn           = document.getElementById('searchBtn');

/*
    ---------------------------------------
    Setup the entry scanner
*/
let QrScannerEntry = new QrScanner(videoElement, (result) => {
    console.log('result: ', result);
    QrScannerEntry.stop();
    console.log('stopped');

    //send the data to the main process
    ipcRenderer.send('entry:detected', result);
});

  
entryScanBtn.addEventListener('click', () => {
    console.log('scanning');
    QrScannerEntry.start();
});


/*
    ---------------------------------------
    Setup the exit scanner
*/
QrScannerExit = new QrScanner(videoElement, (result) => {
    console.log('result: ', result);
    QrScannerExit.stop();
    console.log('stopped');

    //send the data to the main process
    ipcRenderer.send('exit:detected', result);
  });

//  start the scan if exit scan button is clicked
exitScanBtn.addEventListener('click', () => {
    console.log('scanning');
    QrScannerExit.start();
});


/*
    ---------------------------------------
    stop any QrScanner from running
*/
stopScanBtn.addEventListener('click', () => {
    console.log('stopped');

    if(QrScannerEntry._active){// stop the entry scanner if active
      QrScannerEntry.stop();
    }else if (QrScannerExit._active) {// stop the exit scanner if active
      QrScannerExit.stop();
    }else {// log the console if clicked while there's no active scanner
      console.log('No scanner is active');
    }
});


// 
getDataBtn.onclick = function () {
    ipcRenderer.send('request:dataWindow');
    console.log('clicked : request:dataWindow');
}

queryVisitorsBtn.onclick = function () {
    ipcRenderer.invoke('query:visitors')
      .then( (result) => {
        
        for(const data in result._doc){
          console.log(result._doc[data]);
        }
      });
}


printBtn.onclick = function () {
    ipcRenderer.send('request:printToPdf');
    console.log('sent- request:printToPdf');
}

/*
    ---------------------------------------
    reload the window on click
*/
reloadBtn.onclick = function () {
  ipcRenderer.send('request:reload');
  console.log('sent: ', 'request:reload');
}


$('button#testBtn').click( async function () {
  let result = await ipcRenderer.invoke('test:request', "this is an arg");
  alert(result[0]._doc['name']);
});
