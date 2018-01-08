"use strict"

let {ipcRenderer, remote} = require('electron');
let LoadData = require("./classes/LoadData.js");
let EditXML = require("./classes/EditXML.js");

let elTabelTabRulesSelector = document.getElementById("rules-tab");
let elTabelTabClausesSelector = document.getElementById("clauses-tab");

let objKnowledgeBase = null;

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
        ipcRenderer.send('load-file', path);
    }
);

// Load data to table
ipcRenderer.on("display", (event, arg) => {
    console.log(arg);

    objKnowledgeBase = arg;

    let objFacts = arg["knowledge-base"].facts;
    let objRules = arg["knowledge-base"].rules;

    LoadData.handleFacts(objFacts);
    LoadData.handleRules(objRules);
});

//Log requests from main process
ipcRenderer.on("log", (event, arg) => {
    console.log(arg);
});

let path;
let elInputChooseFile = document.getElementById("chooseFile");
elInputChooseFile.addEventListener(
    "change",
    function(event){
        event.preventDefault();

        let filename;
        path = filename = elInputChooseFile.value;

        filename = path.replace("C:\\fakepath\\", "");
        path = path.replace("C:\\fakepath\\", `${__dirname}\\`);

        document.getElementById("noFile").innerHTML = filename.length < 10 ? `filename: ${filename}` :  filename;
    }
);


// Get the modal
let factsModal = document.getElementById('facts-modal');
let rulesModal = document.getElementById('rules-modal');

// Get the button that opens the modal
let btnAddRule = document.getElementById("add-rule");
let btnAddFact = document.getElementById("add-fact");


// Get the <span> element that closes the modal
let spanRule = document.getElementsByClassName("close")[0];
let spanFact = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btnAddRule.onclick = function() {
    rulesModal.style.display = "block";
};

btnAddFact.onclick = function() {
    factsModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
spanRule.onclick = function() {
    rulesModal.style.display = "none";    
};

spanFact.onclick = function() {
    factsModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == factsModal || event.target == rulesModal) {
        factsModal.style.display = "none";
        rulesModal.style.display = "none";
    }
};

// Change content of modal selection based on top selection
let elFactSelection =  document.getElementById("exampleSelect1");
elFactSelection.addEventListener(
    "change",
    function(event){
        event.preventDefault();

        if(elFactSelection.value == "Destroy")
        {
            document.getElementById("subselect-destroy").style.display = "block";
            document.getElementById("subselect-unit").style.display = "none";
        }

        if(elFactSelection.value == "Unit")
        {
            document.getElementById("subselect-destroy").style.display = "none";
            document.getElementById("subselect-unit").style.display = "block";
        }
    }
);

// Event for modal fact accept button
let elAcceptFact = document.getElementById("accept-rule");
elAcceptFact.addEventListener(
    "click",
    function(event){
        event.preventDefault();

        //Edit the object create from XML
        EditXML.addFactItem(objKnowledgeBase, ipcRenderer);

        factsModal.style.display = "none";
    }
);
