const { app, BrowserWindow, ipcMain } = require('electron');
const path              = require('path');
const fs                = require('fs');
const QrScanner         = require('qr-scanner');
const ejse              = require('ejs-electron');
const os                = require('os')
QrScanner.WORKER_PATH   = path.normalize(__dirname + '/node_modules/qr-scanner/qr-scanner-worker.min.js');

const EstablishmentModel = require('./models/establishmentModel.js');
const VisitorModel = require('./models/visitorModel.js');
const VisitModel = require('./models/visitModel.js');

// setup mongodb database connection
const mongoose = require('mongoose');
const visitorModel = require('./models/visitorModel.js');
mongoose.connect('mongodb+srv://admin:Admin.Pass123@cluster0.cyvh9.mongodb.net/contact_tracing?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
    //connected
    try {
        visitors = await VisitorModel.find({}).exec()
        console.log('visitor found');
        // console.log(visitors);
        establishments = await EstablishmentModel.find({}).exec();
        // console.log(establishments);
        visits = await VisitModel.find({}).exec();
        // console.log(visits);
    } catch (err) {
        console.log(err);
    }
    console.log('Database setup Sucessful');

});

let win = null;// for reference to the window
let winChild = null; // for reference to the child window
let winData = null;

// declare variables to hold the database data
let visitors,  visits, establishments;
/*
    Create the window
*/
function createWindow (file) {
    window = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false,
        nodeIntegration: true
      }
    });
    
    window.loadURL('file://' + __dirname + '/views' + file);
    return window;
}



app.whenReady().then(() => {
    win = createWindow('/index.ejs');

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow('/index.ejs');
    });
    // console.log('window: ', win);
});


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

/*
    #navigationBar
    @unfinished
    Below are the handlers for the navigation bar (templateRenderer)
*/

// @add:micaela --> add the handler for directing to the index page
// @add:micaela --> add the handler for directing to the data page
// @add:micaela --> add the handler for directing to the tree page



/*
    #scannerPage
    @modify:joseph --> think of how to set the establishment for the app

    Below are the handlers for the scanner page
*/
ipcMain.on('entry:detected', async (event, id) => {
    console.log('entry:detected');

    let visitor, establishment;
    
    try{
        visitor = await VisitorModel.findById({_id: mongoose.Types.ObjectId(id) }).exec();
        console.log('visitor matched!');
    
        establishment = await EstablishmentModel.findById({_id: mongoose.Types.ObjectId("60b64d198873311ec41b43f3")}).exec();
        console.log('establishment matched!');
    
        // get the visitor instance
        let visit = new VisitModel({
            establishment: establishment,
            visitor: visitor,
        });

        visit.save( function (err, visit) {
            if (err) console.error('Error saving visit: ', err);
            // console.log(visit);
            console.log('entry sucessful!');
        });

    } catch (err) {
        console.log(err);
    }
    
});

/*
    @modify:das --> rewrite the queries using the async await syntax
    Handle exit detection
*/
ipcMain.on('exit:detected', (event, id) => {
    console.log('exit:detected');
    let visitor, establishment;

    // get the visitor instance
    VisitorModel.findById({_id: mongoose.Types.ObjectId(id) }, (err, result) => {
        if (err) console.error('Error finding visitor: ', err);// error finding visitor
        // visitor found
        // console.log(result);
        visitor = result;

        EstablishmentModel.findById({_id: mongoose.Types.ObjectId("60b64d198873311ec41b43f3")}, (err, result) => {
            if (err) console.error('Error finding establishment: ', err);// error finding establishment
            // establishment found
            // console.log(result);
            establishment = result;

            VisitModel.findOneAndUpdate({visitor: visitor, establishment: establishment}).sort({entered: -1}).exec(
                function (err, result){ // log the console if error
                    if (err) console.error('Error updating visitor: ', err);

                    // update success
                    // console.log(result);
                    result.exited = Date.now();
                    result.save( (err, result) => {
                        if(err) console.error('Error saving record', err);// saving error
                        // saving success
                        // console.log(result);
                        
                        console.log('exit success!');

                    });
                }); 
        });
    });
});


