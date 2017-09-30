/**
 * Created by ss on 2017/9/29.
 */

var scene, camera, renderer, earthMesh, atmosphereMesh, moonMesh, threeElement, raycaster, mouse, controls, meteors = [];
var moonRotateRadius = 0.7;

var stars = [];
var starPositions = [
    [-7, 3, -15], [-8, 4, -16],
    [-9, 2, -14], [-10, 3, -15], [-8, 4, -10],
    [-9, 5, -15],
    [-6, -3, -15], [-6, -4, -15], [-7, -2, -15],
    [-10, 0, -15], [-8, -4, -13],
    [7, 3, -15], [8, 4, -16], [9, 2, -14],
    [12, 3, -15], [3, 4, -11], [9, 5, -15],
    [8, -4, -15], [7, -2, -15], [10, 0, -15],
    [8, -4, -13], [6, -3, -15]];

scene = new THREE.Scene();
init();
animate();

function init() {

    initLight();
    initCamera();
    initRenderer();
    initRaycaster();
    initUniverse();
    initEarth();
    initMoon();
    initStars();
    initMeteors();
//        initTrackballControls();
}

function animate() {

    requestAnimationFrame(animate);

    animateFlashing();
    animateMeteors();
    animateEarthWithStop();
    animateMoon();
//        controls.update();

    renderer.render(scene, camera);
}

function initLight() {

    scene.add(new THREE.AmbientLight(0xffffff));
}

function initCamera() {

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1500);
    camera.position.set(0, 0, 1.5);
}

function initRenderer() {

    threeElement = document.getElementById('sceneArea');
    renderer = new THREE.WebGLRenderer({canvas: threeElement, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initUniverse() {

    var starMesh = new THREE.Mesh(
        new THREE.SphereGeometry(90, 64, 64),
        new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/galaxy_starfield.png'
                ),
                side: THREE.BackSide
            }
        )
    );
    scene.add(starMesh);
}

function initEarth() {

    earthMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 32, 32),
        new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/2_no_clouds_4k.jpg'
                ),
                bumpScale: 0.05,
                bumpMap: new THREE.TextureLoader().load(
                    '../images/earthbump1k.jpg'
                ),
                specular: new THREE.Color('grey'),
                specularMap: new THREE.TextureLoader().load(
                    '../images/water_4k.png'
                )
            }
        )
    );

    atmosphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.504, 32, 32),
        new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/fair_clouds_4k.png'
                ),
                transparent: true
            }
        )
    );

    var aggregation = new THREE.Object3D();
    aggregation.add(earthMesh);
    aggregation.add(atmosphereMesh);
    aggregation.rotateZ(-Math.PI * 23.5 / 180);

    scene.add(aggregation);
}

function initMoon() {

    moonMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 32, 32),
        new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load(
                    '../images/moonmap2k.jpg'
                ),
                bumpScale: 0.005,
                bumpMap: new THREE.TextureLoader().load(
                    '../images/elev_bump_4k.jpg'
                )
            }
        )
    );
    moonMesh.position.set(-moonRotateRadius, 0, 0);
    scene.add(moonMesh);
}

function initStars() {

    for (var i = 0; i < starPositions.length; i++) {
        stars[i] = initOneStar();
        stars[i].position.x = starPositions[i][0];
        stars[i].position.y = starPositions[i][1];
        stars[i].position.z = starPositions[i][2];
        scene.add(stars[i]);
    }
}

function initOneStar() {

    var geometry = new THREE.SphereGeometry(0.03, 32, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xA0A0A0});

    var star = new THREE.Mesh(geometry, material);
    star.count = 0;
    return star;
}

function initMeteors() {

    var meteor0 = createMeteor();
    var meteor1 = createMeteor();
    meteors[0] = meteor0;
    meteors[1] = meteor1;
    scene.add(meteor0);
    scene.add(meteor1);
}

function initRaycaster() {
    document.addEventListener('mousemove', onMouseMove, false);
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
}

function initTrackballControls() {

    controls = new THREE.TrackballControls(camera, threeElement);
    controls.minDistance = 1.2;
    controls.maxDistance = 1.8;
}

function animateEarth() {

    earthMesh.rotation.y += 0.001;
    atmosphereMesh.rotation.y += 0.001;
}

function animateMoon() {

    moonMesh.rotateY(0.01);
    var timer = Date.now() * 0.0001;
    //set x and z position to let camera to rotate around the cube
    moonMesh.position.x = Math.cos(-timer) * moonRotateRadius;
    moonMesh.position.z = Math.sin(-timer) * moonRotateRadius;
}

function animateFlashing() {

    for (var i = 0; i < stars.length; i++) {
        stars[i].count += Math.random() > 0.5 ? 2 : 3;
        if (stars[i].count > 40) {
            stars[i].material.color.set(stars[i].material.color.getHex() == 0xA0A0A0 ? 0xffffff : 0xA0A0A0);
            stars[i].count = 0;
        }
    }
}

function animateMeteors() {

    for (var i = 0; i < meteors.length; i++) {
        sweepMeteor(meteors[i]);
    }
}

function createMeteor() {

    var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.001);
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/meteor.png')
    });

    var meteor = new THREE.Mesh(geometry, material);

    meteor.position.x = 3 * Math.random();
    meteor.position.y = 3 * Math.random();
    meteor.position.z = -3;

    return meteor;
}

function sweepMeteor(meteor) {

    if (meteor.position.x <= -4) {
        meteor.position.x = 3 * Math.random();
        meteor.position.y = 3 * Math.random();
    }

    meteor.position.x -= 0.01;
    meteor.position.y -= 0.01;
}

function animateEarthWithStop() {

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects === null || intersects.length === 0 || intersects[0].object !== atmosphereMesh) {
        animateEarth();
    }
}

function onMouseMove() {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
