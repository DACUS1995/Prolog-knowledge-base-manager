function LoadData(){};

LoadData.handleFacts = function(objFacts){
    let elDivTable = document.getElementById("clauses");
    let elTableBody = elDivTable.getElementsByTagName("tbody")[0];

    let newBody = "";

    for(let fact in objFacts)
    {
        if(fact == "destroy")
        {
            // If array then there are multiple facts of the same type
            if(Array.isArray(objFacts[fact]))
            {
                for(let i of objFacts[fact])
                {
                    newBody += `
                    <tr>
                        <td>${i.unit1._text}</td>
                        <td>Destroys</td>
                        <td>${i.unit2._text}</td>
                    </tr>`;
                }

            }
            else
            {
                newBody += `
                <tr>
                    <td>${objFacts[fact].unit1._text}</td>
                    <td>Destroys</td>
                    <td>${objFacts[fact].unit2._text}</td>
                </tr>`;
            }
        }

        if(fact == "unit")
        {
            // If array then there are multiple rules of the same type
            if(Array.isArray(objFacts[fact]))
            {
                for(let i of objFacts[fact])
                {
                    newBody += `
                    <tr>
                        <td>${i.name._text}</td>
                        <td>Costs</td>
                        <td>${i.cost._text}</td>
                    </tr>
                    <tr>
                        <td>${i.name._text}</td>
                        <td>Race</td>
                        <td>${i.race._text}</td>
                    </tr>
                    `;
                }

            }
            else
            {
                newBody += `
                <tr>
                    <td>${objFacts[fact].name._text}</td>
                    <td>Costs</td>
                    <td>${objFacts[fact].cost._text}</td>
                </tr>
                <tr>
                    <td>${objFacts[fact].name._text}</td>
                    <td>Race</td>
                    <td>${objFacts[fact].race._text}</td>
                </tr>
                `;
            }
        }
    }

    console.log(newBody);

    elTableBody.innerHTML = newBody;
};

LoadData.handleRules =  function(objRules){

}

module.exports = LoadData;