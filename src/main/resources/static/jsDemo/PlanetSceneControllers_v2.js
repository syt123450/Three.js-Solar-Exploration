/**
 * Created by ss on 2017/10/26.
 */


/* ***** ScenceController for each planet ***** */

// Mercury
MercurySceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        universeUtils.addDoubleHalos(planetAggregation, "#FBCA64", "#C68424");
        planetAggregation.name = "MercuryAggregation";
        return planetAggregation;
    }
};

// Venus
VenusSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "PlutoAggregation";
        return planetAggregation;
    }
};

// Planet
PlanetSceneController = function (renderer, config) {
    var universeUtils = new UniverseUtils();
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = universeUtils.createTerrestrialPlanet(config);
    var planetAggregation;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = config.planetName + "Controller";

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
        return initDefault(camera, mesh, universeMesh, stars, meteors);
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = config.planetName + "Aggregation";
        return planetAggregation;
    }
};



/* ***** ***** Helper Functions ***** ***** */

function initDefault(camera, mesh, universeMesh, stars, meteors, aggregation, lights) {
    var scene = new THREE.Scene();

    aggregation = aggregation || aggregationInitDefault(mesh);
    lights = lights || lightsInitDefault(aggregation);
    lights.forEach(function addLight(light) {
        scene.add(light);
    });
    camera.position.set(0, 0.75, 2.5);
    camera.lookAt(aggregation.position);
    scene.add(camera);

    scene.add(universeMesh);
    stars.forEach(function addStar(star) {
        scene.add(star);
    });
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

function lightsInitDefault(aggregation){
    var lights = [];

    lights[0] = new THREE.HemisphereLight(0xf3f3f3, 0x1e1e1e, 1);
    lights[1] = new THREE.SpotLight( 0xf7f7f7, 0.8, 100, Math.PI/3, 1, 1);

    lights[1].position.set(30, 30, -6);
    lights[1].lookAt(aggregation.position);

    return lights;
}

function rotatePlanetDefault(mesh) {

    mesh.rotation.y += 0.001;

}