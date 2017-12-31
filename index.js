"use strict"

var {ipcRenderer, remote} = require('electron');

let elTabelTabRulesSelector = document.getElementById("rules-tab");
let elTabelTabClausesSelector = document.getElementById("clauses-tab");

elTabelTabRulesSelector.addEventListener(
    "click",
    event => {
        if(!elTabelTabRulesSelector.classList.contains("active"))
        {
            elTabelTabRulesSelector.classList.add("active");
            elTabelTabClausesSelector.classList.remove("active");

            document.getElementById(elTabelTabRulesSelector.href.split("#")[1]).classList.add(
                "active", "show"
            );

            document.getElementById(elTabelTabClausesSelector.href.split("#")[1]).classList.remove(
                "active", "show"
            );
        }
    }
);

elTabelTabClausesSelector.addEventListener(
    "click",
    event => {
        if(!elTabelTabClausesSelector.classList.contains("active"))
        {
            elTabelTabRulesSelector.classList.remove("active");
            elTabelTabClausesSelector.classList.add("active");

            document.getElementById(elTabelTabRulesSelector.href.split("#")[1]).classList.remove(
                "active", "show"
            );

            document.getElementById(elTabelTabClausesSelector.href.split("#")[1]).classList.add(
                "active", "show"
            );
        }
    }
);

let elButtonLoadFile = document.getElementById("load-file");
elButtonLoadFile.addEventListener(
    "click",
    event => {
        console.log("Cliked")
        ipcRenderer.send('load-file', "test.xml");
    }
);

//Log requests from main process
ipcRenderer.on("log", (event, arg) => {
    console.log(arg);
});