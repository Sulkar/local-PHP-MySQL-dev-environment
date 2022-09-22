<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>local php mysql dev environment</title>
    <!-- CSS -->

    <link href="/css/index.css" rel="stylesheet">

</head>

<body class="">
    <!-- alerts -->
    <div id="head_error" class="hide" style=""></div>
    <div id="head_success" class="hide" style=""></div>

    <div>
        <h2>local php mysql dev environment</h2>
        <div>
            <ol>
                <li>Create a new table in database: 'tutorial' (for more information see: docker-compose.yml)</li>
            </ol>
        </div>
        <div class="">
            <a href="#" id="btnSqlSelect">Select</a> |
            <a href="#" id="btnSqlInsertValues">Insert Values</a> |
            <a href="#" id="btnSqlAddColumn">Add Column</a> |
            <a href="#" id="btnSqlRemoveColumn">Remove Column</a> |
            <a href="#" id="btnSqlCreateTable">Create Table</a> |
            <a href="#" id="btnSqlDropTable">Drop Table</a> |
            <a href="#" id="btnSqlAlterColumn">Alter Column</a> |
            <a href="#" id="btnSqlFindDuplicates">Find Duplicates</a>
        </div>

        <textarea class="" id="txtSQLData" rows="8">SELECT * FROM users</textarea>
    </div>
    <div>
        <button id="btnExecuteSQL">execute sql</button>
    </div>

    <div id="loaderDIV"></div>

    <div>
        <table class="" id="dataTable">
        </table>
    </div>
    <!-- JavaScript -->
    <script src="/js/global.js"></script>
    <script src="/js/index.js"></script>

</body>

</html>