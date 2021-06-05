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
mongoose.connect('mongodb+srv://admin:Admin.Pass123@cluster0.cyvh9.mongodb.net/contact_tracing?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
    //connected
    
    try {
        visitors = await VisitorModel.find({}).exec()
        console.log('visitor found');
        establishments = await EstablishmentModel.find({}).exec();
        visits = await VisitModel.find({}).exec();
        console.log('raw: ', visits);
        console.log('\n\n\n\n');
        console.log('index 0: ', visits[0]);
        
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
    ----------------------------------------------------------------
    Handle entry detection
*/
ipcMain.on('entry:detected', async (event, id) => {
    console.log('entry:detected');

    let visitor, establishment;
    
    try{
        visitor = await VisitorModel.findById({_id: mongoose.Types.ObjectId(id) }).exec();
        console.log('visitor matched!');
    
        establishment = await EstablishmentModel.findById({_id: mongoose.Types.ObjectId("60b64d198873311ec41b43f3")}).exec();
        console.log('establishment mathced!');
    
        // get the visitor instance
        let visit = new VisitModel({
            establishment: establishment,
            visitor: visitor,
        });

        visit.save( function (err, visit) {
            if (err) console.error('Error saving visit: ', err);
            console.log(visit);
            console.log('entry sucessful!');
        });

    } catch (err) {
        console.log(err);
    }
    // get the establishment instance ** still to be fixed : make this dynamic
    
});

/*
    --------------------------------------------------------------------------
    Handle exit detection
*/
ipcMain.on('exit:detected', (event, id) => {
    console.log('exit:detected');
    let visitor, establishment;

    // get the visitor instance
    VisitorModel.findById({_id: mongoose.Types.ObjectId(id) }, (err, result) => {
        if (err) console.error('Error finding visitor: ', err);// error finding visitor
        // visitor found
        console.log(result);
        visitor = result;

        EstablishmentModel.findById({_id: mongoose.Types.ObjectId("60b64d198873311ec41b43f3")}, (err, result) => {
            if (err) console.error('Error finding establishment: ', err);// error finding establishment
            // establishment found
            console.log(result);
            establishment = result;

            VisitModel.findOneAndUpdate({visitor: visitor, establishment: establishment}).sort({entered: -1}).exec(
                function (err, result){ // log the console if error
                    if (err) console.error('Error updating visitor: ', err);

                    // update success
                    console.log(result);
                    result.exited = Date.now();
                    result.save( (err, result) => {
                        if(err) console.error('Error saving record', err);// saving error
                        // saving success
                        console.log(result);
                        console.log('exit success!');

                    });
                }); 
        });
    });
});


/*
    -------------------------------------------------------------------
    Handle the visitors data query request
*/

ipcMain.handle('query:visitors', async (event, args) => {
    var visitors;
    // Query the database for the visitors 
    visitors = await VisitorModel.find({}, function (err, results) {
        if(err) console.error(err);// error finding visitors
        // Success
    });
    console.log(visitors[0]);
    
    ejse.data({ visitors: visitors});
    winChild.loadURL('file://'+ __dirname + '/views' + '/data.ejs');
    winChild.once('ready-to-show', () => {
        winChild.show()
    });
    return visitors[0];
});

ipcMain.on('request:reload', (event) => {
    console.log('received: ', 'request:reload');
    // console.log(win);
    win.reload();
});

/*
    ------------------------------------------------------------
    Handle the request for data window
*/
ipcMain.on('request:dataWindow', async (event) => {

    ejse.data({visitors: visitors, establishments: establishments, visits: visits});

    win.loadURL('file://' + __dirname + '/views' + '/data.ejs')
});


/*
    ------------------------------------------------------------
    Handle the request for printing
*/
ipcMain.on('request:printToPdf', () => {
    console.log('received!');

    win.webContents.printToPDF({}).then(data => {
        const pdfPath = path.join(os.homedir(), 'Desktop', 'temp.pdf')
        fs.writeFile(pdfPath, data, (error) => {
            if (error) throw error
            console.log(`Wrote PDF successfully to ${pdfPath}`)
        })
        }).catch(error => {
        console.log(`Failed to write PDF to ${pdfPath}: `, error)
        })
    console.log('printed');
    
});

/*
    ------------------------------------------------------------
    Handle the search request
*/

ipcMain.on('request:search', async (event, id) => {
    let visitor;
    console.log('received: request:search');
    // console.log(event);
    // console.log(id);
    try{
        visitor = await VisitorModel.find({_id: mongoose.Types.ObjectId(id)}).exec();
        console.log('visitor found!');
        // console.log('hello world');
        // console.log(visitor);
        ejse.data({visitor: visitor});
        win.loadURL('file://' + __dirname + '/views' + '/search.ejs')
        visitor[0].children = {
            name: "joseph",
            age: 20
        }
        console.log(visitor[0]);
    } catch (err) {
        console.log('error finding visitor', )
    }
    
});


/*
    ------------------------------------------------------------
    Handle the search request for tree
*/

ipcMain.on('page:tree', function () {
    console.log('received: page:tree');

    win.loadURL('file://' + __dirname + '/views' + '/tree.ejs');
});


/*
    ------------------------------------------------------------
    Handle the test request
*/

ipcMain.handle('test:request', async function(event, arg) {
    console.log(arg);
    visitor = await VisitorModel.find({_id: mongoose.Types.ObjectId("60b655e296f43737186a8fa8")}).exec();
    console.log(visitor[0].name);
    return visitor;

})


