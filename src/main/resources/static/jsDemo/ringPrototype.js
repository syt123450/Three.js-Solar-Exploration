SaturnSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('saturn', 0.5);
    var ringMesh = createRingMesh('saturn', 0.5);

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

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {

        var aggregation = new THREE.Object3D();
        ringMesh.rotateX( 0.5 * Math.PI );
        mesh.add(ringMesh);
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);
        // aggregation.add(ringMesh);
        return aggregation;
    }
};

UranusSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('uranus', 0.5);
    var ringMesh = createRingMesh('uranus', 0.5);

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

    function rotatePlanet() {
        rotatePlanetDefault(mesh);
    }

    function init() {
        return initDefault(light, camera, universeMesh, stars, meteors, aggregationInit());
    }

    function aggregationInit() {
        var aggregation = new THREE.Object3D();
        aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);
        ringMesh.rotateX( 0.5 * Math.PI );
        aggregation.add(ringMesh);
        return aggregation;
    }
};

/* ***** ***** Helper Functions ***** ***** */
function createPlanetMesh(planet, radius){
    var mesh = new THREE.Mesh();

    mesh.geometry = new THREE.SphereGeometry(radius, 64, 64);
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

function createRingMesh(planet, radius){
    var mesh = new THREE.Mesh();
    var innerRadius;
    var outerRadius;

    switch (planet){
        case 'saturn':
            innerRadius = (radius * 1.2);
            outerRadius = (radius * 2.4);
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/saturnringcolortransRing.png'
                ),
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.95
            });
            break;
        case 'uranus':
            innerRadius = (radius * 1.3);
            outerRadius = (radius * 2);
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/uranusringcolortransRing.png'
                ),
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.65
            });
            break;
        default:
            mesh.material = new THREE.MeshPhongMaterial();
    }

    mesh.geometry = new THREE.RingGeometry(innerRadius, outerRadius, 64, 16, 0, Math.PI * 2);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    return mesh;
}

function initDefault(light, camera, universeMesh, stars, meteors, aggregation) {
    var scene = new THREE.Scene();
    scene.add(light);
    camera.position.set(0, 1.5, 3);
    scene.add(camera);
    scene.add(universeMesh);
    stars.forEach(function addStar(star) {
        scene.add(star);
    });
    meteors.forEach(function addMeteor(meteor) {
        scene.add(meteor);
    });
    scene.add(aggregation);
    camera.lookAt(aggregation.position);

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