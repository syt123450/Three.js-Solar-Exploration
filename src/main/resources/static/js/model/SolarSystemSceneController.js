/**
 * Created by ss on 2017/10/26.
 */

SolarSystemSceneController = function(renderer) {

    // Light and Camera
    var universeUtils = new UniverseUtils();
    var light = new THREE.PointLight(0xffffff, 1.2, 0);
    var camera = universeUtils.createDefaultCamera();

    // Meshes
    var universeMesh = universeUtils.createSolarUniverse();
    var sunMesh = universeUtils.createDefaultSun();
    var mercuryMesh = universeUtils.createBumpSphereMesh(SolarConfig.mercury.map, SolarConfig.mercury.bumpMap, SolarConfig.mercury.radius);
    var venusMesh = universeUtils.createBumpSphereMesh(SolarConfig.venus.map, SolarConfig.venus.bumpMap, SolarConfig.venus.radius);
    var earthMesh = universeUtils.createBumpSphereMesh(SolarConfig.earth.map, SolarConfig.earth.bumpMap, SolarConfig.earth.radius);
    var marsMesh = universeUtils.createBumpSphereMesh(SolarConfig.mars.map, SolarConfig.mars.bumpMap, SolarConfig.mars.radius);
    var jupiterMesh = universeUtils.createSphereMesh(SolarConfig.jupiter.map , SolarConfig.jupiter.radius);
    var saturnMesh = universeUtils.createSphereMesh(SolarConfig.saturn.map , SolarConfig.saturn.radius);
    var uranusMesh = universeUtils.createSphereMesh(SolarConfig.uranus.map , SolarConfig.uranus.radius);
    var neptuneMesh = universeUtils.createSphereMesh(SolarConfig.neptune.map , SolarConfig.neptune.radius);
    var plutoMesh = universeUtils.createBumpSphereMesh(SolarConfig.pluto.map, SolarConfig.pluto.map, SolarConfig.pluto.radius);

    // Aggregations
    var sunAggregation = createAggregation(
        sunMesh
        // new THREE.Mesh(
        // new THREE.SphereGeometry(sunRadius, 32, 32),
        // new THREE.MeshBasicMaterial({
        //     color: 'yellow'
        // }))
    );

    // Planet Scene Controllers
    var mercurySceneController;
    var venusSceneController;
    var earthSceneController;
    var marsSceneController;
    var jupiterSceneController;
    var saturnSceneController;
    var uranusSceneController;
    var neptuneSceneController;
    var plutoSceneController;

    // Init.
    var solarSystemRenderer = renderer;
    var solarSystemScene = init();

    // Set Planet Scene Controllers
    this.setPlanetScene = function (planet, controller) {
        switch (planet){
            case "Mercury" :
                mercurySceneController = controller;
                break;
            case "Venus" :
                venusSceneController = controller;
                break;
            case "Earth" :
                earthSceneController = controller;
                break;
            case "Mars" :
                marsSceneController = controller;
                break;
            case "Saturn" :
                saturnSceneController = controller;
                break;
            case "Jupiter" :
                jupiterSceneController = controller;
                break;
            case "Uranus" :
                uranusSceneController = controller;
                break;
            case "Neptune" :
                neptuneSceneController = controller;
                break;
            case "Pluto" :
                plutoSceneController = controller;
                break;
            default:
            //Nothing
        }
    };

    /*
     *  Deprecated to use "animate" function directly.
     *  Use "activateScene" function for scene switching.
     */
    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "SolarSystemSceneController";

    // Camera position settings (NOT COMPLETE, N/A)
    // this.upForwardView = updateCameraPosition(-1);
    this.topView = updateCameraPosition(1);
    // this.sideView = updateCameraPosition(2);


    function animate() {
        SolarEPUtils.animationFrame = requestAnimationFrame(animate);

        // rotationAndRevolution();

        solarSystemRenderer.render(solarSystemScene, camera);
    }

    function activateScene(){

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
        scene.add(sunAggregation);

        return scene;
    }

    function initSystemPositions() {
        // Add planets to the sun
        sunAggregation.add(mercuryMesh);
        sunAggregation.add(venusMesh);
        sunAggregation.add(earthMesh);
        sunAggregation.add(marsMesh);
        sunAggregation.add(jupiterMesh);
        sunAggregation.add(saturnMesh);
        sunAggregation.add(uranusMesh);
        sunAggregation.add(neptuneMesh);
        sunAggregation.add(plutoMesh);

        // Init. positions
        mercuryMesh.position.x = SolarConfig.mercury.orbitRadius;
        venusMesh.position.x = SolarConfig.venus.orbitRadius;
        earthMesh.position.x = SolarConfig.earth.orbitRadius;
        marsMesh.position.x = SolarConfig.mars.orbitRadius;
        jupiterMesh.position.x = SolarConfig.jupiter.orbitRadius;
        saturnMesh.position.x = SolarConfig.saturn.orbitRadius;
        uranusMesh.position.x = SolarConfig.uranus.orbitRadius;
        neptuneMesh.position.x = SolarConfig.neptune.orbitRadius;
        plutoMesh.position.x = SolarConfig.pluto.orbitRadius;

        // Add orbits
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.mercury.orbitRadius));
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.venus.orbitRadius));
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.earth.orbitRadius));
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.mars.orbitRadius));
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.jupiter.orbitRadius));
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.saturn.orbitRadius));
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.uranus.orbitRadius));
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.neptune.orbitRadius));
        sunAggregation.add(universeUtils.createOrbit(SolarConfig.pluto.orbitRadius));
    }

    function rotationAndRevolution() {

        // Rotations
        mercuryMesh.rotateY(SolarConfig.mercury.rotateSpeed);
        venusMesh.rotateY(SolarConfig.venus.rotateSpeed);
        earthMesh.rotateY(SolarConfig.earth.rotateSpeed);
        marsMesh.rotateY(SolarConfig.mars.rotateSpeed);
        jupiterMesh.rotateY(SolarConfig.jupiter.rotateSpeed);
        saturnMesh.rotateY(SolarConfig.saturn.rotateSpeed);
        uranusMesh.rotateY(SolarConfig.uranus.rotateSpeed);
        neptuneMesh.rotateY(SolarConfig.neptune.rotateSpeed);
        plutoMesh.rotateY(SolarConfig.pluto.rotateSpeed);

        // Revolutions
        var radians = 0;
        SolarConfig.mercury.orbitAngle += SolarConfig.mercury.orbitSpeed;
        SolarConfig.venus.orbitAngle += SolarConfig.venus.orbitSpeed;
        SolarConfig.earth.orbitAngle += SolarConfig.earth.orbitSpeed;
        SolarConfig.mars.orbitAngle += SolarConfig.mars.orbitSpeed;
        SolarConfig.jupiter.orbitAngle += SolarConfig.jupiter.orbitSpeed;
        SolarConfig.saturn.orbitAngle += SolarConfig.saturn.orbitSpeed;
        SolarConfig.uranus.orbitAngle += SolarConfig.uranus.orbitSpeed;
        SolarConfig.neptune.orbitAngle += SolarConfig.neptune.orbitSpeed;
        SolarConfig.pluto.orbitAngle += SolarConfig.pluto.orbitSpeed;

        radians = SolarConfig.mercury.orbitAngle * Math.PI / 180;
        mercuryMesh.position.x = Math.cos(radians) * SolarConfig.mercury.orbitRadius;
        mercuryMesh.position.z = Math.sin(radians) * SolarConfig.mercury.orbitRadius;

        radians = SolarConfig.venus.orbitAngle * Math.PI / 180;
        venusMesh.position.x = Math.cos(radians) * SolarConfig.venus.orbitRadius;
        venusMesh.position.z = Math.sin(radians) * SolarConfig.venus.orbitRadius;

        radians = SolarConfig.earth.orbitAngle * Math.PI / 180;
        earthMesh.position.x = Math.cos(radians) * SolarConfig.earth.orbitRadius;
        earthMesh.position.z = Math.sin(radians) * SolarConfig.earth.orbitRadius;

        radians = SolarConfig.mars.orbitAngle * Math.PI / 180;
        marsMesh.position.x = Math.cos(radians) * SolarConfig.mars.orbitRadius;
        marsMesh.position.z = Math.sin(radians) * SolarConfig.mars.orbitRadius;

        radians = SolarConfig.jupiter.orbitAngle * Math.PI / 180;
        jupiterMesh.position.x = Math.cos(radians) * SolarConfig.jupiter.orbitRadius;
        jupiterMesh.position.z = Math.sin(radians) * SolarConfig.jupiter.orbitRadius;

        radians = SolarConfig.saturn.orbitAngle * Math.PI / 180;
        saturnMesh.position.x = Math.cos(radians) * SolarConfig.saturn.orbitRadius;
        saturnMesh.position.z = Math.sin(radians) * SolarConfig.saturn.orbitRadius;

        radians = SolarConfig.uranus.orbitAngle * Math.PI / 180;
        uranusMesh.position.x = Math.cos(radians) * SolarConfig.uranus.orbitRadius;
        uranusMesh.position.z = Math.sin(radians) * SolarConfig.uranus.orbitRadius;

        radians = SolarConfig.neptune.orbitAngle * Math.PI / 180;
        neptuneMesh.position.x = Math.cos(radians) * SolarConfig.neptune.orbitRadius;
        neptuneMesh.position.z = Math.sin(radians) * SolarConfig.neptune.orbitRadius;

        radians = SolarConfig.pluto.orbitAngle * Math.PI / 180;
        plutoMesh.position.x = Math.cos(radians) * SolarConfig.pluto.orbitRadius;
        plutoMesh.position.z = Math.sin(radians) * SolarConfig.pluto.orbitRadius;
    }

    function createAggregation(sphereMesh) {
        var aggregation = new THREE.Object3D();
        aggregation.add(sphereMesh);
        // aggregation.add(new THREE.AxisHelper(0.5));

        return aggregation;
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

        camera.lookAt(sunAggregation.position);

    }

    function addEvent() {

        document.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mousemove', onMouseMove, false);
    }

    function removeEvent() {
        document.removeEventListener('mousedown', onMouseDown, false);
        document.removeEventListener('mousemove', onMouseMove, false);
    }

    function onMouseMove() {
        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function checkPlanetClicked() {

        SolarEPUtils.raycaster.setFromCamera(SolarEPUtils.mouse, camera);

        var intersects = SolarEPUtils.raycaster.intersectObjects(sunAggregation.children, true);

        for (var i =0; i < intersects.length; i++) {
            if (intersects !== null && intersects.length > 0 && intersects[i].object.type === "Mesh"){
                if (mercuryMesh === intersects[i].object){
                    console.log("Clicked Mercury!");
                    return "Mercury";
                }
                else if (venusMesh === intersects[i].object){
                    console.log("Clicked Venus!");
                    return "Venus";
                }
                else if (earthMesh === intersects[i].object){
                    console.log("Clicked Earth!");
                    return "Earth";
                }
                else if (marsMesh === intersects[i].object){
                    console.log("Clicked Mars!");
                    return "Mars";
                }
                else if (saturnMesh === intersects[i].object){
                    console.log("Clicked Saturn!");
                    return "Saturn";
                }
                else if (jupiterMesh === intersects[i].object){
                    console.log("Clicked Jupiter!");
                    return "Jupiter";
                }
                else if (uranusMesh === intersects[i].object){
                    console.log("Clicked Uranus!");
                    return "Uranus";
                }
                else if (neptuneMesh === intersects[i].object){
                    console.log("Clicked Neptune!");
                    return "Neptune";
                }
                else if (plutoMesh === intersects[i].object){
                    console.log("Clicked Pluto!");
                    return "Pluto";
                }
                else {
                    console.log("Clicked Nothing_solar_0!");
                    return "Nothing";
                }
            }
            else {
                console.log("Clicked Nothing_solar!");
                return "Nothing";
            }
        }
    }

    // mouse down event handler
    function onMouseDown() {

        console.log("mouse down");

        SolarEPUtils.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        SolarEPUtils.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        var result = checkPlanetClicked();
        if (result != "Nothing"){
            removeEvent();
            changeScene(result);
        }
    }

    function changeScene(planet){
        switch (planet){
            case "Mercury" :
                mercurySceneController.activateScene();
                break;
            case "Venus" :
                venusSceneController.activateScene();
                break;
            case "Earth" :
                earthSceneController.activateScene();
                $("#timeLine").show();
                break;
            case "Mars" :
                marsSceneController.activateScene();
                break;
            case "Saturn" :
                saturnSceneController.activateScene();
                break;
            case "Jupiter" :
                jupiterSceneController.activateScene();
                break;
            case "Uranus" :
                uranusSceneController.activateScene();
                break;
            case "Neptune" :
                neptuneSceneController.activateScene();
                break;
            case "Pluto" :
                plutoSceneController.activateScene();
                break;
            default:
            //Nothing
        }
    }
};


