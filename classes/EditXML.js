function editXML(){};

editXML.addFactItem = function(objKnowledgeBase, ipcRenderer)
{
    //For the moment no single-value check YOLO
    let elFactType = document.getElementById("exampleSelect1");

    if(elFactType.value == "Destroy")
    {
        let strFirstUnit = document.getElementById("exampleSelect2").value;
        let strSecondUnit = document.getElementById("exampleSelect3").value;

        objKnowledgeBase["knowledge-base"].facts.destroy.push(
            {
                    unit1: {
                        _text: strFirstUnit
                    },
                    unit2: {
                        _text: strSecondUnit
                    }
            }
        );
    }

    if(elFactType.value == "Unit")
    {
        let strName = document.getElementById("exampleSelect4");
        let strRace = document.getElementById("exampleSelect5");
        let strCost = document.getElementById("exampleSelect6");

        objKnowledgeBase["knowledge-base"].facts.unit.push(
            {
                    cost: {
                        _text: strName
                    },
                    name: {
                        _text: strRace
                    },
                    race: {
                        _text: strCost
                    }
            }
        );
    }

    console.log(objKnowledgeBase);
    editXML.saveToFile(objKnowledgeBase, ipcRenderer);
}

//Must be called everytime a modification is made to ensure the same state
editXML.saveToFile = function(objKnowledgeBase, ipcRenderer)
{
    ipcRenderer.send('save-file', objKnowledgeBase);
}

module.exports = editXML;