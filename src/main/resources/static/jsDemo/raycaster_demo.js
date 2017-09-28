/************************************
 *
 ************************************/
var container, scene, renderer, camera, light, raycaster, mouse;

var INTERSECTED; // The first object intersected with casted ray


init();

animate();

/**************************
 * helper functions
 **************************/
function animate() {

    requestAnimationFrame(animate);

    render();

}

function init() {

    initSceneAndRenderer();

    initCamera();
    
    initLighting();
    
    raycaster = new THREE.Raycaster();

    mouse = new THREE.Vector2();
    
    createCube(1, 1, 1);

    // Add mouse listener
    document.addEventListener('mousemove', onMouseMove, false);
}

function initSceneAndRenderer() {
    container = document.createElement('div');
    document.body.appendChild(container);

    var info = document.createElement('div');
    info.style.position = 'absolute';
    info.style.color = '#ffffff';
    info.style.top = '30px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Cube will turn red when mouse is over it';
    container.appendChild(info);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();
}

function initCamera() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(3, 3, 3);
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
}

function initLighting() {

    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 0);
    scene.add(new THREE.AmbientLight(0x333333));
    scene.add(light);
}

function createCube(width, height, depth) {

    var geometry = new THREE.BoxGeometry(width, height, depth);
    var material = new THREE.MeshPhongMaterial({color: 0x009999});
    var cube = new THREE.Mesh(geometry, material);

    cube.position.x = 0.5;
    cube.position.y = 0.5;
    cube.position.z = 0.5;

    scene.add(cube);
}

function render() {

    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        var i = 0;
        if (INTERSECTED !== intersects[i].object) {
            if (INTERSECTED) {
                INTERSECTED.material.color.set(0xff0000);
            }

            INTERSECTED = intersects[i].object;
            INTERSECTED.material.color.set(0xff0000);
        }

    } else {
        if (INTERSECTED) {
            INTERSECTED.material.color.set(0x009999);
        }
        INTERSECTED = null;
    }

    renderer.render(scene, camera);
}

function onMouseMove(event) {

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}
