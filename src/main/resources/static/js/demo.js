/**
 * Created by ss on 2017/10/30.
 */

$(function () {

    googleEarth = false;
    infoBoard = false;

    renderer = SolarEPUtils.getDefaultRenderer();

    solarSystemSceneController = new SolarSystemSceneController(renderer);
    mercurySceneController = new MercurySceneController(renderer);
    venusSceneController = new VenusSceneController(renderer);
    earthSceneController = new EarthSceneController(renderer);
    marsSceneController = new MarsSceneController(renderer);
    jupiterSceneController = new JupiterSceneController(renderer);
    saturnSceneController = new SaturnSceneController(renderer);
    uranusSceneController = new UranusSceneController(renderer);
    neptuneSceneController = new NeptuneSceneController(renderer);
    plutoSceneController = new PlutoSceneController(renderer);

    //use for old version
    // solarSystemSceneController.setPlanetScene("Mercury", mercurySceneController);
    // solarSystemSceneController.setPlanetScene("Venus", venusSceneController);
    // solarSystemSceneController.setPlanetScene("Earth", earthSceneController);
    // solarSystemSceneController.setPlanetScene("Mars", marsSceneController);
    // solarSystemSceneController.setPlanetScene("Jupiter", jupiterSceneController);
    // solarSystemSceneController.setPlanetScene("Saturn", saturnSceneController);
    // solarSystemSceneController.setPlanetScene("Uranus", uranusSceneController);
    // solarSystemSceneController.setPlanetScene("Neptune", neptuneSceneController);
    // solarSystemSceneController.setPlanetScene("Pluto", plutoSceneController);

    solarSystemSceneController.setPlanetScene("mercury", mercurySceneController);
    solarSystemSceneController.setPlanetScene("venus", venusSceneController);
    solarSystemSceneController.setPlanetScene("earth", earthSceneController);
    solarSystemSceneController.setPlanetScene("mars", marsSceneController);
    solarSystemSceneController.setPlanetScene("jupiter", jupiterSceneController);
    solarSystemSceneController.setPlanetScene("saturn", saturnSceneController);
    solarSystemSceneController.setPlanetScene("uranus", uranusSceneController);
    solarSystemSceneController.setPlanetScene("neptune", neptuneSceneController);
    solarSystemSceneController.setPlanetScene("pluto", plutoSceneController);

    solarSystemSceneController.activateScene();
    globe = new DAT.Globe(renderer);
    globe.setSurfaceImg("../images/world.jpg");
    globe.init();
    loadData();

    $("#all").click(function () {
        $("body footer div").each(function () {
            $(this).attr("class", "unchecked");
        });
        $(this).attr("class", "checked");
        googleEarth = true;
        globe.activateScene();

    });

    $("body footer div.year").click(function () {
        $("body footer div").each(function () {
            $(this).attr("class", "unchecked");
        });
        $(this).attr("class", "checked");
        var year = $(this).text();

        if (googleEarth) {
            googleEarth = false;
            earthSceneController.activateScene()
        }

        getYearData(year);
    });

    $("#backLogo").click(function () {
        solarSystemSceneController.activateScene();
        $("#timeLine").hide();
    });

    $("#infoBoard").click(function () {
        if (infoBoard) {
            earthSceneController.restoreEarth();
            $(this).animate({width:'toggle'},350);
            infoBoard = false;
        }
    });
});

function getYearData(year) {

    if (Math.random() > 0.5) {
        earthSceneController.addCones(geographicData);
    } else {
        earthSceneController.clearCones();
    }
}

function loadData() {

    $.ajax({
        url: '../data/rank.json',
//            url: '/api/all',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: 'json',
        success: function (data) {
            globe.addData(data, {format: 'magnitude'});
            globe.createPoints();
        }
    });
}