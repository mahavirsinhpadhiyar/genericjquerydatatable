var table;
var CommonFunction = function (tableName, serverSide, bSortable, ajaxURL, dynamicColumns) {
    table = $("#" + tableName).DataTable({
        "processing": true,
        "serverSide": serverSide,
        "bSortable": bSortable,
        "ajax": {
            "url": ajaxURL,
            "type": "POST",
            "data": function (result) {
                result.search = $("#" + tableName + "_filter input[type='search']").val();
            },
        },

        "dataSrc": function (response) {
            return response.data;
        },
        "columns": dynamicColumns[0],
        "pageLength": 10,
        "LengthMenu": [10, 25, 50],
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