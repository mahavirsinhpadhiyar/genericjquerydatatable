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

function Ext2Datatable(tableObj, serverSide, bSortable, url, requestType, pageLength, lengthMenu, columnDefs) {
    debugger;
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
        "columns": GetColumnData(),
        columnDefs: columnDefs,
        "pageLength": ExtPageLength,
        "LengthMenu": ExtLengthMenu,
    });
}

var GetColumnData = function () {
    var data = [];
    $.ajax({
        url: columnPropertyURL,
        dataType: "json",
        type: "GET",
        async: false,
        success: function (response) {
            for (var i = 0; i < response.length; i++) {
                data.push(response[i]);
            }
        }
    });
    return data;
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
