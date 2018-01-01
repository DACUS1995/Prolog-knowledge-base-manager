"use strict"

let fs = require('fs'), 
    xml2js = require('xml2js');

module.exports = 
{
    mainWindow: null,
    
    setMainWindow: function(mainWindow)
    {
        this.mainWindow = mainWindow
    },

    logToRenderer: function(strLog)
    {
        this.mainWindow.webContents.send("log", strLog);
    },

    readAndParse: function(strFileName)
    {
        let parser = new xml2js.Parser();
        fs.readFile(strFileName, "utf8", (err, data) => {
            parser.parseString(data, (err, result) => {
                this.logToRenderer(result);
            });
        });
    }
};