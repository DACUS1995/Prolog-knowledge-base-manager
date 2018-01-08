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
        let strName = document.getElementById("exampleSelect4").value;
        let strRace = document.getElementById("exampleSelect5").value;
        let strCost = document.getElementById("exampleSelect6").value;

        objKnowledgeBase["knowledge-base"].facts.unit.push(
            {
                    cost: {
                        _text: strCost
                    },
                    name: {
                        _text: strName
                    },
                    race: {
                        _text: strRace
                    }
            }
        );
    }

    editXML.saveToFile(objKnowledgeBase, ipcRenderer);
}

editXML.addRuleItem = function(objKnowledgeBase, ipcRenderer)
{
    let strIfFirstUnit = document.getElementById("inputSmall1").value;
    let strIfRelation = document.getElementById("inputSmall2").value;
    let strIfSecondUnit = document.getElementById("inputSmall3").value;
    let strThenFirstUnit = document.getElementById("inputSmall4").value;    
    let strThenRelation = document.getElementById("inputSmall5").value;
    let strThenSecondUnit = document.getElementById("inputSmall6").value;
    
    objKnowledgeBase["knowledge-base"].rules.rule.push(
        {
            if: {
                first:{
                    _text:strIfFirstUnit
                },
                rel:{
                    _text:strIfRelation
                },
                second:{
                    _text:strIfSecondUnit
                }
            },
            then: {
                first:{
                    _text:strThenFirstUnit
                },
                rel:{
                    _text:strThenRelation
                },
                second:{
                    _text:strThenSecondUnit
                }
            }
        }
    );

    editXML.saveToFile(objKnowledgeBase, ipcRenderer);
}

//Must be called everytime a modification is made to ensure the same state
editXML.saveToFile = function(objKnowledgeBase, ipcRenderer)
{
    ipcRenderer.send('save-file', objKnowledgeBase);
}

module.exports = editXML;