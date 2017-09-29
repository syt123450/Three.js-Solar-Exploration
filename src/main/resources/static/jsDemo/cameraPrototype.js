/**
 * Created by ss on 2017/9/25.
 */

var scene, renderer, camera;

init();
animate();

function init() {
    initScene();
    initRenderer();
    initCamera();
    initCube();
}

function initScene() {
    scene = new THREE.Scene();
}

function initRenderer() {
    var threeElement = document.getElementById('sceneArea');
    renderer = new THREE.WebGLRenderer({canvas: threeElement, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //set y position
    camera.position.y = 4;
}

function initCube() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('../images/crate.jpg')
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}

function animate() {
    requestAnimationFrame(animate);

    animateCamera();

    renderer.render(scene, camera);
}

//顺时针旋转
function animateCamera() {

    var timer = Date.now() * 0.0001;
    //set x and z position to let camera to rotate around the cube
    camera.position.x = Math.cos(timer) * 8;
    camera.position.z = Math.sin(timer) * 8;

    //let camera to look at camera while it is rotating around the cube
    camera.lookAt(scene.position);
}