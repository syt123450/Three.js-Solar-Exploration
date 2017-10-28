SaturnSceneController = function (renderer) {
    var universeUtils = new UniverseUtils();
    var light = new THREE.AmbientLight(0xffffff);
    var camera = universeUtils.createDefaultCamera();
    var universeMesh = universeUtils.createDefaultUniverse();
    var stars = universeUtils.createDefaultStars();
    var meteors = universeUtils.createDefaultMeteors();
    var mesh = createPlanetMesh('saturn');
    var ringMesh = createRingMesh('saturn');

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
        // aggregation.add(mesh);
        // aggregation.rotateZ(-Math.PI * 23.5 / 180);
        aggregation.add(ringMesh);
        return aggregation;
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

function createRingMesh(planet){
    var mesh = new THREE.Mesh();

    // mesh.geometry = new THREE.RingGeometry(0.75, 1, 50, 5, 0, Math.PI * 2);
    mesh.geometry = new THREE.BufferGeometry().fromGeometry(
        new THREE.RingGeometry(0.75, 1, 64));
    switch (planet){
        case 'saturn':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/saturnringcolortrans.png'
                ),
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            break;
        case 'uranus':
            mesh.material = new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/planets/uranusringcolortrans.png'
                ),
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            });
            break;
        default:
            mesh.material = new THREE.MeshPhongMaterial();
    }

    mesh.receiveShadow = true;
    mesh.castShadow = true;
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
    // addEvent();

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