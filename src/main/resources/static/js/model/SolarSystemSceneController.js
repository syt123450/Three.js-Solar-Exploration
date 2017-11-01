/**
 * Created by ss on 2017/10/26.
 */

SolarSystemSceneController = function(renderer) {

    // Light and Camera
    var universeUtils = new UniverseUtils();
    var light = new THREE.PointLight(0xffffff, 1.2, 0);
    var camera = universeUtils.createDefaultCamera();

    var universeMesh = universeUtils.createSolarUniverse();
    var solarAggregation = universeUtils.createSolarAggregation();
    var planetsList = universeUtils.createPlanetsList();

    var solarSystemRenderer = renderer;
    var solarSystemScene = init();

    this.setPlanetScene = function (planetName, controller) {
        planetsList[planetName].controller = controller;
    };

    this.activateScene = activateScene;
    this.name = "SolarSystemSceneController";

    // Camera position settings (NOT COMPLETE, N/A)
    // this.upForwardView = updateCameraPosition(-1);
    this.topView = updateCameraPosition(1);
    // this.sideView = updateCameraPosition(2);


    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);

        rotationAndRevolution();

        solarSystemRenderer.render(solarSystemScene, camera);
    }

    function activateScene(){

        EventManager.removeEvents();
        window.cancelAnimationFrame(SolarEPUtils.animationFrame);
        addEvent();
        animate();
    }

    function init() {
        var scene = new THREE.Scene();

        // Lights
        scene.add(new THREE.AmbientLight(0x222222));
        scene.add(light);
        light.position.set(0, 0, 0);

        // Camera
        scene.add(camera);
        updateCameraPosition(-1);

        // Background
        scene.add(universeMesh);

        // Apply the Sun
        initSystemPositions();
        scene.add(solarAggregation);

        return scene;
    }

    function initSystemPositions() {

        for (var planet in planetsList) {
            // Add planet to the sun
            solarAggregation.add(planetsList[planet].mesh);
            // Add orbits
            solarAggregation.add(planetsList[planet].orbit);
        }
    }

    function rotationAndRevolution() {

        for (var planet in planetsList) {
            // Rotations
            planetsList[planet].mesh.rotateY(SolarConfig[planet].rotateSpeed);
            // Revolutions
            SolarConfig[planet].orbitAngle += SolarConfig[planet].orbitSpeed;
            var radians = SolarConfig[planet].orbitAngle * Math.PI / 180;
            planetsList[planet].mesh.position.x = Math.cos(radians) * SolarConfig[planet].orbitRadius;
            planetsList[planet].mesh.position.z = Math.sin(radians) * SolarConfig[planet].orbitRadius;
        }
    }

    function updateCameraPosition(mode) {

        // From the top of the system
        if (mode == 1) {
            camera.position.set(0, 60, 0);
        }
        // From the horizontal position
        else if (mode == 2) {
            camera.position.set(0, 0, 60);
        }
        // From the up-forward position
        else {
            camera.position.set(0, 30, 60);
        }

        camera.lookAt(solarAggregation.position);

    }

    function addEvent() {

        EventManager.registerEvent('mousedown', onMouseDown);
    }

    // mouse down event handler
    function onMouseDown() {

        console.log("mouse down");

        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        checkAndChangeScene();
    }

    function checkAndChangeScene() {

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);

        var intersects = SolarEPUtils.raycaster.intersectObjects(solarAggregation.children, true);

        for (var i =0; i < intersects.length; i++) {
            if (intersects !== null && intersects.length > 0 && intersects[i].object.type === "Mesh") {

                for (var planet in planetsList) {
                    if (intersects[i].object === planetsList[planet].mesh) {
                        console.log(planet + " clicked!");
                        planetsList[planet].controller.activateScene();
                    }
                }
            }
        }
    }
};