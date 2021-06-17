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

// import of handlers
const treePageHandler = require('./handlers/treePageHandler.js');
const scannerPageHandler = require('./handlers/scannerPageHandler.js');
const establishmentDataPageHandler = require('./handlers/establishmentDataPageHandler.js');
const visitDataPageHandler = require('./handlers/visitDataPageHandler.js');
const visitorDataPageHandler = require('./handlers/visitorDataPageHandler.js');

// import the registration handlers

const adminRegistrationHandler = require('./handlers/adminRegistrationHandler.js');
const establishmentRegistrationHandler = require('./handlers/establishmentRegistrationHandler.js');
const visitorRegistrationHandler = require('./handlers/visitorRegistrationHandler.js');
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
exports.win = win;
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
    #navigationBar (templateRenderer.js)
    @unfinished
    Below are the handlers for the navigation bar 
*/

ipcMain.on('reqIndex', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/index.ejs`)
});

ipcMain.on('reqData', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/establishment.ejs`);
});

ipcMain.on('reqTree', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/tree.ejs`)
});

// for directing to register page
ipcMain.on('reqRegister', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/registration.ejs`)
});

ipcMain.on('test',visitorDataPageHandler.getVisitors);



/*
    #navigationBar (dataNavigationRenderer.js)
    @unfinished
    Below are the handlers for the navigation bar of the data pages
*/
//for directing to establishment page
ipcMain.on('reqEstablishment', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/establishment.ejs`);

});
//for directing to visitor page
ipcMain.on('reqVisitor', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/visitor.ejs`);
});
//for directing to visit data page
ipcMain.on('reqVisit', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/visit.ejs`);
});


/*
    #EstablishmentDataPage (establishmentDataPage.js)
    @unfinished
    Below are the handlers for the establishment data page
*/

// @micaela:add --> add the handler for request of establishment data


/*
    #visitorDataPage (visitorDataPage.js)
    @unfinished
    Below are the handlers for the visitor data page
*/

// @micaela:add --> add the handler for the request of visitor data


/*
    #visitDataPage (visitDataPage.js)
    @unfinished
    Below are the handlers for the visit data apge
*/

// @micaela:add --> add the handler for the request of visit data



/*
    #scannerPage (scannerPageRenderer.js)
    @joseph:modify --> think of how to set the establishment for the app

    Below are the handlers for the scanner page
*/

ipcMain.on('reqScan', function (event, msg) {
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/scanner.ejs`);
})

ipcMain.on('entry:detected', scannerPageHandler.entrance);

/*
    @das:modify --> rewrite the queries using the async await syntax
    Handle exit detection
*/
ipcMain.on('exit:detected', scannerPageHandler.exit);


/*
    #treePage (treePageRenderer.js)
    Below are the handlers for the tree page
*/
ipcMain.handle('treePage:getData', treePageHandler.buildTree);


/*
    #registration (registrationRenderer.js)
    Below are the handlers for the registration page
*/



/*
    #registration (registrationRenderer.js)
    Below are the handlers for the registration page
*/

// for directing to the visitor registration page
ipcMain.on('reqVisitorReg', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/visitorRegistration.ejs`);
});
// for directing to the establishment registration page
ipcMain.on('reqEstabReg', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/establishmentRegistration.ejs`)
});
// for directing to the admin registration page
ipcMain.on('reqAdminReg', (event, msg)=>{
    console.log(msg);
    win.loadURL(`file://${__dirname}/views/adminRegistration.ejs`)
});


/*
    #visitorRegistration (visitorRegistrationRenderer.js)
    Below are the handlers for the visitor registration page
*/

// for the request of writing the visitor data into the database
ipcMain.on('writeVisitorData', function (event, entity) {
    visitorRegistrationHandler.registerVisitor(event, entity, win);
});

/*
    #establishmentRegistration (establishmentRegistrationRenderer.js)
    Below are the handlers for the establishment registration page
*/

// for the request of writing the establishment data into the database
ipcMain.on('writeEstabData', function (event, entity) {
    establishmentRegistrationHandler.registerEstablishment(event, entity, win);
});

/*
    #adminRegistration (adminRegistrationRenderer.js)
    Below are the handlers for the admin registration page
*/

// for the request of writing the admin data into the database
ipcMain.on('writeAdminData', function (event, entity) {
    adminRegistrationHandler.registerAdmin(event, entity, win);
});
