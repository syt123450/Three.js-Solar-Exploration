

/* ***** ScenceController for each planet ***** */

// Mercury
MercurySceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('mercury');
    var planetAggregation;
    var solarSystemSceneController;

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "MercurySceneController";
    this.setSolarSystemSceneController = function (sceneController) {
        solarSystemSceneController = sceneController;
    };

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {
        // if (!mouseListener){
        //     addEvent();
        // }
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "MercuryAggregation";
        return planetAggregation;
    }

    // function addEvent() {
    //     /**
    //      * register mouse click event handler
    //      */
    //     document.addEventListener('mousedown', onMouseDown, false);
    //     document.addEventListener('mousemove', onMouseMove, false);
    //     mouseListener = true;
    // }
    //
    // function removeEvent() {
    //     document.removeEventListener('mousedown', onMouseDown, false);
    //     document.removeEventListener('mousemove', onMouseMove, false);
    //     mouseListener = false;
    // }

    // function onMouseDown() {
    //     if (mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController)){
    //         removeEvent();
    //         changeScene(solarSystemSceneController);
    //     }
    // }
};

// Venus
VenusSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('venus');
    var planetAggregation;
    var solarSystemSceneController;

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "VenusSceneController";
    this.setSolarSystemSceneController = function (sceneController) {
        solarSystemSceneController = sceneController;
    };

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {
        // if (!mouseListener){
        //     addEvent();
        // }
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "VenusAggregation";
        return planetAggregation;
    }

    // function addEvent() {
    //     /**
    //      * register mouse click event handler
    //      */
    //     document.addEventListener('mousedown', onMouseDown, false);
    //     document.addEventListener('mousemove', onMouseMove, false);
    //     mouseListener = true;
    // }
    //
    // function removeEvent() {
    //     document.removeEventListener('mousedown', onMouseDown, false);
    //     document.removeEventListener('mousemove', onMouseMove, false);
    //     mouseListener = false;
    // }
    //
    // function onMouseDown() {
    //     if (mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController)){
    //         removeEvent();
    //         changeScene(solarSystemSceneController);
    //     }
    // }
};

// Mars
MarsSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('mars');
    var planetAggregation;
    var solarSystemSceneController;

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "MarsSceneController";
    this.setSolarSystemSceneController = function (sceneController) {
        solarSystemSceneController = sceneController;
    };

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {
        // if (!mouseListener){
        //     addEvent();
        // }
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "MarsAggregation";
        return planetAggregation;
    }

    // function addEvent() {
    //     /**
    //      * register mouse click event handler
    //      */
    //     document.addEventListener('mousedown', onMouseDown, false);
    //     document.addEventListener('mousemove', onMouseMove, false);
    //     mouseListener = true;
    // }
    //
    // function removeEvent() {
    //     document.removeEventListener('mousedown', onMouseDown, false);
    //     document.removeEventListener('mousemove', onMouseMove, false);
    //     mouseListener = false;
    // }
    //
    // function onMouseDown() {
    //     if (mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController)){
    //         removeEvent();
    //         changeScene(solarSystemSceneController);
    //     }
    // }
};

// Jupiter
JupiterSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('jupiter');
    var planetAggregation;
    var solarSystemSceneController;

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "JupiterSceneController";
    this.setSolarSystemSceneController = function (sceneController) {
        solarSystemSceneController = sceneController;
    };

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {
        // if (!mouseListener){
        //     addEvent();
        // }
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "JupiterAggregation";
        return planetAggregation;
    }

    // function addEvent() {
    //     /**
    //      * register mouse click event handler
    //      */
    //     document.addEventListener('mousedown', onMouseDown, false);
    //     document.addEventListener('mousemove', onMouseMove, false);
    //     mouseListener = true;
    // }
    //
    // function removeEvent() {
    //     document.removeEventListener('mousedown', onMouseDown, false);
    //     document.removeEventListener('mousemove', onMouseMove, false);
    //     mouseListener = false;
    // }
    //
    // function onMouseDown() {
    //     if (mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController)){
    //         removeEvent();
    //         changeScene(solarSystemSceneController);
    //     }
    // }
};

