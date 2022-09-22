//insert SQL Commands
document.getElementById("btnSqlSelect").addEventListener("click", function () {
  document.getElementById("txtSQLData").value = "SELECT * FROM users";
});
document.getElementById("btnSqlInsertValues").addEventListener("click", function () {
  document.getElementById("txtSQLData").value =
    "INSERT INTO users (firstname, lastname, password, email)\nVALUES\n('Richi', 'Scheggy', '12345', 'richi@example.com'),\n('Simi', 'Müller', '12345', 'simi@example.com');";
});
document.getElementById("btnSqlAddColumn").addEventListener("click", function () {
  document.getElementById("txtSQLData").value = "ALTER TABLE users ADD COLUMN klasse VARCHAR(10) AFTER email;";
});
document.getElementById("btnSqlRemoveColumn").addEventListener("click", function () {
  document.getElementById("txtSQLData").value = "ALTER TABLE users DROP COLUMN klasse;";
});
document.getElementById("btnSqlCreateTable").addEventListener("click", function () {
  document.getElementById("txtSQLData").value =
    "CREATE TABLE users (\n id INT(6) AUTO_INCREMENT PRIMARY KEY,\n firstname VARCHAR(30),\n lastname VARCHAR(30),\n password varchar(100),\n email VARCHAR(50)\n);";
});
document.getElementById("btnSqlDropTable").addEventListener("click", function () {
  document.getElementById("txtSQLData").value = "DROP TABLE users;";
});
document.getElementById("btnSqlAlterColumn").addEventListener("click", function () {
  document.getElementById("txtSQLData").value = "ALTER TABLE users MODIFY email TEXT;";
});
document.getElementById("btnSqlFindDuplicates").addEventListener("click", function () {
  document.getElementById("txtSQLData").value = "SELECT COUNT(*), firstname, lastname FROM users group by firstname, lastname\nHAVING count(*) > 1;";
});

//execute SQL Button
document.getElementById("btnExecuteSQL").addEventListener("click", function () {
  globalShowLoader("loaderDIV");
  resetDataTable("dataTable");
  let sqlQuery = document.getElementById("txtSQLData").value;

  let columnNames = undefined;
  let sqlStatementType = undefined;
  let currentTableName = undefined;

  (async () => {
    let data = await globalDatabaseCRUD(sqlQuery);

    if (data["error"] == "") {
      //what happened SELECT, CREATE, ...
      if (sqlQuery.match(/CREATE TABLE/i)) {
        sqlStatementType = "CREATE";
        currentTableName = sqlQuery.match(/CREATE TABLE\s(\w+)/i)[1];
      } else if (sqlQuery.match(/INSERT INTO\s/i)) {
        sqlStatementType = "INSERT INTO";
        currentTableName = sqlQuery.match(/INSERT INTO\s(\w+)/i)[1];
      } else if (sqlQuery.match(/SELECT/i)) {
        sqlStatementType = "SELECT";
        currentTableName = sqlQuery.match(/FROM\s(\w+)/i)[1];
      } else if (sqlQuery.match(/DROP TABLE/i)) {
        sqlStatementType = "DROP TABLE";
        currentTableName = sqlQuery.match(/DROP TABLE\s(\w+)/i)[1];
      }

      globalHideError();
      if (sqlStatementType == "SELECT") {
        let values = data["result"];
        columnNames = globalGetColumnNames(values);
        createDataTable("dataTable", values, columnNames);
      } else if (sqlStatementType == "CREATE") {
        globalShowSuccess("Table " + currentTableName + " created successfully.");
      } else if (sqlStatementType == "DROP TABLE") {
        globalShowSuccess("Table " + currentTableName + " deleted successfully.");
      } else if (sqlStatementType == "INSERT INTO") {
        globalShowSuccess("Values inserted into " + currentTableName + " successfully.");
      }
      globalHideLoader("loaderDIV");
    } else {
      globalShowError(data["error"]["errorInfo"]);
      globalHideLoader("loaderDIV");
    }
    //log db data
    console.log(data);
  })();
});

function resetDataTable(tableId) {
  document.getElementById(tableId).innerHTML = "";
}

function createDataTable(tableId, dataValues, columnNames) {
  let dataTable = document.getElementById(tableId);
  dataTable.innerHTML = "";
  let dataTableHead = globalCreateElement("thead", {});
  let dataTableTr = globalCreateElement("tr", {});
  //create header columns
  columnNames.forEach((column) => {
    dataTableTr.appendChild(globalCreateElement("th", {}, column));
  });
  dataTableHead.appendChild(dataTableTr);
  dataTable.appendChild(dataTableHead);

  //create rows with items
  let dataTableBody = globalCreateElement("tbody", {});
  dataValues.forEach((row) => {
    let dataTableBodyTr = globalCreateElement("tr", {});
    Object.values(row).forEach((item) => {
      dataTableBodyTr.appendChild(globalCreateElement("td", { dataTest: "2" }, item));
    });
    dataTableBody.appendChild(dataTableBodyTr);
  });

  dataTable.appendChild(dataTableBody);
}
