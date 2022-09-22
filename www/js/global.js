/**
 *  Global Javascript, available from all files
 *  all functions have the prefix "global"
 */
var LOADING = false;

//universal Create Element function
function globalCreateElement(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string" && typeof child != "number" && child != null) {
      dom.appendChild(child);
    } else {
      dom.appendChild(document.createTextNode(child));
    }
  }
  return dom;
}
//create loader spinner
function globalShowLoader(parentElementID) {
  let parent = document.getElementById(parentElementID);
  let loader = globalCreateElement(
    "div",
    {
      id: "loader",
      className: "d-flex justify-content-center align-items-center my-2",
    },
    //child 1
    globalCreateElement("div", { className: "spinner-border text-success", role: "status" }, globalCreateElement("span", { className: "visually-hidden" }, "Loading...")),
    //child 2
    globalCreateElement("span", { className: "ms-2 text-success" }, "Loading...")
  );

  parent.appendChild(loader);
  LOADING = true;
}
function globalHideLoader(parentElementID) {
  let parent = document.getElementById(parentElementID);
  parent.innerHTML = "";
  LOADING = false;
}
function globalIsLoading() {
  return LOADING;
}
// header error DIV
function globalShowError(message) {
  let errorDiv = document.getElementById("head_error");
  errorDiv.classList.remove("hide");
  errorDiv.innerHTML = message;
  globalHideSuccess();
}
function globalHideError() {
  let errorDiv = document.getElementById("head_error");
  errorDiv.classList.add("hide");
}
// header success DIV
function globalShowSuccess(message) {
  let errorDiv = document.getElementById("head_success");
  errorDiv.classList.remove("hide");
  errorDiv.innerHTML = message;
  globalHideError();
}
function globalHideSuccess() {
  let errorDiv = document.getElementById("head_success");
  errorDiv.classList.add("hide");
}

// universal CRUD function
async function globalDatabaseCRUD(query) {
  return fetch("./db/db_CRUD.php", {
    method: "post",
    body: JSON.stringify(query),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch(function (error) {
      return error;
    });
}
//global function to get columns of table data
function globalGetTableColumns(data) {
  return Object.keys(data[0]);
}

//get column names from data result
function globalGetColumnNames(values) {
  if (values[0] != undefined) {
    return Object.keys(values[0]);
  } else {
    return [];
  }
}

//get all tables from database
async function globalGetTableNames() {
  let sqlQuery = "SHOW TABLES";
  let data = await globalDatabaseCRUD(sqlQuery);
  let tableArray = [];
  if (data["error"] == "") {
    data.result.forEach((element) => {
      tableArray.push(Object.values(element)[0]);
    });
  } else {
    globalShowError(data["error"]["errorInfo"]);
  }

  return tableArray;
}
