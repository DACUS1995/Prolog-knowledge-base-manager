"use strict"

let fs = require('fs'), 
    xml2js = require('xml2js'),
    convert = require("xml-js");
    
module.exports = 
{
    mainWindow: null,
    strFileName: null,
    
    setMainWindow: function(mainWindow)
    {
        this.mainWindow = mainWindow
    },

    logToRenderer: function(strLog)
    {
        this.mainWindow.webContents.send("log", strLog);
    },

    displayToRenderer: function(data)
    {
        this.mainWindow.webContents.send("display", data);
    },

    readAndParse: function(strFileName)
    {
        
        let parser = new xml2js.Parser();
        fs.readFile(strFileName, "utf8", (err, data) => {
            parser.parseString(data, (err, result) => {
                this.logToRenderer(result);
            });
        });
    },
    
    readAndParseExtended: function(strFileName)
    {
        this.strFileName = strFileName;

        fs.readFile(strFileName, "utf8", (err, data) => {
            let result = convert.xml2js(data, {compact: true, spaces: 4});
            // this.logToRenderer(result);
            this.displayToRenderer(result);
        });
    },

    saveFileToXML: function(objXMLKnowledgeBase)
    {
        //First the object must be converted
        let options = {compact: true, spaces: 4};
        
        let strXMLKnowledgeBase = convert.js2xml(objXMLKnowledgeBase, options);
        fs.writeFileSync(this.strFileName, strXMLKnowledgeBase);
        
        this.readAndParseExtended(this.strFileName);
    }
};