/**
 * Created by ss on 2017/9/25.
 */

//beijing, San Jose, mosiko, paris
var geographicData = [
    {latitude: 39.92, longitude: 116.46},
    {latitude: 37.3382, longitude: -121.8863},
    {latitude: 55.45, longitude: 37.35},
    {latitude: 49, longitude: 2}
];

var googleEarth = false;

$(function () {

    $("body footer div.unchecked").click(function () {
        $("body footer div").each(function () {
            $(this).attr("class", "unchecked");
        });
        $(this).attr("class", "checked");
        var year = $(this).text();

        if(!googleEarth) {
            getYearData(year);
        } else {
            googleEarth = false;

        }

        if (googleEarth) {

        }

    });
});

function getYearData(year) {

    if(Math.random() > 0.5) {
        earthSceneController.addCones(geographicData);
    } else {
        earthSceneController.clearCones();
    }
}