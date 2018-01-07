/**
 * Created by ss on 2017/10/30.
 */

$(function () {

    googleEarth = false;
    infoBoard = false;

    renderer = SolarEPUtils.getDefaultRenderer();

    solarSystemSceneController = new SolarSystemSceneController(renderer);
    solarSystemSceneController.initialFadeSceneIn();

    activatedScene = solarSystemSceneController;

    var PlanetControllers = {};

    $.getScript("../js/config/planetConfig.js", function () {
        $.getScript("../js/model/PlanetSceneControllers.js", function () {

            PlanetControllers.mercury = new PlanetSceneController(renderer, PlanetConfig.mercury);
            PlanetControllers.venus = new PlanetSceneController(renderer, PlanetConfig.venus);
            PlanetControllers.mars = new PlanetSceneController(renderer, PlanetConfig.mars);
            PlanetControllers.jupiter = new PlanetSceneController(renderer, PlanetConfig.jupiter);
            PlanetControllers.saturn = new PlanetSceneController(renderer, PlanetConfig.saturn);
            PlanetControllers.uranus = new PlanetSceneController(renderer, PlanetConfig.uranus);
            PlanetControllers.neptune = new PlanetSceneController(renderer, PlanetConfig.neptune);
            PlanetControllers.pluto = new PlanetSceneController(renderer, PlanetConfig.pluto);

            solarSystemSceneController.setPlanetScenes(PlanetControllers);
        });
    });

    $.getScript("../js/model/EarthSceneController.js", function () {
        earthSceneController = new EarthSceneController(renderer);
        solarSystemSceneController.setPlanetScene("earth", earthSceneController);
    });

    $.getScript("../js/model/GlobeSceneController.js", function () {
        globe = new DAT.Globe(renderer);
        globe.init();
        loadData();
    });

    // $.getScript("../data/mockTop10Data.js");

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
});

// $.getScript("../data/mockTop10Data.js");

function getYearData(year) {

    // if (Math.random() > 0.5) {
    //     earthSceneController.addCones(geographicData);
    // } else {
    //     earthSceneController.clearCones();
    // }
    $.ajax({
        url: '/api/year',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        async: true,
        data: JSON.stringify({"year": year}),
        dataType: 'json',
        success: function (data) {
            earthSceneController.clearCones();
            earthSceneController.addCones(data);
        }
    });
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
        // url: '../data/rank.json',
        url: '/api/all',
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
    activatedScene.fadeSceneOut();
}

function showTransition(planetName) {
    configureArea(TransitionConfig[planetName]);
    typeMessage(TransitionConfig[planetName]);
    $("#transition").css("display", "block");
}

function setTransitionImage(config) {
    $("#transition>img:eq(0)").attr("src", config.backgroundImg);
    $("#transition>img:eq(1)").attr("src", config.decoratorImg);
}

function configureArea(config) {

    $("#transition>div>p:eq(3)").css("color", config.color);
}

function typeMessage(config) {

    var typingSpeed = 60;
    var signatureSpeed = 200;

    var typing1 = new Typing({
        source: $(config.messageArea + ">div:eq(0)")[0],
        output: $("#transition>div>p>span:eq(0)")[0],
        delay: typingSpeed,
        done: function () {
            typing2.start();
        }
    });
    var typing2 = new Typing({
        source: $(config.messageArea + ">div:eq(1)")[0],
        output: $("#transition>div>p>span:eq(1)")[0],
        delay: typingSpeed,
        done: function () {
            typing3.start();
        }
    });
    var typing3 = new Typing({
        source: $(config.messageArea + ">div:eq(2)")[0],
        output: $("#transition>div>p>span:eq(2)")[0],
        delay: typingSpeed,
        done: function () {
            typing4.start();
        }
    });
    var typing4 = new Typing({
        source: $(config.messageArea + ">div:eq(3)")[0],
        output: $("#transition>div>p>span:eq(3)")[0],
        delay: signatureSpeed,
        done: function () {
            $("#transition").hide();
            solarSystemSceneController.onTransitionComplete();
            $("#transition>div>p>span:eq(0)").empty();
            $("#transition>div>p>span:eq(1)").empty();
            $("#transition>div>p>span:eq(2)").empty();
            $("#transition>div>p>span:eq(3)").empty();
        }
    });
    typing1.start();
}