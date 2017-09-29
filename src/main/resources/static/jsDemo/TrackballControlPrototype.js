/**
 * Created by ss on 2017/9/25.
 */

var scene, camera, renderer, threeElement, controls;

scene = new THREE.Scene();
init();
animate();

function init() {

    initRenderer();
    initCamera();
    initCube();
    initTrackballControls();
}

function initRenderer() {

    threeElement = document.getElementById('sceneArea');
    renderer = new THREE.WebGLRenderer({canvas: threeElement, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initCamera() {

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.z = 3;
}

function initCube() {

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('../images/crate.jpg')
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function initTrackballControls() {

    //create controls object
    //also need to set some parameter in the library, see TrackballControl.js file
    controls = new THREE.TrackballControls(camera, threeElement);
    controls.minDistance = 2;
    controls.maxDistance = 3;
}

function animate() {

    requestAnimationFrame(animate);

    //set update
    controls.update();

    renderer.render(scene, camera);
}