// Saturn
SaturnSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('saturn');
    var planetAggregation;
    var solarSystemSceneController;

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "SaturnSceneController";
    this.setSolarSystemSceneController = function (sceneController) {
        solarSystemSceneController = sceneController;
    };

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {
        // if (!mouseListener){
        //     addEvent();
        // }
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "SaturnAggregation";
        return planetAggregation;
    }

    // function addEvent() {
    //     /**
    //      * register mouse click event handler
    //      */
    //     document.addEventListener('mousedown', onMouseDown, false);
    //     document.addEventListener('mousemove', onMouseMove, false);
    //     mouseListener = true;
    // }
    //
    // function removeEvent() {
    //     document.removeEventListener('mousedown', onMouseDown, false);
    //     document.removeEventListener('mousemove', onMouseMove, false);
    //     mouseListener = false;
    // }
    //
    // function onMouseDown() {
    //     if (mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController)){
    //         removeEvent();
    //         solarSystemSceneController.animate();
    //     }
    // }
};

// Uranus
UranusSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('uranus');
    var planetAggregation;
    var solarSystemSceneController;

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "UranusSceneController";
    this.setSolarSystemSceneController = function (sceneController) {
        solarSystemSceneController = sceneController;
    };

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {
        // if (!mouseListener){
        //     addEvent();
        // }
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "UranusAggregation";
        return planetAggregation;
    }

    // function addEvent() {
    //     /**
    //      * register mouse click event handler
    //      */
    //     document.addEventListener('mousedown', onMouseDown, false);
    //     document.addEventListener('mousemove', onMouseMove, false);
    //     mouseListener = true;
    // }
    //
    // function removeEvent() {
    //     document.removeEventListener('mousedown', onMouseDown, false);
    //     document.removeEventListener('mousemove', onMouseMove, false);
    //     mouseListener = false;
    // }
    //
    // function onMouseDown() {
    //     if (mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController)){
    //         removeEvent();
    //         changeScene(solarSystemSceneController);
    //     }
    // }
};

// Neptune
NeptuneSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('neptune');
    var planetAggregation;
    var solarSystemSceneController;

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "NeptuneSceneController";
    this.setSolarSystemSceneController = function (sceneController) {
        solarSystemSceneController = sceneController;
    };

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {
        // if (!mouseListener){
        //     addEvent();
        // }
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "NeptuneAggregation";
        return planetAggregation;
    }

    // function addEvent() {
    //     /**
    //      * register mouse click event handler
    //      */
    //     document.addEventListener('mousedown', onMouseDown, false);
    //     document.addEventListener('mousemove', onMouseMove, false);
    //     mouseListener = true;
    // }
    //
    // function removeEvent() {
    //     document.removeEventListener('mousedown', onMouseDown, false);
    //     document.removeEventListener('mousemove', onMouseMove, false);
    //     mouseListener = false;
    // }
    //
    // function onMouseDown() {
    //     if (mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController)){
    //         removeEvent();
    //         changeScene(solarSystemSceneController);
    //     }
    // }
};

