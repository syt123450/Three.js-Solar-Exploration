/**
 * Created by ss on 2017/9/25.
 */

var threeElement = document.getElementById('sceneArea');

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//set y position
camera.position.y = 4;


var renderer = new THREE.WebGLRenderer({canvas: threeElement, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('../images/crate.jpg')
});

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var render = function() {
    requestAnimationFrame(render);

    var timer = Date.now() * 0.0001;

    //set x and z position to let camera to rotate around the cube
    camera.position.x = Math.cos( timer ) * 8;
    camera.position.z = Math.sin( timer ) * 8;

    //let camera to look at camera while it is rotating around the cube
    camera.lookAt( scene.position );

    renderer.render(scene, camera);
};

render();