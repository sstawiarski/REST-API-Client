function addPair() : void {
    let addButton: HTMLElement = document.getElementById('addButton');
    if (addButton != null) {
        addButton.remove();
    }
    let subButton: HTMLElement = document.getElementById('subButton');
    if (subButton != null) {
        subButton.remove();
    }
    let pairsForm: HTMLElement = document.querySelector('#requestPairs');
    const newPair: string = `<div class="form-row"><div class="col"><input type="text" class="form-control" id="key" placeholder="Key"></div><div class="col"><input type="text" class="form-control" id="value" placeholder="Value"></div><div id="paramButtons" class="col"><a id="addButton" href="#" onclick="addPair()">(+)</a><a id="subButton" href="#" onclick="removePair()">(-)</a></div></div>`;

    pairsForm.innerHTML += newPair;
}

function removePair() : void {
    const paramForm: HTMLElement = document.getElementById('requestPairs');
    paramForm.removeChild(paramForm.lastChild);
    let newLast = paramForm.lastChild;
    let newLinks = document.createElement("a");
    newLinks.href = "#";
    newLinks.setAttribute("onclick", "addPair()");
    let newText = document.createTextNode("(+)");
    newLinks.appendChild(newText);
    if (newLast != null) {
        paramForm.lastElementChild.appendChild(newLinks);
    }
}

async function sendRequest() {
    const apiURL: string = document.getElementById('apiURL').value;

    if (apiURL == "") {
        let parent = document.getElementById("apiURL").parentElement;
        let div = document.createElement("div");
        div.id = "urlMalformAlert";
        let alert = document.createTextNode("ERROR: no url entered!");
        div.appendChild(alert);
        parent.appendChild(div);
        return;
    }

    const requestType: string = document.getElementById('requestTypeInput').value;

    let requestParams: Object = {};

    let paramRows = document.querySelector("#requestPairs").children;
    let paramArr = [];
    for (let i = 0; i < paramRows.length; i++) {
        let rowArr = [];
        let colRows = paramRows[i].children;
        for (let j = 0; j < colRows.length-1; j++) {
            rowArr.push(colRows[j].firstElementChild.value);
        }
        paramArr.push(rowArr);
    }

    requestParams = paramArr.reduce((a, [key, val]) => {
        a[`"${key}"`] = val;
        return a;
    }, {});

    updateRequest(requestType, apiURL, JSON.stringify(requestParams,null,4));

    let response;
    let data;
    switch (requestType) {
        case "GET":
            response = await fetch(apiURL);
            data = await response.json();
            updateResponse(JSON.stringify(data,null,4));
            break;
        case "PUT":
            response = await fetch(apiURL, {
                method: 'PUT',
                body: JSON.stringify(requestParams),
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                }
            });
            data = await response.json();
            updateResponse(JSON.stringify(data,null,4));
            break;
        case "POST":
            response = await fetch(apiURL, {
                method: 'POST',
                body: JSON.stringify(requestParams)
            });
            data = await response.json();
            updateResponse(JSON.stringify(data,null,4));
            break;
        case "DELETE":
            response = await fetch(apiURL, {
                method: 'DELETE',
                headers: {
                    "Content-type" : "application/json; charset=UTF-8"
                }
            });
            data = await response.json();
            updateResponse(JSON.stringify(data,null,4));
            break;
        default:
            return;
    }
    
} 

async function updateResponse(response: string) {
    let responseContainer = document.getElementById('responseText');

    if (document.getElementById('final-response') != null) {
        responseContainer.removeChild(document.getElementById('final-response'));
    }

    let newPre = document.createElement("pre");
    newPre.setAttribute("id", "final-response");
    newPre.appendChild(document.createTextNode(response));
    responseContainer.appendChild(newPre);
}

async function updateRequest(type: string, URL: string, data: string) {
    let requestContainer = document.getElementById('requestText');

    if (document.getElementById('final-request') != null) {
        requestContainer.removeChild(document.getElementById('final-request'));
    }

    let newPre = document.createElement("pre");
    newPre.setAttribute("id", "final-request");
    let request = `${type}\nURL: ${URL}\nData:\n${data}`;
    newPre.appendChild(document.createTextNode(request));
    requestContainer.appendChild(newPre);
}

function removeWarning() {
        let div = document.getElementById("urlMalformAlert");
        if (div == null) {
            return;
        }
        let parent = document.getElementById("apiURL").parentElement;
        parent.removeChild(div);
}

function submitRequest() {
        sendRequest().catch(function handleError(err) {
            if (err instanceof TypeError) {
                if (err.message == "Cross origin requests are only supported for HTTP.") {
                    displayAlert("Malformed HTTP URL entered");
                } else if (err.message == "A server with the specified hostname could not be found.") {
                    displayAlert("The API URL could not be found. Check spelling and try again");
                } else {
                    alert(err.message);
                }
            } else {
                alert(err.message);
            }
        });
  
}

function displayAlert(text: string) : void {
    let container = document.querySelector('.container');

    let div = document.createElement("div");
    div.className = "alert alert-danger alert-dismissible fade in show";
    div.setAttribute("role", "alert");
    div.id = "error-message";
    div.innerHTML = `<strong>ERROR: </strong> ${text}.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`;
    container.prepend(div);
}