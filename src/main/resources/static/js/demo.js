/**
 * Created by ss on 2017/10/30.
 */

$(function () {

    googleEarth = false;
    infoBoard = false;

    renderer = SolarEPUtils.getDefaultRenderer();

    solarSystemSceneController = new SolarSystemSceneController(renderer);
    solarSystemSceneController.activateScene();
    solarSystemSceneController.initStartTween();

    activatedScene = solarSystemSceneController;

    $.getScript("../js/config/planetConfig.js", function () {
        $.getScript("../js/model/PlanetSceneControllers.js", function () {
            mercurySceneController = new PlanetSceneController(renderer, PlanetConfig.mercury);
            venusSceneController = new PlanetSceneController(renderer, PlanetConfig.venus);
            marsSceneController = new PlanetSceneController(renderer, PlanetConfig.mars);
            jupiterSceneController = new PlanetSceneController(renderer, PlanetConfig.jupiter);
            saturnSceneController = new PlanetSceneController(renderer, PlanetConfig.saturn);
            uranusSceneController = new PlanetSceneController(renderer, PlanetConfig.uranus);
            neptuneSceneController = new PlanetSceneController(renderer, PlanetConfig.neptune);
            plutoSceneController = new PlanetSceneController(renderer, PlanetConfig.pluto);

            solarSystemSceneController.setPlanetScene("mercury", mercurySceneController);
            solarSystemSceneController.setPlanetScene("venus", venusSceneController);
            solarSystemSceneController.setPlanetScene("mars", marsSceneController);
            solarSystemSceneController.setPlanetScene("jupiter", jupiterSceneController);
            solarSystemSceneController.setPlanetScene("saturn", saturnSceneController);
            solarSystemSceneController.setPlanetScene("uranus", uranusSceneController);
            solarSystemSceneController.setPlanetScene("neptune", neptuneSceneController);
            solarSystemSceneController.setPlanetScene("pluto", plutoSceneController);
        });
    });

    $.getScript("../js/model/EarthSceneController.js", function () {
        earthSceneController = new EarthSceneController(renderer);
        solarSystemSceneController.setPlanetScene("earth", earthSceneController);
    });

    $.getScript("../js/model/GlobeSceneController.js", function () {
        globe = new DAT.Globe(renderer);
        globe.setSurfaceImg("../images/world.jpg");
        globe.init();
        loadData();
    });

    $.getScript("../data/mockTop10Data.js");

    $("#all").click(function () {
        $("body footer div").each(function () {
            $(this).attr("class", "unchecked");
        });
        $(this).attr("class", "checked");
        googleEarth = true;
        earthSceneController.stopScene();
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
            globe.deactivateScene();
            earthSceneController.startScene();
        }

        getYearData(year);
    });

    $("#closeBoard").hover(
        function () {
            $(this).attr("src", "../images/closeButton/close_hover.png");
        },
        function () {
            $(this).attr("src", "../images/closeButton/close.png");
        });

    $("#curtain, #closeBoard").click(function () {
        if (infoBoard) {
            earthSceneController.restoreScene();
            $("#infoBoard").animate({width: 'toggle'}, 350);
            $("#curtain").hide();
            $("#timeLine").show();
            infoBoard = false;
        }
    });

    $("#mercuryBoard img").hover(function() {
        $(this).attr("src", "../images/closeButton/mercury_hover.png");
    }, function() {
        $(this).attr("src", "../images/closeButton/mercury.png");
    }).click(function() {
        mercurySceneController.hideInfo();
    });

    $("#venusBoard img").hover(function() {
        $(this).attr("src", "../images/closeButton/venus_hover.png");
    }, function() {
        $(this).attr("src", "../images/closeButton/venus.png");
    }).click(function() {
        venusSceneController.hideInfo();
    });

    $("#marsBoard img").hover(function() {
        $(this).attr("src", "../images/closeButton/mars_hover.png");
    }, function() {
        $(this).attr("src", "../images/closeButton/mars.png");
    }).click(function() {
        marsSceneController.hideInfo();
    });

    $("#jupiterBoard img").hover(function() {
        $(this).attr("src", "../images/closeButton/jupiter_hover.png");
    }, function() {
        $(this).attr("src", "../images/closeButton/jupiter.png");
    }).click(function() {
        jupiterSceneController.hideInfo();
    });

    $("#saturnBoard img").hover(function() {
        $(this).attr("src", "../images/closeButton/saturn_hover.png");
    }, function() {
        $(this).attr("src", "../images/closeButton/saturn.png");
    }).click(function() {
        saturnSceneController.hideInfo();
    });

    $("#uranusBoard img").hover(function() {
        $(this).attr("src", "../images/closeButton/uranus_hover.png");
    }, function() {
        $(this).attr("src", "../images/closeButton/uranus.png");
    }).click(function() {
        uranusSceneController.hideInfo();
    });

    $("#neptuneBoard img").hover(function() {
        $(this).attr("src", "../images/closeButton/neptune_hover.png");
    }, function() {
        $(this).attr("src", "../images/closeButton/neptune.png");
    }).click(function() {
        neptuneSceneController.hideInfo();
    });

    $("#plutoBoard img").hover(function() {
        $(this).attr("src", "../images/closeButton/pluto_hover.png");
    }, function() {
        $(this).attr("src", "../images/closeButton/pluto.png");
    }).click(function() {
        plutoSceneController.hideInfo();
    });

});

function getYearData(year) {

    if (Math.random() > 0.5) {
        earthSceneController.addCones(geographicData);
    } else {
        earthSceneController.clearCones();
    }
}

function enableBackLogo() {
    $("#backLogo").hover(
        function () {
            $(this).css("border", "1px solid #414141");
        },
        function () {
            $(this).css("border", "0");
        }).css("cursor", "pointer").click(backToSolar);
}

function disableBackLogo() {
    $("#backLogo").hover(function () {
        $(this).css("border", "0");
    }).css("cursor", "default").unbind("click");
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

function backToSolar() {
    disableBackLogo();
    activatedScene.deactivateScene();
    solarSystemSceneController.playAudio();
    solarSystemSceneController.activateScene();
    $("#timeLine").hide();
}