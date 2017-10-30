SolarSystemSceneController = function(renderer) {

    // Solar system basic constant parameters
    var sunRadius = 5,

        mercuryOrbitRadius = sunRadius +2,
        mercuryOrbitAngle = 0,
        mercuryOrbitSpeed = - 3,
        mercuryRotateSpeed = 0.05,

        venusOrbitRadius = sunRadius +4.5,
        venusOrbitAngle = 0,
        venusOrbitSpeed = - 1.9,
        venusRotateSpeed = 0.05,

        earthOrbitRadius = sunRadius +7.5,
        earthOrbitAngle = 0,
        earthOrbitSpeed = - 1,
        earthRotateSpeed = 0.05,

        marsOrbitRadius = sunRadius +11,
        marsOrbitAngle = 0,
        marsOrbitSpeed = - 0.5,
        marsRotateSpeed = 0.05,

        jupiterOrbitRadius = sunRadius +16,
        jupiterOrbitAngle = 0,
        jupiterOrbitSpeed = - 0.3,
        jupiterRotateSpeed = 0.05,

        saturnOrbitRadius = sunRadius +21,
        saturnOrbitAngle = 0,
        saturnOrbitSpeed = - 0.17,
        saturnRotateSpeed = 0.05,

        uranusOrbitRadius = sunRadius +25.5,
        uranusOrbitAngle = 0,
        uranusOrbitSpeed = - 0.12,
        uranusRotateSpeed = 0.05,

        neptuneOrbitRadius = sunRadius +30,
        neptuneOrbitAngle = 0,
        neptuneOrbitSpeed = - 0.08,
        neptuneRotateSpeed = 0.05,

        plutoOrbitRadius = sunRadius +33.5,
        plutoOrbitAngle = 0,
        plutoOrbitSpeed = - 0.04,
        plutoRotateSpeed = 0.05;

    // Light and Camera
    var universeUtils = new UniverseUtils();
    var light = new THREE.PointLight(0xffffff, 1.2, 0);
    var camera = universeUtils.createDefaultCamera();

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    // Meshes
    var universeMesh = createUniverseMesh();
    var sunMesh = new THREE.Mesh(
        new THREE.SphereGeometry(sunRadius, 32, 32),
        new THREE.MeshBasicMaterial({
            color: 'yellow'
        }));
    var mercuryMesh = createBumpSphereMesh('../images/planets/mercurymap.jpg', '../images/planets/mercurybump.jpg', 0.5);
    var venusMesh = createBumpSphereMesh('../images/planets/venusmap.jpg', '../images/planets/venusbump.jpg', 0.8);
    var earthMesh = createBumpSphereMesh('../images/earthmap1k.jpg', '../images/earthbump1k.jpg', 0.9);
    var marsMesh = createBumpSphereMesh('../images/planets/marsmap1k.jpg', '../images/planets/marsbump1k.jpg', 0.55);
    var jupiterMesh = createSphereMesh('../images/planets/jupitermap.jpg' , 2);
    var saturnMesh = createSphereMesh('../images/planets/saturnmap.jpg' , 1.8);
    var uranusMesh = createSphereMesh('../images/planets/uranusmap.jpg' , 1.2);
    var neptuneMesh = createSphereMesh('../images/planets/neptunemap.jpg' , 1.2);
    var plutoMesh = createBumpSphereMesh('../images/planets/plutomap1k.jpg', '../images/planets/plutobump1k.jpg', 0.3);

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
                // Nothing
                // earthSceneController = controller;
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
        if (!mouseListener){
            addEvent();
        }
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
        mercuryAggregation.position.x = (mercuryOrbitRadius);
        venusAggregation.position.x = (venusOrbitRadius);
        earthAggregation.position.x = (earthOrbitRadius);
        marsAggregation.position.x = (marsOrbitRadius);
        jupiterAggregation.position.x = (jupiterOrbitRadius);
        saturnAggregation.position.x = (saturnOrbitRadius);
        uranusAggregation.position.x = (uranusOrbitRadius);
        neptuneAggregation.position.x = (neptuneOrbitRadius);
        plutoAggregation.position.x = (plutoOrbitRadius);

        // Add orbits
        sunAggregation.add(createOrbit(mercuryOrbitRadius));
        sunAggregation.add(createOrbit(venusOrbitRadius));
        sunAggregation.add(createOrbit(earthOrbitRadius));
        sunAggregation.add(createOrbit(marsOrbitRadius));
        sunAggregation.add(createOrbit(jupiterOrbitRadius));
        sunAggregation.add(createOrbit(saturnOrbitRadius));
        sunAggregation.add(createOrbit(uranusOrbitRadius));
        sunAggregation.add(createOrbit(neptuneOrbitRadius));
        sunAggregation.add(createOrbit(plutoOrbitRadius));
    }

    function rotationAndRevolution() {

        // Rotations
        mercuryAggregation.rotateY(mercuryRotateSpeed);
        venusAggregation.rotateY(venusRotateSpeed);
        earthAggregation.rotateY(earthRotateSpeed);
        marsAggregation.rotateY(marsRotateSpeed);
        jupiterAggregation.rotateY(jupiterRotateSpeed);
        saturnAggregation.rotateY(saturnRotateSpeed);
        uranusAggregation.rotateY(uranusRotateSpeed);
        neptuneAggregation.rotateY(neptuneRotateSpeed);
        plutoAggregation.rotateY(plutoRotateSpeed);

        // Revolutions
        var radians = 0;
        mercuryOrbitAngle += mercuryOrbitSpeed;
        venusOrbitAngle += venusOrbitSpeed;
        earthOrbitAngle += earthOrbitSpeed;
        marsOrbitAngle += marsOrbitSpeed;
        jupiterOrbitAngle += jupiterOrbitSpeed;
        saturnOrbitAngle += saturnOrbitSpeed;
        uranusOrbitAngle += uranusOrbitSpeed;
        neptuneOrbitAngle += neptuneOrbitSpeed;
        plutoOrbitAngle += plutoOrbitSpeed;

        radians = mercuryOrbitAngle * Math.PI / 180;
        mercuryAggregation.position.x = Math.cos(radians) * mercuryOrbitRadius;
        mercuryAggregation.position.z = Math.sin(radians) * mercuryOrbitRadius;

        radians = venusOrbitAngle * Math.PI / 180;
        venusAggregation.position.x = Math.cos(radians) * venusOrbitRadius;
        venusAggregation.position.z = Math.sin(radians) * venusOrbitRadius;

        radians = earthOrbitAngle * Math.PI / 180;
        earthAggregation.position.x = Math.cos(radians) * earthOrbitRadius;
        earthAggregation.position.z = Math.sin(radians) * earthOrbitRadius;

        radians = marsOrbitAngle * Math.PI / 180;
        marsAggregation.position.x = Math.cos(radians) * marsOrbitRadius;
        marsAggregation.position.z = Math.sin(radians) * marsOrbitRadius;

        radians = jupiterOrbitAngle * Math.PI / 180;
        jupiterAggregation.position.x = Math.cos(radians) * jupiterOrbitRadius;
        jupiterAggregation.position.z = Math.sin(radians) * jupiterOrbitRadius;

        radians = saturnOrbitAngle * Math.PI / 180;
        saturnAggregation.position.x = Math.cos(radians) * saturnOrbitRadius;
        saturnAggregation.position.z = Math.sin(radians) * saturnOrbitRadius;

        radians = uranusOrbitAngle * Math.PI / 180;
        uranusAggregation.position.x = Math.cos(radians) * uranusOrbitRadius;
        uranusAggregation.position.z = Math.sin(radians) * uranusOrbitRadius;

        radians = neptuneOrbitAngle * Math.PI / 180;
        neptuneAggregation.position.x = Math.cos(radians) * neptuneOrbitRadius;
        neptuneAggregation.position.z = Math.sin(radians) * neptuneOrbitRadius;

        radians = plutoOrbitAngle * Math.PI / 180;
        plutoAggregation.position.x = Math.cos(radians) * plutoOrbitRadius;
        plutoAggregation.position.z = Math.sin(radians) * plutoOrbitRadius;
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
        /**
         * register mouse click event handler
         */
        document.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mousemove', onMouseMove, false);
        mouseListener = true;
    }

    function removeEvent() {
        document.removeEventListener('mousedown', onMouseDown, false);
        document.removeEventListener('mousemove', onMouseMove, false);
        mouseListener = false;
    }

    function onMouseMove() {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function checkPlanetClicked() {
        // Cast ray
        raycaster.setFromCamera(mouse, camera);

        // Get intersections
        var intersects = raycaster.intersectObjects(sunAggregation.children, true);
        // console.log(intersects);

        // intersects[0] is atmosphere of the earth
        // we use its .parent attribute to get the aggregated property
        // so we can compare it to earthAggretation

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
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

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
                // Nothing
                // earthSceneController.activateScene();
                break;
            case "Mars" :
                marsSceneController.activateScene();
                break;
            case "Saturn" :
                // Console.log(saturnSceneController);
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