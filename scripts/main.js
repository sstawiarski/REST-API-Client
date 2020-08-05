var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function addPair() {
    var addButton = document.getElementById('addButton');
    if (addButton != null) {
        addButton.remove();
    }
    var subButton = document.getElementById('subButton');
    if (subButton != null) {
        subButton.remove();
    }
    var pairsForm = document.querySelector('#requestPairs');
    var newPair = "<div class=\"form-row\"><div class=\"col\"><input type=\"text\" class=\"form-control\" id=\"key\" placeholder=\"Key\"></div><div class=\"col\"><input type=\"text\" class=\"form-control\" id=\"value\" placeholder=\"Value\"></div><div id=\"paramButtons\" class=\"col\"><a id=\"addButton\" href=\"#\" onclick=\"addPair()\">(+)</a><a id=\"subButton\" href=\"#\" onclick=\"removePair()\">(-)</a></div></div>";
    pairsForm.innerHTML += newPair;
}
function removePair() {
    var paramForm = document.getElementById('requestPairs');
    paramForm.removeChild(paramForm.lastChild);
    var newLast = paramForm.lastChild;
    var newLinks = document.createElement("a");
    newLinks.href = "#";
    newLinks.setAttribute("onclick", "addPair()");
    var newText = document.createTextNode("(+)");
    newLinks.appendChild(newText);
    if (newLast != null) {
        paramForm.lastElementChild.appendChild(newLinks);
    }
}
function sendRequest() {
    return __awaiter(this, void 0, void 0, function () {
        var apiURL, parent_1, div, alert_1, requestType, requestParams, paramRows, paramArr, i, rowArr, colRows, j, response, data, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    apiURL = document.getElementById('apiURL').value;
                    if (apiURL == "") {
                        parent_1 = document.getElementById("apiURL").parentElement;
                        div = document.createElement("div");
                        div.id = "urlMalformAlert";
                        alert_1 = document.createTextNode("ERROR: no url entered!");
                        div.appendChild(alert_1);
                        parent_1.appendChild(div);
                        return [2 /*return*/];
                    }
                    requestType = document.getElementById('requestTypeInput').value;
                    requestParams = {};
                    paramRows = document.querySelector("#requestPairs").children;
                    paramArr = [];
                    for (i = 0; i < paramRows.length; i++) {
                        rowArr = [];
                        colRows = paramRows[i].children;
                        for (j = 0; j < colRows.length - 1; j++) {
                            rowArr.push(colRows[j].firstElementChild.value);
                        }
                        paramArr.push(rowArr);
                    }
                    requestParams = paramArr.reduce(function (a, _a) {
                        var key = _a[0], val = _a[1];
                        a["\"" + key + "\""] = val;
                        return a;
                    }, {});
                    updateRequest(requestType, apiURL, JSON.stringify(requestParams, null, 4));
                    _a = requestType;
                    switch (_a) {
                        case "GET": return [3 /*break*/, 1];
                        case "PUT": return [3 /*break*/, 4];
                        case "POST": return [3 /*break*/, 7];
                        case "DELETE": return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 13];
                case 1: return [4 /*yield*/, fetch(apiURL)];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    updateResponse(JSON.stringify(data, null, 4));
                    return [3 /*break*/, 14];
                case 4: return [4 /*yield*/, fetch(apiURL, {
                        method: 'PUT',
                        body: JSON.stringify(requestParams),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })];
                case 5:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 6:
                    data = _b.sent();
                    updateResponse(JSON.stringify(data, null, 4));
                    return [3 /*break*/, 14];
                case 7: return [4 /*yield*/, fetch(apiURL, {
                        method: 'POST',
                        body: JSON.stringify(requestParams)
                    })];
                case 8:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 9:
                    data = _b.sent();
                    updateResponse(JSON.stringify(data, null, 4));
                    return [3 /*break*/, 14];
                case 10: return [4 /*yield*/, fetch(apiURL, {
                        method: 'DELETE',
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })];
                case 11:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 12:
                    data = _b.sent();
                    updateResponse(JSON.stringify(data, null, 4));
                    return [3 /*break*/, 14];
                case 13: return [2 /*return*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function updateResponse(response) {
    return __awaiter(this, void 0, void 0, function () {
        var responseContainer, newPre;
        return __generator(this, function (_a) {
            responseContainer = document.getElementById('responseText');
            if (document.getElementById('final-response') != null) {
                responseContainer.removeChild(document.getElementById('final-response'));
            }
            newPre = document.createElement("pre");
            newPre.setAttribute("id", "final-response");
            newPre.appendChild(document.createTextNode(response));
            responseContainer.appendChild(newPre);
            return [2 /*return*/];
        });
    });
}
function updateRequest(type, URL, data) {
    return __awaiter(this, void 0, void 0, function () {
        var requestContainer, newPre, request;
        return __generator(this, function (_a) {
            requestContainer = document.getElementById('requestText');
            if (document.getElementById('final-request') != null) {
                requestContainer.removeChild(document.getElementById('final-request'));
            }
            newPre = document.createElement("pre");
            newPre.setAttribute("id", "final-request");
            request = type + "\nURL: " + URL + "\nData:\n" + data;
            newPre.appendChild(document.createTextNode(request));
            requestContainer.appendChild(newPre);
            return [2 /*return*/];
        });
    });
}
function removeWarning() {
    var div = document.getElementById("urlMalformAlert");
    if (div == null) {
        return;
    }
    var parent = document.getElementById("apiURL").parentElement;
    parent.removeChild(div);
}
function submitRequest() {
    sendRequest()["catch"](function handleError(err) {
        if (err instanceof TypeError) {
            if (err.message == "Cross origin requests are only supported for HTTP.") {
                displayAlert("Malformed HTTP URL entered");
            }
            else if (err.message == "A server with the specified hostname could not be found.") {
                displayAlert("The API URL could not be found. Check spelling and try again.");
            }
            else {
                alert(err.message);
            }
        }
        else {
            alert(err.message);
        }
    });
}
function displayAlert(text) {
    var container = document.querySelector('.container');
    var div = document.createElement("div");
    div.className = "alert alert-danger alert-dismissible fade in show";
    div.setAttribute("role", "alert");
    div.id = "error-message";
    div.innerHTML = "<strong>ERROR: </strong> " + text + ".<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
    container.prepend(div);
}
