/**
 * Created by ss on 2017/9/25.
 */

var threeElement = document.getElementById('sceneArea');



var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

//create controls object
//also need to set some parameter in the library, see TrackballControl.js file
var controls = new THREE.TrackballControls(camera,threeElement);

var renderer = new THREE.WebGLRenderer({canvas: threeElement, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var render = function() {
    requestAnimationFrame(render);


    //set update
    controls.update();

    renderer.render(scene, camera);
};

render();