/*  Just in case for reuse of aggregation for any planet

    var mercuryAggregation = createAggregation(
        mercuryMesh
        // createBumpSphereMesh('../images/planets/mercurymap.jpg', '../images/planets/mercurybump.jpg', 0.5)
    );
    var venusAggregation = createAggregation(
        venusMesh
        // createBumpSphereMesh('../images/planets/venusmap.jpg', '../images/planets/venusbump.jpg', 0.8)
    );
    var earthAggregation = createAggregation(
        earthMesh
        // createBumpSphereMesh('../images/earthmap1k.jpg', '../images/earthbump1k.jpg', 0.9)
    );
    var marsAggregation = createAggregation(
        marsMesh
        // createBumpSphereMesh('../images/planets/marsmap1k.jpg', '../images/planets/marsbump1k.jpg', 0.55)
    );
    var jupiterAggregation = createAggregation(
        jupiterMesh
        // createSphereMesh('../images/planets/jupitermap.jpg' , 2)
    );
    var saturnAggregation = createAggregation(
        saturnMesh
        // createSphereMesh('../images/planets/saturnmap.jpg' , 1.8)
    );
    var uranusAggregation = createAggregation(
        uranusMesh
        // createSphereMesh('../images/planets/uranusmap.jpg' , 1.2)
    );
    var neptuneAggregation = createAggregation(
        neptuneMesh
        // createSphereMesh('../images/planets/neptunemap.jpg' , 1.2)
    );
    var plutoAggregation = createAggregation(
        plutoMesh
        // createBumpSphereMesh('../images/planets/plutomap1k.jpg', '../images/planets/plutobump1k.jpg', 0.3)
    );
 */