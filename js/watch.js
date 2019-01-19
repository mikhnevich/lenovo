$(document).ready(function () {

    $.fn.dataTable.ext.errMode = 'throw';

	$("#timestampDiv").load("/timestamp");
	$("#countDiv").load("/count");
	
    var table = $('#resultsTable').DataTable({
        "ajax": "/results",
        "responsive": true,
        "pagingType": "numbers",
        "order": [[2, 'asc']],
        "columns": [
            {
                "data": "model",
                "orderable": true,
                "responsivePriority": 0
            },
            {
                "data": "condition",
                "orderable": false,
                "responsivePriority": 3
            },
            {
                "data": "price",
                "orderable": true,
                "responsivePriority": 1
            },
            {
                "data": "discount",
                "orderable": false,
                "responsivePriority": 1
            },
            {
                "data": "availability",
                "orderable": false,
                "responsivePriority": 1
            },
            {
                "data": "cpu",
                "orderable": false,
                "responsivePriority": 2
            },
            {
                "data": "memory",
                "orderable": false,
                "responsivePriority": 2
            },
            {
                "data": "display",
                "orderable": false,
                "responsivePriority": 2
            },
            {
                "data": "storage",
                "orderable": false,
                "responsivePriority": 2
            },
            {
                "data": "wlan",
                "orderable": false,
                "responsivePriority": 2
            },
            {
                "data": "url",
                "render": function (data, type, row, meta) {
                    if (type === 'display') {
                        if (row.availability.toLowerCase().includes("out of stock")) {
                            data = '<a class="btn btn-light" href="' + data + '">' + "Order" + '</a>';
                        } else {
                            data = '<a class="btn btn-primary" href="' + data + '">' + "Order" + '</a>';
                        }
                    }
                    return data;
                },
                "orderable": false,
                "responsivePriority": 0

            }
        ]
    });

    var conditionSelector = '#condition-filter .btn';
    $(conditionSelector).on('click', function () {
        search(this, 1);
        active(conditionSelector, this);
    });

    var modelSelector = '#model-filter .btn';
    $(modelSelector).on('click', function () {
        search(this, 0);
        active(modelSelector, this);
    });

    var driveSelector = '#drive-filter .btn';
    $(driveSelector).on('click', function () {
        search(this, 8);
        active(driveSelector, this);
    });

    var displaySelector = "#display-filter .btn"
    $(displaySelector).on('click', function() {
	search(this, 7);
	active(displaySelector, this);	
    });

    var memorySelector = '#memory-filter .btn';
    $(memorySelector).on('click', function () {
        search(this, 6);
        active(memorySelector, this);
    });

    var processorSelector = '#processor-filter .btn';
    $(processorSelector).on('click', function () {
        search(this, 5);
        active(processorSelector, this);
    });

    function search(button, column) {
        if (button.innerText === "All") {
            table.column(column).search('').draw();
        } else {
            table.column(column).search(button.innerText, false, false).draw();
        }
    }


    function active(all, active) {
        if ($(active).is("active"))
            $(all).not(active).removeClass('active');
        else
            $(active).addClass('active');

        $(all).not(active).removeClass('active');
    }

});