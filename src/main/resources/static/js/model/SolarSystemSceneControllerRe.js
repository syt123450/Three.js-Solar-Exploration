/**
 * Created by ss on 2017/10/26.
 */

SolarSystemSceneController = function(renderer) {

    // Light and Camera
    var universeUtils = new UniverseUtils();
    var light = new THREE.PointLight(0xffffff, 1.2, 0);
    var camera = universeUtils.createDefaultCamera();

    // Meshes
    var universeMesh = createUniverseMesh();
    var sunMesh = universeUtils.createDefaultSun();
    var mercuryMesh = createBumpSphereMesh(SolarConfig.mercury.map, SolarConfig.mercury.bumpMap, SolarConfig.mercury.radius);
    var venusMesh = createBumpSphereMesh(SolarConfig.venus.map, SolarConfig.venus.bumpMap, SolarConfig.venus.radius);
    var earthMesh = createBumpSphereMesh(SolarConfig.earth.map, SolarConfig.earth.bumpMap, SolarConfig.earth.radius);
    var marsMesh = createBumpSphereMesh(SolarConfig.mars.map, SolarConfig.mars.bumpMap, SolarConfig.mars.radius);
    var jupiterMesh = createSphereMesh(SolarConfig.jupiter.map , SolarConfig.jupiter.radius);
    var saturnMesh = createSphereMesh(SolarConfig.saturn.map , SolarConfig.saturn.radius);
    var uranusMesh = createSphereMesh(SolarConfig.uranus.map , SolarConfig.uranus.radius);
    var neptuneMesh = createSphereMesh(SolarConfig.neptune.map , SolarConfig.neptune.radius);
    var plutoMesh = createBumpSphereMesh(SolarConfig.pluto.map, SolarConfig.pluto.map, SolarConfig.pluto.radius);

    // Aggregations
    var sunAggregation = createAggregation(
        sunMesh
        // new THREE.Mesh(
        // new THREE.SphereGeometry(sunRadius, 32, 32),
        // new THREE.MeshBasicMaterial({
        //     color: 'yellow'
        // }))
    );

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
    this.sideView = updateCameraPosition(2);
    this.upForwardView = updateCameraPosition(-1);
    this.topView = updateCameraPosition(1);


    function animate() {
        requestAnimationFrame(animate);

        // rotationAndRevolution();

        solarSystemRenderer.render(solarSystemScene, camera);
    }

    function activateScene(){
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
        sunAggregation.add(mercuryAggregation);
        sunAggregation.add(venusAggregation);
        sunAggregation.add(earthAggregation);
        sunAggregation.add(marsAggregation);
        sunAggregation.add(jupiterAggregation);
        sunAggregation.add(saturnAggregation);
        sunAggregation.add(uranusAggregation);
        sunAggregation.add(neptuneAggregation);
        sunAggregation.add(plutoAggregation);

        // Init. positions
        mercuryAggregation.position.x = (SolarConfig.mercury.orbitRadius);
        venusAggregation.position.x = (SolarConfig.venus.orbitRadius);
        earthAggregation.position.x = (SolarConfig.earth.orbitRadius);
        marsAggregation.position.x = (SolarConfig.mars.orbitRadius);
        jupiterAggregation.position.x = (SolarConfig.jupiter.orbitRadius);
        saturnAggregation.position.x = (SolarConfig.saturn.orbitRadius);
        uranusAggregation.position.x = (SolarConfig.uranus.orbitRadius);
        neptuneAggregation.position.x = (SolarConfig.neptune.orbitRadius);
        plutoAggregation.position.x = (SolarConfig.pluto.orbitRadius);

        console.log("init");
        console.log(SolarConfig);

        // Add orbits
        sunAggregation.add(createOrbit(SolarConfig.mercury.orbitRadius));
        sunAggregation.add(createOrbit(SolarConfig.venus.orbitRadius));
        sunAggregation.add(createOrbit(SolarConfig.earth.orbitRadius));
        sunAggregation.add(createOrbit(SolarConfig.mars.orbitRadius));
        sunAggregation.add(createOrbit(SolarConfig.jupiter.orbitRadius));
        sunAggregation.add(createOrbit(SolarConfig.saturn.orbitRadius));
        sunAggregation.add(createOrbit(SolarConfig.uranus.orbitRadius));
        sunAggregation.add(createOrbit(SolarConfig.neptune.orbitRadius));
        sunAggregation.add(createOrbit(SolarConfig.pluto.orbitRadius));
    }

    function rotationAndRevolution() {

        // Rotations
        mercuryAggregation.rotateY(SolarConfig.mercury.rotateSpeed);
        venusAggregation.rotateY(SolarConfig.venus.rotateSpeed);
        earthAggregation.rotateY(SolarConfig.earth.rotateSpeed);
        marsAggregation.rotateY(SolarConfig.mars.rotateSpeed);
        jupiterAggregation.rotateY(SolarConfig.jupiter.rotateSpeed);
        saturnAggregation.rotateY(SolarConfig.saturn.rotateSpeed);
        uranusAggregation.rotateY(SolarConfig.uranus.rotateSpeed);
        neptuneAggregation.rotateY(SolarConfig.neptune.rotateSpeed);
        plutoAggregation.rotateY(SolarConfig.pluto.rotateSpeed);

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
        mercuryAggregation.position.x = Math.cos(radians) * SolarConfig.mercury.orbitRadius;
        mercuryAggregation.position.z = Math.sin(radians) * SolarConfig.mercury.orbitRadius;

        radians = SolarConfig.venus.orbitAngle * Math.PI / 180;
        venusAggregation.position.x = Math.cos(radians) * SolarConfig.venus.orbitRadius;
        venusAggregation.position.z = Math.sin(radians) * SolarConfig.venus.orbitRadius;

        radians = SolarConfig.earth.orbitAngle * Math.PI / 180;
        earthAggregation.position.x = Math.cos(radians) * SolarConfig.earth.orbitRadius;
        earthAggregation.position.z = Math.sin(radians) * SolarConfig.earth.orbitRadius;

        radians = SolarConfig.mars.orbitAngle * Math.PI / 180;
        marsAggregation.position.x = Math.cos(radians) * SolarConfig.mars.orbitRadius;
        marsAggregation.position.z = Math.sin(radians) * SolarConfig.mars.orbitRadius;

        radians = SolarConfig.jupiter.orbitAngle * Math.PI / 180;
        jupiterAggregation.position.x = Math.cos(radians) * SolarConfig.jupiter.orbitRadius;
        jupiterAggregation.position.z = Math.sin(radians) * SolarConfig.jupiter.orbitRadius;

        radians = SolarConfig.saturn.orbitAngle * Math.PI / 180;
        saturnAggregation.position.x = Math.cos(radians) * SolarConfig.saturn.orbitRadius;
        saturnAggregation.position.z = Math.sin(radians) * SolarConfig.saturn.orbitRadius;

        radians = SolarConfig.uranus.orbitAngle * Math.PI / 180;
        uranusAggregation.position.x = Math.cos(radians) * SolarConfig.uranus.orbitRadius;
        uranusAggregation.position.z = Math.sin(radians) * SolarConfig.uranus.orbitRadius;

        radians = SolarConfig.neptune.orbitAngle * Math.PI / 180;
        neptuneAggregation.position.x = Math.cos(radians) * SolarConfig.neptune.orbitRadius;
        neptuneAggregation.position.z = Math.sin(radians) * SolarConfig.neptune.orbitRadius;

        radians = SolarConfig.pluto.orbitAngle * Math.PI / 180;
        plutoAggregation.position.x = Math.cos(radians) * SolarConfig.pluto.orbitRadius;
        plutoAggregation.position.z = Math.sin(radians) * SolarConfig.pluto.orbitRadius;
    }

    function createUniverseMesh() {

        var universeMesh = new THREE.Mesh();
        universeMesh.geometry = new THREE.SphereGeometry(100, 64, 64);
        universeMesh.material = new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(
                '../images/galaxy_starfield.png'
            ),
            side: THREE.BackSide
        });

        return universeMesh;
    }

    function createSphereMesh(path, radius) {
        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(radius, 32, 32);
        sphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(path)
        });

        return sphereMesh;
    }

    function createBumpSphereMesh(path, bumpPath, radius){
        var sphereMesh = new THREE.Mesh();
        sphereMesh.geometry = new THREE.SphereGeometry(radius, 32, 32);
        sphereMesh.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(path),
            bumpScale: 0.005,
            bumpMap: new THREE.TextureLoader().load(bumpPath)
        });

        return sphereMesh;
    }

    function createAggregation(sphereMesh) {
        var aggregation = new THREE.Object3D();
        aggregation.add(sphereMesh);
        // aggregation.add(new THREE.AxisHelper(0.5));

        return aggregation;
    }

    function createOrbit(radius){
        var geometry = new THREE.CircleGeometry( radius, 256, 0, 2.01*Math.PI ) ;
        geometry.vertices.shift();
        var orbit = new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial( { color: 0x6d4587, linewidth: 0.2 } )
        );
        orbit.rotateX(0.5 * Math.PI);
        return orbit;
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
            if (intersects[i].object.type === "Mesh"){
                if (intersects !== null && intersects.length > 0 && mercuryAggregation === intersects[i].object.parent){
                    console.log("Clicked Mercury!");
                    return "Mercury";
                }
                else if (intersects !== null && intersects.length > 0 && venusAggregation === intersects[i].object.parent){
                    console.log("Clicked Venus!");
                    return "Venus";
                }
                else if (intersects !== null && intersects.length > 0 && earthAggregation === intersects[i].object.parent){
                    console.log("Clicked Earth!");
                    return "Earth";
                }
                else if (intersects !== null && intersects.length > 0 && marsAggregation === intersects[i].object.parent){
                    console.log("Clicked Mars!");
                    return "Mars";
                }
                else if (intersects !== null && intersects.length > 0 && saturnAggregation === intersects[i].object.parent){
                    console.log("Clicked Saturn!");
                    return "Saturn";
                }
                else if (intersects !== null && intersects.length > 0 && jupiterAggregation === intersects[i].object.parent){
                    console.log("Clicked Jupiter!");
                    return "Jupiter";
                }
                else if (intersects !== null && intersects.length > 0 && uranusAggregation === intersects[i].object.parent){
                    console.log("Clicked Uranus!");
                    return "Uranus";
                }
                else if (intersects !== null && intersects.length > 0 && neptuneAggregation === intersects[i].object.parent){
                    console.log("Clicked Neptune!");
                    return "Neptune";
                }
                else if (intersects !== null && intersects.length > 0 && plutoAggregation === intersects[i].object.parent){
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
                earthSceneController.animate();
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
