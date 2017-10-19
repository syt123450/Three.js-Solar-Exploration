

/* ***** SenceController for each planet ***** */

// Mercury
MercurySceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('mecury');

    var renderer = renderer;
    var scene = init();

    this.animate = animate;

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(aggregationInit());
        // addEvent();

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotatePlanet() {

        mesh.rotation.y += 0.001;

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
    var mesh = createPlanetMesh('venus');

    var renderer = renderer;
    var scene = init();

    this.animate = animate;

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(aggregationInit());
        // addEvent();

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotatePlanet() {

        mesh.rotation.y += 0.001;

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
    var mesh = createPlanetMesh('mars');

    var renderer = renderer;
    var scene = init();

    this.animate = animate;

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(aggregationInit());
        // addEvent();

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotatePlanet() {

        mesh.rotation.y += 0.001;

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
    var mesh = createPlanetMesh('jupiter');

    var renderer = renderer;
    var scene = init();

    this.animate = animate;

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(aggregationInit());
        // addEvent();

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotatePlanet() {

        mesh.rotation.y += 0.001;

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
    var mesh = createPlanetMesh('saturn');

    var renderer = renderer;
    var scene = init();

    this.animate = animate;

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(aggregationInit());
        // addEvent();

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotatePlanet() {

        mesh.rotation.y += 0.001;

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
    var mesh = createPlanetMesh('uranus');

    var renderer = renderer;
    var scene = init();

    this.animate = animate;

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(aggregationInit());
        // addEvent();

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotatePlanet() {

        mesh.rotation.y += 0.001;

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
    var mesh = createPlanetMesh('neptune');

    var renderer = renderer;
    var scene = init();

    this.animate = animate;

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(aggregationInit());
        // addEvent();

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotatePlanet() {

        mesh.rotation.y += 0.001;

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
    var mesh = createPlanetMesh('pluto');

    var renderer = renderer;
    var scene = init();

    this.animate = animate;

    function animate() {
        requestAnimationFrame(animate);
        stars.flashStars();
        meteors.sweepMeteors();
        rotatePlanet();

        renderer.render(scene, camera);
    }

    function init() {
        var scene = new THREE.Scene();
        scene.add(light);
        scene.add(camera);
        scene.add(universeMesh);
        stars.forEach(function addStar(star) {
            scene.add(star);
        });
        meteors.forEach(function addMeteor(meteor) {
            scene.add(meteor);
        });
        scene.add(aggregationInit());
        // addEvent();

        return scene;
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);

        return aggregation;
    }

    function rotatePlanet() {

        mesh.rotation.y += 0.001;

    }
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
