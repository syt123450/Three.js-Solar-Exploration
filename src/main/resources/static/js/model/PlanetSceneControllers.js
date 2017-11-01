/**
 * Created by ss on 2017/10/26.
 */


/* ***** ScenceController for each planet ***** */

// Mercury
MercurySceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createTerrestrialPlanet(PlanetConfig.mercury);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    this.activateScene = activateScene;
    this.name = "MercurySceneController";

    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit(), universeUtils);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "MercuryAggregation";
        return planetAggregation;
    }
};

// Venus
VenusSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createTerrestrialPlanet(PlanetConfig.venus);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    this.activateScene = activateScene;
    this.name = "VenusSceneController";

    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit(), universeUtils);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "VenusAggregation";
        return planetAggregation;
    }
};

// Mars
MarsSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createTerrestrialPlanet(PlanetConfig.mars);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    this.activateScene = activateScene;
    this.name = "MarsSceneController";

    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit(), universeUtils);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "MarsAggregation";
        return planetAggregation;
    }
};

// Jupiter
JupiterSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createJovianPlanet(PlanetConfig.jupiter);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    this.activateScene = activateScene;
    this.name = "JupiterSceneController";

    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit(), universeUtils);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "JupiterAggregation";
        return planetAggregation;
    }
};

// Saturn
SaturnSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createJovianPlanet(PlanetConfig.saturn);
    var ringMesh = universeUtils.createRing(PlanetConfig.saturn);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    this.activateScene = activateScene;
    this.name = "SaturnSceneController";

    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit(), universeUtils);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.add(ringMesh);
        planetAggregation.name = "SaturnAggregation";
        return planetAggregation;
    }
};

// Uranus
UranusSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createJovianPlanet(PlanetConfig.uranus);
    var ringMesh = universeUtils.createRing(PlanetConfig.uranus);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    this.activateScene = activateScene;
    this.name = "UranusSceneController";

    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit(), universeUtils);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.add(ringMesh);
        planetAggregation.name = "UranusAggregation";
        return planetAggregation;
    }
};

// Neptune
NeptuneSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createJovianPlanet(PlanetConfig.neptune);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    this.activateScene = activateScene;
    this.name = "NeptuneSceneController";

    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit(), universeUtils);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "NeptuneAggregation";
        return planetAggregation;
    }
};

// Pluto
PlutoSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createTerrestrialPlanet(PlanetConfig.pluto);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "PlutoSceneController";

    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit(), universeUtils);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "PlutoAggregation";
        return planetAggregation;
    }
};



/* ***** ***** Helper Functions ***** ***** */

function initDefault(light, camera, universeMesh, stars, meteors, aggregation, universeUtils) {
    var scene = new THREE.Scene();
    scene.add(light);
    camera.position.set(0, 0.75, 2.5);
    camera.lookAt(aggregation.position);
    scene.add(camera);
    scene.add(universeMesh);
    stars.forEach(function addStar(star) {
        scene.add(star);
    });
    universeUtils.addDoubleHalos(aggregation, "#ff0000", "#00ff00");
    meteors.forEach(function addMeteor(meteor) {
        scene.add(meteor);
    });
    scene.add(aggregation);

    return scene;
}

function aggregationInitDefault(mesh) {
    var aggregation = new THREE.Object3D();
    aggregation.add(mesh);

    return aggregation;
}

function rotatePlanetDefault(mesh) {

    mesh.rotation.y += 0.001;

}