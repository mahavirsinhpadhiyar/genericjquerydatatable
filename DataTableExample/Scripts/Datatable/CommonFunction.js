var custDatatable;
var ExtRequestType = "GET";
var ExtPageLength = "10";
var ExtLengthMenu = [10, 25, 50];

function Ext1Datatable(tableObj, url, requestType, dynamicColumns) {

    custDatatable = $("#" + tableObj).DataTable({
        "ajax": {
            "url": url,
            "type": ExtRequestType,
            "data": function (result) {
                result.search = $("#" + tableObj + "_filter input[type='search']").val();
            },
        },

        "dataSrc": function (response) {
            return response.data;
        },
        "columns": dynamicColumns[0]
    });
}

function Ext2Datatable(tableObj, serverSide, bSortable, url, requestType, pageLength, lengthMenu, dynamicColumns) {

    if (!requestType == "") {
        ExtRequestType = requestType;
    }

    if (!pageLength == "") {
        ExtPageLength = pageLength;
    }

    if (!lengthMenu == "") {
        ExtLengthMenu = lengthMenu;
    }

    custDatatable = $("#" + tableObj).DataTable({
        "processing": true,
        "serverSide": serverSide,
        "bSortable": bSortable,
        "ajax": {
            "url": url,
            "type": ExtRequestType,
            "data": function (result) {
                result.search = $("#" + tableObj + "_filter input[type='search']").val();
            },
        },

        "dataSrc": function (response) {
            return response.data;
        },
        "columns": dynamicColumns[0],
        "pageLength": ExtPageLength,
        "LengthMenu": ExtLengthMenu,
    });
}

var ColumnNames = function (columns) {
    var obj = [];
    var FinalList = [];
    var newObj = {};
    var list = columns.split(',');
    $.each(list, function (i, val) {
        newObj = {};
        newObj["data"] = val;
        obj.push(newObj);
    });
    FinalList.push(obj);
    return FinalList;
}

var ColumnWithCustomProperties = function (CustomProperty) {
    var ColumnsFromUser = {};
    ColumnsFromUser["\"columns\""] = CustomProperty;
    return CustomProperty;
}