// Pluto
PlutoSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('pluto');
    var planetAggregation;
    var solarSystemSceneController;

    // Raycaster and Mouse
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var mouseListener = false;

    var renderer = renderer;
    var scene = init();

    // this.animate = animate;
    this.activateScene = activateScene;
    this.name = "PlutoSceneController";
    this.setSolarSystemSceneController = function (sceneController) {
        solarSystemSceneController = sceneController;
    };

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function activateScene() {
        // if (!mouseListener){
        //     addEvent();
        // }
        animate();
    }

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        planetAggregation = aggregationInitDefault(mesh);
        planetAggregation.name = "PlutoAggregation";
        return planetAggregation;
    }

    // function addEvent() {
    //     /**
    //      * register mouse click event handler
    //      */
    //     document.addEventListener('mousedown', onMouseDown, false);
    //     document.addEventListener('mousemove', onMouseMove, false);
    //     mouseListener = true;
    //     console.log('added listener');
    // }
    //
    // function removeEvent() {
    //     document.removeEventListener('mousedown', onMouseDown, false);
    //     document.removeEventListener('mousemove', onMouseMove, false);
    //     mouseListener = false;
    //     console.log('removed listener');
    // }
    //
    // function onMouseDown() {
    //     if (mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController)){
    //         removeEvent();
    //         changeScene(solarSystemSceneController);
    //     }
    // }
};

/* ***** ***** Helper Functions ***** ***** */
function createPlanetMesh(planet){
    var mesh = new THREE.Mesh();

    mesh.geometry = new THREE.SphereGeometry(0.5, 32, 32);
    switch (planet){
        case 'mercury':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/mercurymap.jpg'
                ),
                bumpScale: 0.05,
                bumpMap: new THREE.TextureLoader().load(
                    '../images/planets/mercurybump.jpg'
                )
            });
            break;
        case 'venus':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/venusmap.jpg'
                ),
                bumpScale: 0.05,
                bumpMap: new THREE.TextureLoader().load(
                    '../images/planets/venusbump.jpg'
                )
            });
            break;
        case 'mars':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/marsmap1k.jpg'
                ),
                bumpScale: 0.05,
                bumpMap: new THREE.TextureLoader().load(
                    '../images/planets/marsbump1k.jpg'
                )
            });
            break;
        case 'jupiter':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/jupitermap.jpg'
                )
            });
            break;
        case 'saturn':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/saturnmap.jpg'
                )
            });
            break;
        case 'uranus':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/uranusmap.jpg'
                )
            });
            break;
        case 'neptune':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/neptunemap.jpg'
                )
            });
            break;
        case 'pluto':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/plutomap1k.jpg'
                ),
                bumpScale: 0.05,
                bumpMap: new THREE.TextureLoader().load(
                    '../images/planets/plutobump1k.jpg'
                )
            });
            break;
        default:
            mesh.material = new THREE.MeshPhongMaterial();
    }

    return mesh;
}

function initDefault(light, camera, universeMesh, stars, meteors, aggregation) {
    var scene = new THREE.Scene();
    scene.add(light);
    camera.position.set(0, 0, 2);
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
    // aggregation.rotateZ(-Math.PI * 23.5 / 180);

    return aggregation;
}

function rotatePlanetDefault(mesh) {

    mesh.rotation.y += 0.001;

}

function onMouseMove(mouse) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function checkPlanetClicked(mouse, raycaster, camera, scene, planetAggregation) {
    // Cast ray
    raycaster.setFromCamera(mouse, camera);

    // Get intersections
    var intersects = raycaster.intersectObjects(scene.children, true);
    // console.log(intersects);

    // intersects[0] is atmosphere of the earth
    // we use its .parent attribute to get the aggregated property
    // so we can compare it to earthAggretation

    for (var i =0; i < intersects.length; i++) {
        if (intersects[i].object.type === "Mesh"){
            if (intersects !== null && intersects.length > 0 && planetAggregation === intersects[i].object.parent){
                console.log("Clicked Planet!");
                return "Planet";
            }
            else {
                console.log("Clicked Nothing_planet!" + planetAggregation.name);
                return "Nothing";
            }
        }
    }
}

// mouse down event handler
function mouseDownAction(mouse, raycaster, camera, scene, planetAggregation, solarSystemSceneController) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    var result = checkPlanetClicked(mouse, raycaster, camera, scene, planetAggregation);
    if (result != "Nothing"){
        return true;
    }
    else {
        return false;
    }
}

function changeScene(solarSystemSceneController){
    // removeEvent();
    solarSystemSceneController.activateScene();
}