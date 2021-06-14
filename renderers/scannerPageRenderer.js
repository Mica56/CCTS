/*
  This file contains all the javascript codes for the scanner page 
*/
const QrScanner = require('qr-scanner');
QrScanner.WORKER_PATH = path.normalize(path.normalize(__dirname + '/../node_modules/qr-scanner/qr-scanner-worker.min.js'));

// cache all the elements needed
let videoElement        = $('video#video');
let entryScanBtn        = document.getElementById('entryScanBtn');
let exitScanBtn         = document.getElementById('exitScanBtn');
let stopScanBtn         = document.getElementById('stopScanBtn');


/*
  * @ done
  * Instantiate the exit scanner
*/
let QrScannerEntry = new QrScanner(videoElement, (result) => {
    console.log('result: ', result);
    QrScannerEntry.stop();
    console.log('stopped');

    //send the data to the main process
    ipcRenderer.send('entry:detected', result);
});

/*
    @modify:clar --> use jQuery for getting the element and adding eventhandlers
    * Start the scanner when the entrace button is clicked
*/
entryScanBtn.addEventListener('click', () => {
    console.log('scanning');
    QrScannerEntry.start();
});


/*
  * @ done
  *  Instantiate the exit scanner
*/
QrScannerExit = new QrScanner(videoElement, (result) => {
    console.log('result: ', result);
    QrScannerExit.stop();
    console.log('stopped');

    //send the data to the main process
    ipcRenderer.send('exit:detected', result);
  });

/*
    @modify:clar --> use jQuery for getting the element and adding eventhandlers
    * Start the scanner when the exit button is clicked
*/
exitScanBtn.addEventListener('click', () => {
    console.log('scanning');
    QrScannerExit.start();
});

/*
    @done
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


