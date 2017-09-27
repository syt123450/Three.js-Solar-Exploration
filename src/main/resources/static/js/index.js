/**
 * Created by ss on 2017/9/25.
 */
$(function() {

    $("body footer div.unchecked").click(function() {
        $("body footer div").each(function() {
            $(this).attr("class", "unchecked");
        });
        $(this).attr("class", "checked");
        var year = $(this).text();
        getYearData(year);
    });
});

function getYearData(year) {

    $.ajax({
        url: "/api/year",
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        async: true,
        data: JSON.stringify({"year": year}),
        dataType: 'json',
        success: function (yearData) {
            console.log(yearData);
        }
    });
}