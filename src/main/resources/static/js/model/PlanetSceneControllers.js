/**
 * Created by ss on 2017/10/26.
 */

// PlanetSceneController
PlanetSceneController = function (renderer, config) {
    // Renderer
    var renderer = renderer;
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // Utils
    var universeUtils = new UniverseUtils();

    // Universe, stars and meteors
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();

    // Mesh and Aggregation
    var mesh = universeUtils.createTerrestrialPlanet(config);
    var planetAggregation = aggregationInit();

    // Camera and Lights
    var camera = universeUtils.createDefaultCamera();
    var lights = lightsInit();

    // Init. Scene
    var scene = init();

    // Interfaces
    this.activateScene = activateScene;
    this.name = config.planetName + "Controller";

    /* Action Functions */
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
        mesh.rotation.y += 0.0005;
        planetAggregation.rotateY(0.001);
    }

    /* Initialization Functions */
    function init() {
        var scene = new THREE.Scene();

        lights.forEach(function addLight(light) {
            scene.add(light);
        });
        camera.position.set(0, 0.75, 2.5);
        camera.lookAt(planetAggregation.position);
        scene.add(camera);

        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(planetAggregation);

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();

        aggregation.name = config.planetName + "Aggregation";
        aggregation.add(mesh);
        if (config.planetName === 'Saturn' || config.planetName === 'Uranus'){
            aggregation.add(universeUtils.createRing(config));
        }
        universeUtils.addDoubleHalos(aggregation, config.innerGlowColor, config.outerGlowColor);
        return aggregation;
    }

    function lightsInit(){
        var lights = [];

        // Lights Combination
        lights[0] = new THREE.HemisphereLight(0xf3f3f3, 0x1e1e1e, 0.75);

        lights[1] = new THREE.DirectionalLight(0xf7f7f7, 0.6);
        lights[1].position.set(30, 30, 3);
        lights[1].target = planetAggregation;
        lights[1].castShadow = true;            // default is false
        //Set up shadow properties for the light
        // lights[1].shadow.mapSize.width = 1024;  // default
        // lights[1].shadow.mapSize.height = 1024; // default
        // lights[1].shadow.camera.near = 0.5;    // default
        // lights[1].shadow.camera.far = 500;     // default

        // Legacy setting
        // lights[1] = new THREE.SpotLight( 0xf7f7f7, 0.8, 95, Math.PI/4, 1, 1);
        // lights[1].position.set(30, 30, -6);
        // lights[1].lookAt(planetAggregation.position);

	    return lights;
    }
};