 $(function () {
        var d_carrefour = [[0, 0]];
        var d_extra = [[0, 0]];
        var d_stmarche = [[0, 0]];
        var d_wallmart = [[0, 0]];
        var d_dia = [[0, 0]];
        var d_pao_de_acucar = [[0, 0]];

        function randomIntFromInterval(min,max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        }

        for (var i = 1; i < 9; i++) {
            // d_extra = [[0, 0], [1, -23], [2, -40], [3, -20], [4, -40], [5, 20], [6, 0], [7, 0]];

            d_carrefour.push([i, randomIntFromInterval(-60, 40)]);
            d_extra.push([i, randomIntFromInterval(-60, 40)]);
            d_stmarche.push([i, randomIntFromInterval(-60, 40)]);
            d_wallmart.push([i, randomIntFromInterval(-60, 40)]);
            d_dia.push([i, randomIntFromInterval(-60, 40)]);
            d_pao_de_acucar.push([i, randomIntFromInterval(-60, 40)]);
        }

        console.log(d_carrefour);

        var datasets = {
            "Carrefour": {
                label: "Carrefour",
                data: d_carrefour,
                points: { show: true },
                lines: { show: true },
            },
            "Extra": {
                label: "Extra",
                data: d_extra,
                points: { show: true },
                lines: { show: true },
            },
            "St. Marche": {
                label: "St. Marche",
                data: d_stmarche,
                points: { show: true },
                lines: { show: true },
            },
            "Wall Mart": {
                label: "Wall Mart",
                data: d_wallmart,
                points: { show: true },
                lines: { show: true },
            },
            "Dia": {
                label: "Dia",
                data: d_dia,
                points: { show: true },
                lines: { show: true },
            },
            "Pão de Açucar": {
                label: "Pão de Açucar",
                data: d_pao_de_acucar,
                points: { show: true },
                lines: { show: true },
            }
        };

        var i = 0;
        $.each(datasets, function(key, val) {
            val.color = i;
            ++i;
        });

        var choiceContainer = $("#choices");

        $.each(datasets, function(key, val) {
            choiceContainer.append('&nbsp;&nbsp;<input type="checkbox" name="' + key +
                                '" checked="checked" id="id' + key + '">' +
                                '<label for="id' + key + '">'
                                    + val.label + '</label>');
        });

        choiceContainer.find("input").click(plotAccordingToChoices);

        function plotAccordingToChoices() {
            var data = [];

            choiceContainer.find("input:checked").each(function () {
                var key = $(this).attr("name");
                if (key && datasets[key])
                    data.push(datasets[key]);
            });

            if (data.length > 0)
                $.plot($("#placeholder"), data, {
                    yaxis: {
                        ticks: [[0, '0'], [20, '20%'], [40, '40%'],
                        [-20, '-20%'], [-40, '-40%'], [-60, '-60%']],
                            min: -60,
                            max: 40
                        },
                    xaxis: {
                        show: true,
                        position: "bottom",
                        min: null,
                        max: 8,
                        ticks: [[1, "Out 1"],
                            [2, "Out 2"],
                            [3, "Out 3"],
                            [4, "Out 4"],
                            [5, "Out 5"],
                            [6, "Out 6"],
                            [7, "Out 7"],
                            [8, "Out 8"]],
                        tickColor: "#efefef"
                    },
                    grid: { hoverable: true, clickable: true },
                });
        }

        function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css( {
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 5,
                border: '1px solid #fdd',
                padding: '2px',
                'background-color': '#fee',
                opacity: 0.80
            }).appendTo("body").fadeIn(200);
        }

        var previousPoint = null;
        $("#placeholder").bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));

                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();

                        var x = item.datapoint[0],
                            y = item.datapoint[1];

                        showTooltip(item.pageX, item.pageY,
                                    item.series.label + " em " + x + " Out: " + y + '%');
                    }
                }
                else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
        });

        plotAccordingToChoices();
    });