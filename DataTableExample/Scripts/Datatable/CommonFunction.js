var table;
var CommonFunction = function (tableName, serverSide, bSortable, ajaxURL) {

    table = $("#" + tableName).DataTable({
        "processing": true,
        "serverSide": serverSide,
        "bSortable": bSortable,
        "ajax": {
            "url": ajaxURL,
            "type": "POST",
            "data": function (result) {
                result.id = 0;
                result.search = $("#" + tableName + "_filter input[type='search']").val();
            },
        },

        "dataSrc": function (response) {
            return response.data;
        },
        "columns": [
            {
                data: "Name",
            },
            {
                data: "Title",
            }
        ],
        "pageLength": 10,
        "LengthMenu": [10, 25, 50],
    });

}